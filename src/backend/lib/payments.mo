import Common "../types/common";
import Types "../types/payments";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Text "mo:core/Text";

module {
  /// Generate a secure download token based on folderId and current time
  public func generateDownloadToken(folderId : Common.FolderId, now : Common.Timestamp) : Common.DownloadToken {
    let charset : [Char] = [
      'A','B','C','D','E','F','G','H','I','J','K','L','M',
      'N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
      'a','b','c','d','e','f','g','h','i','j','k','l','m',
      'n','o','p','q','r','s','t','u','v','w','x','y','z',
      '0','1','2','3','4','5','6','7','8','9'
    ];
    let charsetSize = 62;
    var s = Int.abs(now);
    var token = folderId # "-";
    for (_ in Nat.range(0, 32)) {
      let idx = s % charsetSize;
      s := (s * 1664525 + 1013904223) % 4294967296;
      token := token # Text.fromChar(charset[idx]);
    };
    token;
  };

  /// Create a new payment record with pending status
  public func newPaymentRecord(
    folderId : Common.FolderId,
    sessionId : Common.StripeSessionId,
    now : Common.Timestamp,
  ) : Types.PaymentRecord {
    {
      folderId;
      stripeSessionId = sessionId;
      var status = #pending;
      var downloadToken = null;
      createdAt = now;
    };
  };

  /// Check if a download token is valid for a given folder
  public func isTokenValid(
    tokens : Map.Map<Common.DownloadToken, Common.FolderId>,
    token : Common.DownloadToken,
    folderId : Common.FolderId,
  ) : Bool {
    switch (tokens.get(token)) {
      case (?fid) { fid == folderId };
      case null { false };
    };
  };

  /// Check if a folder has already been paid (any completed session)
  public func isFolderPaid(
    payments : Map.Map<Common.StripeSessionId, Types.PaymentRecord>,
    folderId : Common.FolderId,
  ) : Bool {
    payments.entries().any(func(entry : (Common.StripeSessionId, Types.PaymentRecord)) : Bool {
      let (_, p) = entry;
      p.folderId == folderId and p.status == #completed
    });
  };
};
