import Common "common";

module {
  public type PaymentStatus = {
    #pending;
    #completed;
    #failed;
  };

  /// Payment record per folder per payer
  public type PaymentRecord = {
    folderId : Common.FolderId;
    stripeSessionId : Common.StripeSessionId;
    var status : PaymentStatus;
    var downloadToken : ?Common.DownloadToken;
    createdAt : Common.Timestamp;
  };

  /// Request to create a Stripe checkout session
  public type CreateCheckoutInput = {
    folderId : Common.FolderId;
    successUrl : Text;
    cancelUrl : Text;
  };

  /// Response when creating checkout
  public type CheckoutSession = {
    sessionId : Common.StripeSessionId;
    checkoutUrl : Text;
  };

  /// Result of verifying a payment and granting access
  public type VerifyPaymentResult = {
    #granted : { downloadToken : Common.DownloadToken };
    #pending;
    #failed : { error : Text };
  };
};
