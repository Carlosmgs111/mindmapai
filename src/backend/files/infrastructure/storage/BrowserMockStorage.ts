import type { Storage } from "../../@core-contracts/storage";

/**
 * BrowserMockStorage - Mock implementation for browser environment
 *
 * This implementation stores files in memory (Map) instead of using the File System Access API.
 * It's designed to emulate storage behavior in the browser while you develop a real
 * cloud storage provider implementation.
 *
 * Use cases:
 * - Development/testing without File System Access API permissions
 * - Temporary solution until cloud storage provider is implemented
 * - Preview mode where persistent storage isn't needed
 *
 * Limitations:
 * - Files are lost on page refresh (stored in memory only)
 * - Limited by browser memory constraints
 * - Not suitable for production use
 */
export class BrowserMockStorage implements Storage {
  private fileStore: Map<string, Buffer> = new Map();

  async uploadFile(file: Buffer, fileName: string): Promise<string> {
    // Store the file in memory
    this.fileStore.set(fileName, file);

    console.log(`[BrowserMockStorage] File "${fileName}" stored in memory (${file.length} bytes)`);

    // Return the fileName as the file identifier
    return fileName;
  }

  async deleteFile(fileUrl: string): Promise<boolean> {
    const existed = this.fileStore.has(fileUrl);

    if (existed) {
      this.fileStore.delete(fileUrl);
      console.log(`[BrowserMockStorage] File "${fileUrl}" deleted from memory`);
    } else {
      console.log(`[BrowserMockStorage] File "${fileUrl}" not found in memory`);
    }

    // Return true if file existed and was deleted, or if it didn't exist
    return true;
  }

  async loadFileBuffer(fileName: string): Promise<Buffer> {
    const file = this.fileStore.get(fileName);

    if (!file) {
      console.error(`[BrowserMockStorage] File "${fileName}" not found in memory`);
      throw new Error(`File not found: ${fileName}`);
    }

    console.log(`[BrowserMockStorage] File "${fileName}" loaded from memory (${file.length} bytes)`);

    return file;
  }

  /**
   * Utility method to check if a file exists in the mock storage
   */
  hasFile(fileName: string): boolean {
    return this.fileStore.has(fileName);
  }

  /**
   * Utility method to get all stored file names
   */
  getStoredFileNames(): string[] {
    return Array.from(this.fileStore.keys());
  }

  /**
   * Utility method to get the total number of stored files
   */
  getFileCount(): number {
    return this.fileStore.size;
  }

  /**
   * Utility method to get the total size of stored files in bytes
   */
  getTotalSize(): number {
    let totalSize = 0;
    for (const buffer of this.fileStore.values()) {
      totalSize += buffer.length;
    }
    return totalSize;
  }

  /**
   * Utility method to clear all stored files (useful for testing)
   */
  clear(): void {
    const count = this.fileStore.size;
    this.fileStore.clear();
    console.log(`[BrowserMockStorage] Cleared ${count} files from memory`);
  }
}
