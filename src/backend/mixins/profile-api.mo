import ProfileTypes "../types/profile";
import ProfileLib "../lib/profile";
import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import Runtime "mo:core/Runtime";

mixin (
  accessControlState : AccessControl.AccessControlState,
  profiles : Map.Map<Principal, ProfileTypes.ProfileInternal>,
) {
  func profileToPublic(p : ProfileTypes.ProfileInternal) : ProfileTypes.Profile {
    { name = p.name; email = p.email };
  };

  /// Get the caller's profile (requires auth)
  public query ({ caller }) func getCallerUserProfile() : async ?ProfileTypes.Profile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    switch (profiles.get(caller)) {
      case (?p) { ?profileToPublic(p) };
      case null { null };
    };
  };

  /// Save the caller's profile (requires auth)
  public shared ({ caller }) func saveCallerUserProfile(input : ProfileTypes.UpdateProfileInput) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    switch (profiles.get(caller)) {
      case (?p) {
        p.name := input.name;
        p.email := input.email;
      };
      case null {
        let profile = ProfileLib.newProfile(caller, input);
        profiles.add(caller, profile);
      };
    };
  };

  /// Get a user's profile by principal (self or admin)
  public query ({ caller }) func getUserProfile(user : Principal) : async ?ProfileTypes.Profile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    switch (profiles.get(user)) {
      case (?p) { ?profileToPublic(p) };
      case null { null };
    };
  };
};
