import Common "common";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type FolderStatus = {
    #active;
    #deleted;
  };

  /// Internal folder record (mutable fields for updates)
  public type FolderInternal = {
    id : Common.FolderId;
    owner : Principal;
    var name : Text;
    var priceInCents : Nat;
    accessCode : Common.AccessCode;
    var fileCount : Nat;
    createdAt : Common.Timestamp;
  };

  /// Shared/public folder record (immutable, safe for API boundary)
  public type Folder = {
    id : Common.FolderId;
    owner : Text;
    name : Text;
    priceInCents : Nat;
    accessCode : Common.AccessCode;
    fileCount : Nat;
    createdAt : Common.Timestamp;
  };

  /// Input for creating a folder
  public type CreateFolderInput = {
    name : Text;
    priceInCents : Nat;
  };

  /// Input for updating a folder
  public type UpdateFolderInput = {
    id : Common.FolderId;
    name : Text;
    priceInCents : Nat;
  };

  /// Internal file record
  public type FileInternal = {
    id : Common.FileId;
    folderId : Common.FolderId;
    owner : Principal;
    name : Text;
    size : Nat;
    mimeType : Text;
    uploadedAt : Common.Timestamp;
    blob : Storage.ExternalBlob;
  };

  /// Shared/public file record
  public type File = {
    id : Common.FileId;
    folderId : Common.FolderId;
    name : Text;
    size : Nat;
    mimeType : Text;
    uploadedAt : Common.Timestamp;
    blob : Storage.ExternalBlob;
  };

  /// Input for uploading a file
  public type UploadFileInput = {
    folderId : Common.FolderId;
    name : Text;
    size : Nat;
    mimeType : Text;
    blob : Storage.ExternalBlob;
  };

  /// Result when validating an access code
  public type AccessCodeResult = {
    folder : Folder;
    isPaid : Bool;
    downloadToken : ?Common.DownloadToken;
  };
};
