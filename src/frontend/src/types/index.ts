export type {
  Folder,
  FolderId,
  File,
  FileId,
  Profile,
  AccessCode,
  AccessCodeResult,
  DownloadToken,
  StripeSessionId,
  StripeSessionStatus,
  VerifyPaymentResult,
  CreateFolderInput,
  UpdateFolderInput,
  UploadFileInput,
  UpdateProfileInput,
  CreateCheckoutInput,
} from "../backend";

export { UserRole } from "../backend";

export interface ClientSession {
  accessCode: string;
  folderId: string;
  downloadToken?: string;
  isPaid: boolean;
}

export interface UploadProgress {
  fileId: string;
  name: string;
  progress: number;
  status: "uploading" | "done" | "error";
}
