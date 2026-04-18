import Map "mo:core/Map";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import Stripe "mo:caffeineai-stripe/stripe";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";

import Common "types/common";
import FolderTypes "types/folders";
import PaymentTypes "types/payments";
import ProfileTypes "types/profile";

import FoldersMixin "mixins/folders-api";
import ProfileMixin "mixins/profile-api";
import PaymentLib "lib/payments";

actor {
  // --- Authorization ---
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // --- Object Storage ---
  include MixinObjectStorage();

  // --- Folder & File State ---
  let folders = Map.empty<Common.FolderId, FolderTypes.FolderInternal>();
  let files = Map.empty<Common.FileId, FolderTypes.FileInternal>();
  let folderCounters = { var nextFolderId : Nat = 0; var nextFileId : Nat = 0 };

  // --- Payment State ---
  let payments = Map.empty<Common.StripeSessionId, PaymentTypes.PaymentRecord>();
  let downloadTokens = Map.empty<Common.DownloadToken, Common.FolderId>();
  var stripeConfig : ?Stripe.StripeConfiguration = null;

  // --- Profile State ---
  let profiles = Map.empty<Principal, ProfileTypes.ProfileInternal>();

  // --- Folder & Profile Mixins ---
  include FoldersMixin(accessControlState, folders, files, folderCounters, payments, downloadTokens);
  include ProfileMixin(accessControlState, profiles);

  // --- Stripe-required functions (must be directly in actor for linter) ---
  public query func isStripeConfigured() : async Bool {
    stripeConfig != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    stripeConfig := ?config;
  };

  func getStripeConfiguration() : Stripe.StripeConfiguration {
    switch (stripeConfig) {
      case (null) { Runtime.trap("Stripe needs to be first configured") };
      case (?value) { value };
    };
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
  };

  public shared ({ caller }) func createCheckoutSession(input : PaymentTypes.CreateCheckoutInput) : async Text {
    let folder = switch (folders.get(input.folderId)) {
      case (null) { Runtime.trap("Folder not found") };
      case (?f) { f };
    };
    let item : Stripe.ShoppingItem = {
      currency = "usd";
      productName = folder.name;
      productDescription = "Photo/video download access for " # folder.name;
      priceInCents = folder.priceInCents;
      quantity = 1;
    };
    let responseJson = await Stripe.createCheckoutSession(getStripeConfiguration(), caller, [item], input.successUrl, input.cancelUrl, transform);
    // Extract session id from JSON {"id":"cs_...","url":"..."} to store a payment record
    let sessionId = extractJsonField(responseJson, "id");
    if (sessionId != "") {
      let now = Time.now();
      let record = PaymentLib.newPaymentRecord(input.folderId, sessionId, now);
      payments.add(sessionId, record);
    };
    responseJson;
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // --- Additional payment helpers ---
  public shared func verifyPayment(sessionId : Common.StripeSessionId) : async PaymentTypes.VerifyPaymentResult {
    let status = await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
    switch (status) {
      case (#failed { error }) {
        // Mark existing record as failed if present
        switch (payments.get(sessionId)) {
          case (?record) { record.status := #failed };
          case null {};
        };
        #failed { error };
      };
      case (#completed { response = _; userPrincipal = _ }) {
        // Upsert payment record
        let record = switch (payments.get(sessionId)) {
          case (?r) { r };
          case null {
            // We need the folderId — look it up from existing pending records
            // If no record exists we cannot issue a token (session unknown)
            return #failed { error = "Payment session not found" };
          };
        };
        if (record.status == #completed) {
          // Already granted — return existing token
          switch (record.downloadToken) {
            case (?token) { return #granted { downloadToken = token } };
            case null {};
          };
        };
        let now = Time.now();
        let token = PaymentLib.generateDownloadToken(record.folderId, now);
        record.status := #completed;
        record.downloadToken := ?token;
        downloadTokens.add(token, record.folderId);
        #granted { downloadToken = token };
      };
    };
  };

  /// Simple JSON field extractor for string values: finds `"key":"value"` patterns
  func extractJsonField(json : Text, key : Text) : Text {
    let needle = "\"" # key # "\":\"";
    let parts = json.split(#text needle);
    let iter = parts;
    switch (iter.next()) {
      case null { "" };
      case (?_) {
        switch (iter.next()) {
          case null { "" };
          case (?rest) {
            let valueParts = rest.split(#char '\"');
            switch (valueParts.next()) {
              case (?value) { value };
              case null { "" };
            };
          };
        };
      };
    };
  };

  public query func validateDownloadToken(token : Common.DownloadToken, folderId : Common.FolderId) : async Bool {
    switch (downloadTokens.get(token)) {
      case (?fid) { fid == folderId };
      case null { false };
    };
  };
};
