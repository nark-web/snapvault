import Common "../types/common";
import Types "../types/folders";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Time "mo:core/Time";

module {
  /// Convert internal folder to public shared type
  public func toPublic(self : Types.FolderInternal) : Types.Folder {
    {
      id = self.id;
      owner = self.owner.toText();
      name = self.name;
      priceInCents = self.priceInCents;
      accessCode = self.accessCode;
      fileCount = self.fileCount;
      createdAt = self.createdAt;
    };
  };

  /// Convert internal file to public shared type
  public func fileToPublic(self : Types.FileInternal) : Types.File {
    {
      id = self.id;
      folderId = self.folderId;
      name = self.name;
      size = self.size;
      mimeType = self.mimeType;
      uploadedAt = self.uploadedAt;
      blob = self.blob;
    };
  };

  /// Create a new folder record
  public func newFolder(
    id : Common.FolderId,
    owner : Principal,
    input : Types.CreateFolderInput,
    accessCode : Common.AccessCode,
    now : Common.Timestamp,
  ) : Types.FolderInternal {
    {
      id;
      owner;
      var name = input.name;
      var priceInCents = input.priceInCents;
      accessCode;
      var fileCount = 0;
      createdAt = now;
    };
  };

  /// Generate an 8-character alphanumeric access code
  public func generateAccessCode() : Common.AccessCode {
    let charset : [Char] = [
      'A','B','C','D','E','F','G','H','I','J','K','L','M',
      'N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
      '0','1','2','3','4','5','6','7','8','9'
    ];
    let charsetSize = 36;
    let seed = Int.abs(Time.now());
    var s = seed;
    var code = "";
    for (_ in Nat.range(0, 8)) {
      let idx = s % charsetSize;
      s := (s * 1664525 + 1013904223) % 4294967296;
      code := code # Text.fromChar(charset[idx]);
    };
    code;
  };

  /// Create a new file record
  public func newFile(
    id : Common.FileId,
    owner : Principal,
    input : Types.UploadFileInput,
    now : Common.Timestamp,
  ) : Types.FileInternal {
    {
      id;
      folderId = input.folderId;
      owner;
      name = input.name;
      size = input.size;
      mimeType = input.mimeType;
      uploadedAt = now;
      blob = input.blob;
    };
  };

  /// List all folders owned by a principal (as shared types)
  public func listFolders(
    folders : Map.Map<Common.FolderId, Types.FolderInternal>,
    owner : Principal,
  ) : [Types.Folder] {
    folders.entries()
      .filter(func(entry : (Common.FolderId, Types.FolderInternal)) : Bool { let (_, f) = entry; f.owner == owner })
      .map(func(entry : (Common.FolderId, Types.FolderInternal)) : Types.Folder { let (_, f) = entry; toPublic(f) })
      .toArray();
  };

  /// Get a folder by id (returns null if not found or not owned)
  public func getFolder(
    folders : Map.Map<Common.FolderId, Types.FolderInternal>,
    id : Common.FolderId,
    owner : Principal,
  ) : ?Types.FolderInternal {
    switch (folders.get(id)) {
      case (null) { null };
      case (?f) {
        if (f.owner == owner) { ?f } else { null };
      };
    };
  };

  /// List all files in a folder owned by a principal
  public func listFiles(
    files : Map.Map<Common.FileId, Types.FileInternal>,
    folderId : Common.FolderId,
    owner : Principal,
  ) : [Types.File] {
    files.entries()
      .filter(func(entry : (Common.FileId, Types.FileInternal)) : Bool { let (_, f) = entry; f.folderId == folderId and f.owner == owner })
      .map(func(entry : (Common.FileId, Types.FileInternal)) : Types.File { let (_, f) = entry; fileToPublic(f) })
      .toArray();
  };

  /// Validate access code, returning the folder if found
  public func findFolderByAccessCode(
    folders : Map.Map<Common.FolderId, Types.FolderInternal>,
    accessCode : Common.AccessCode,
  ) : ?Types.FolderInternal {
    switch (folders.entries().find(func(entry : (Common.FolderId, Types.FolderInternal)) : Bool { let (_, f) = entry; f.accessCode == accessCode })) {
      case (?(_, f)) { ?f };
      case null { null };
    };
  };
};
