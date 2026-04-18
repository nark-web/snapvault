import Types "../types/profile";

module {
  /// Convert internal profile to public shared type
  public func toPublic(self : Types.ProfileInternal) : Types.Profile {
    {
      name = self.name;
      email = self.email;
    };
  };

  /// Create a new profile record
  public func newProfile(principal : Principal, input : Types.UpdateProfileInput) : Types.ProfileInternal {
    {
      principal;
      var name = input.name;
      var email = input.email;
    };
  };
};
