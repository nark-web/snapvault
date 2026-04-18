import { createActor } from "../backend";
import type { Backend } from "../backend";
import type {
  AccessCodeResult,
  CreateCheckoutInput,
  CreateFolderInput,
  File,
  FileId,
  Folder,
  FolderId,
  Profile,
  StripeSessionId,
  StripeSessionStatus,
  UpdateFolderInput,
  UpdateProfileInput,
  UploadFileInput,
  VerifyPaymentResult,
} from "../types";

// Type for the actor instance
export type ActorInstance = Backend | null;

// Re-export createActor for use in hooks
export { createActor };

// Folder operations
export async function apiFolderList(actor: ActorInstance): Promise<Folder[]> {
  if (!actor) return [];
  return actor.listFolders();
}

export async function apiFolderGet(
  actor: ActorInstance,
  id: FolderId,
): Promise<Folder | null> {
  if (!actor) return null;
  return actor.getFolder(id);
}

export async function apiFolderCreate(
  actor: ActorInstance,
  input: CreateFolderInput,
): Promise<Folder> {
  if (!actor) throw new Error("No actor");
  return actor.createFolder(input);
}

export async function apiFolderUpdate(
  actor: ActorInstance,
  input: UpdateFolderInput,
): Promise<Folder> {
  if (!actor) throw new Error("No actor");
  return actor.updateFolder(input);
}

export async function apiFolderDelete(
  actor: ActorInstance,
  id: FolderId,
): Promise<void> {
  if (!actor) throw new Error("No actor");
  return actor.deleteFolder(id);
}

export async function apiFolderRegenerateCode(
  actor: ActorInstance,
  id: FolderId,
): Promise<string> {
  if (!actor) throw new Error("No actor");
  return actor.regenerateAccessCode(id);
}

// File operations
export async function apiFileList(
  actor: ActorInstance,
  folderId: FolderId,
): Promise<File[]> {
  if (!actor) return [];
  return actor.listFiles(folderId);
}

export async function apiFileUpload(
  actor: ActorInstance,
  input: UploadFileInput,
): Promise<File> {
  if (!actor) throw new Error("No actor");
  return actor.uploadFile(input);
}

export async function apiFileDelete(
  actor: ActorInstance,
  fileId: FileId,
): Promise<void> {
  if (!actor) throw new Error("No actor");
  return actor.deleteFile(fileId);
}

// Profile operations
export async function apiProfileGet(
  actor: ActorInstance,
): Promise<Profile | null> {
  if (!actor) return null;
  return actor.getCallerUserProfile();
}

export async function apiProfileSave(
  actor: ActorInstance,
  input: UpdateProfileInput,
): Promise<void> {
  if (!actor) throw new Error("No actor");
  return actor.saveCallerUserProfile(input);
}

// Client access & payment
export async function apiValidateAccessCode(
  actor: ActorInstance,
  code: string,
): Promise<AccessCodeResult | null> {
  if (!actor) return null;
  return actor.validateAccessCode(code);
}

export async function apiCreateCheckout(
  actor: ActorInstance,
  input: CreateCheckoutInput,
): Promise<string> {
  if (!actor) throw new Error("No actor");
  return actor.createCheckoutSession(input);
}

export async function apiVerifyPayment(
  actor: ActorInstance,
  sessionId: StripeSessionId,
): Promise<VerifyPaymentResult> {
  if (!actor) throw new Error("No actor");
  return actor.verifyPayment(sessionId);
}

export async function apiGetStripeSessionStatus(
  actor: ActorInstance,
  sessionId: string,
): Promise<StripeSessionStatus> {
  if (!actor) throw new Error("No actor");
  return actor.getStripeSessionStatus(sessionId);
}

export async function apiValidateDownloadToken(
  actor: ActorInstance,
  token: string,
  folderId: FolderId,
): Promise<boolean> {
  if (!actor) return false;
  return actor.validateDownloadToken(token, folderId);
}
