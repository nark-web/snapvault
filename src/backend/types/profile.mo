module {
  /// Photographer profile stored on-chain
  public type ProfileInternal = {
    principal : Principal;
    var name : Text;
    var email : Text;
  };

  /// Shared profile for API boundary
  public type Profile = {
    name : Text;
    email : Text;
  };

  /// Input for updating profile
  public type UpdateProfileInput = {
    name : Text;
    email : Text;
  };
};
