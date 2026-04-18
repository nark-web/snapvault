import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type VerifyPaymentResult = {
    __kind__: "pending";
    pending: null;
} | {
    __kind__: "granted";
    granted: {
        downloadToken: DownloadToken;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type Timestamp = bigint;
export interface File {
    id: FileId;
    blob: ExternalBlob;
    name: string;
    size: bigint;
    mimeType: string;
    folderId: FolderId;
    uploadedAt: Timestamp;
}
export interface Profile {
    name: string;
    email: string;
}
export type DownloadToken = string;
export interface http_header {
    value: string;
    name: string;
}
export interface UpdateFolderInput {
    id: FolderId;
    name: string;
    priceInCents: bigint;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface CreateFolderInput {
    name: string;
    priceInCents: bigint;
}
export interface AccessCodeResult {
    isPaid: boolean;
    downloadToken?: DownloadToken;
    folder: Folder;
}
export interface UpdateProfileInput {
    name: string;
    email: string;
}
export type AccessCode = string;
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface CreateCheckoutInput {
    cancelUrl: string;
    folderId: FolderId;
    successUrl: string;
}
export interface Folder {
    id: FolderId;
    owner: string;
    name: string;
    createdAt: Timestamp;
    fileCount: bigint;
    accessCode: AccessCode;
    priceInCents: bigint;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export type FileId = string;
export type StripeSessionId = string;
export type FolderId = string;
export interface UploadFileInput {
    blob: ExternalBlob;
    name: string;
    size: bigint;
    mimeType: string;
    folderId: FolderId;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createCheckoutSession(input: CreateCheckoutInput): Promise<string>;
    createFolder(input: CreateFolderInput): Promise<Folder>;
    deleteFile(fileId: FileId): Promise<void>;
    deleteFolder(id: FolderId): Promise<void>;
    getCallerUserProfile(): Promise<Profile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getFolder(id: FolderId): Promise<Folder | null>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getUserProfile(user: Principal): Promise<Profile | null>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    listFiles(folderId: FolderId): Promise<Array<File>>;
    listFolders(): Promise<Array<Folder>>;
    regenerateAccessCode(id: FolderId): Promise<string>;
    saveCallerUserProfile(input: UpdateProfileInput): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateFolder(input: UpdateFolderInput): Promise<Folder>;
    uploadFile(input: UploadFileInput): Promise<File>;
    validateAccessCode(accessCode: AccessCode): Promise<AccessCodeResult | null>;
    validateDownloadToken(token: DownloadToken, folderId: FolderId): Promise<boolean>;
    verifyPayment(sessionId: StripeSessionId): Promise<VerifyPaymentResult>;
}
