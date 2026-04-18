import Common "../types/common";
import FolderTypes "../types/folders";
import FolderLib "../lib/folders";
import PaymentLib "../lib/payments";
import PaymentTypes "../types/payments";
import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Nat "mo:core/Nat";

mixin (
  accessControlState : AccessControl.AccessControlState,
  folders : Map.Map<Common.FolderId, FolderTypes.FolderInternal>,
  files : Map.Map<Common.FileId, FolderTypes.FileInternal>,
  counters : { var nextFolderId : Nat; var nextFileId : Nat },
  payments : Map.Map<Common.StripeSessionId, PaymentTypes.PaymentRecord>,
  downloadTokens : Map.Map<Common.DownloadToken, Common.FolderId>,
) {
  func folderToPublic(f : FolderTypes.FolderInternal) : FolderTypes.Folder {
    { id = f.id; owner = f.owner.toText(); name = f.name; priceInCents = f.priceInCents; accessCode = f.accessCode; fileCount = f.fileCount; createdAt = f.createdAt };
  };

  func fileToPublic(f : FolderTypes.FileInternal) : FolderTypes.File {
    { id = f.id; folderId = f.folderId; name = f.name; size = f.size; mimeType = f.mimeType; uploadedAt = f.uploadedAt; blob = f.blob };
  };

  /// List all folders for the authenticated photographer
  public query ({ caller }) func listFolders() : async [FolderTypes.Folder] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    FolderLib.listFolders(folders, caller);
  };

  /// Get a single folder by ID (owner only)
  public query ({ caller }) func getFolder(id : Common.FolderId) : async ?FolderTypes.Folder {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    switch (FolderLib.getFolder(folders, id, caller)) {
      case (?f) { ?folderToPublic(f) };
      case null { null };
    };
  };

  /// Create a new folder
  public shared ({ caller }) func createFolder(input : FolderTypes.CreateFolderInput) : async FolderTypes.Folder {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let id = counters.nextFolderId.toText();
    counters.nextFolderId += 1;
    let accessCode = FolderLib.generateAccessCode();
    let now = Time.now();
    let folder = FolderLib.newFolder(id, caller, input, accessCode, now);
    folders.add(id, folder);
    folderToPublic(folder);
  };

  /// Update folder name and/or price
  public shared ({ caller }) func updateFolder(input : FolderTypes.UpdateFolderInput) : async FolderTypes.Folder {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let folder = switch (FolderLib.getFolder(folders, input.id, caller)) {
      case (?f) { f };
      case null { Runtime.trap("Folder not found or not owned") };
    };
    folder.name := input.name;
    folder.priceInCents := input.priceInCents;
    folderToPublic(folder);
  };

  /// Delete a folder and all its files
  public shared ({ caller }) func deleteFolder(id : Common.FolderId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    switch (FolderLib.getFolder(folders, id, caller)) {
      case null { Runtime.trap("Folder not found or not owned") };
      case (?_) {
        // Remove all files in this folder
        let fileIds = files.entries()
          .filter(func(entry : (Common.FileId, FolderTypes.FileInternal)) : Bool { let (_, f) = entry; f.folderId == id })
          .map(func(entry : (Common.FileId, FolderTypes.FileInternal)) : Common.FileId { let (fid, _) = entry; fid })
          .toArray();
        for (fid in fileIds.values()) {
          files.remove(fid);
        };
        folders.remove(id);
      };
    };
  };

  /// Regenerate access code for a folder
  public shared ({ caller }) func regenerateAccessCode(id : Common.FolderId) : async Text {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let folder = switch (FolderLib.getFolder(folders, id, caller)) {
      case (?f) { f };
      case null { Runtime.trap("Folder not found or not owned") };
    };
    let newCode = FolderLib.generateAccessCode();
    // Replace folder with updated access code (immutable field — must re-insert)
    let updated : FolderTypes.FolderInternal = {
      id = folder.id;
      owner = folder.owner;
      var name = folder.name;
      var priceInCents = folder.priceInCents;
      accessCode = newCode;
      var fileCount = folder.fileCount;
      createdAt = folder.createdAt;
    };
    folders.add(id, updated);
    newCode;
  };

  /// Upload a file to a folder
  public shared ({ caller }) func uploadFile(input : FolderTypes.UploadFileInput) : async FolderTypes.File {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let folder = switch (FolderLib.getFolder(folders, input.folderId, caller)) {
      case (?f) { f };
      case null { Runtime.trap("Folder not found or not owned") };
    };
    let fileId = counters.nextFileId.toText();
    counters.nextFileId += 1;
    let now = Time.now();
    let file = FolderLib.newFile(fileId, caller, input, now);
    files.add(fileId, file);
    folder.fileCount += 1;
    fileToPublic(file);
  };

  /// Delete a file from a folder
  public shared ({ caller }) func deleteFile(fileId : Common.FileId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let file = switch (files.get(fileId)) {
      case (?f) { f };
      case null { Runtime.trap("File not found") };
    };
    if (file.owner != caller) {
      Runtime.trap("Unauthorized: not the file owner");
    };
    // Decrement folder fileCount
    switch (folders.get(file.folderId)) {
      case (?folder) {
        if (folder.fileCount > 0) {
          folder.fileCount -= 1;
        };
      };
      case null {};
    };
    files.remove(fileId);
  };

  /// List files in a folder (owner only)
  public query ({ caller }) func listFiles(folderId : Common.FolderId) : async [FolderTypes.File] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    FolderLib.listFiles(files, folderId, caller);
  };

  /// Validate access code — returns folder info + payment status (public, no auth required)
  public query func validateAccessCode(accessCode : Common.AccessCode) : async ?FolderTypes.AccessCodeResult {
    switch (FolderLib.findFolderByAccessCode(folders, accessCode)) {
      case null { null };
      case (?folder) {
        let isPaid = PaymentLib.isFolderPaid(payments, folder.id);
        let token : ?Common.DownloadToken = if (isPaid) {
          // Find an existing download token for this folder
          downloadTokens.entries()
            .find(func(entry : (Common.DownloadToken, Common.FolderId)) : Bool { let (_, fid) = entry; fid == folder.id })
            .chain(func(entry : (Common.DownloadToken, Common.FolderId)) : ?Common.DownloadToken { let (t, _) = entry; ?t });
        } else { null };
        ?{
          folder = folderToPublic(folder);
          isPaid;
          downloadToken = token;
        };
      };
    };
  };
};
