import type { Repository } from "../../@core-contracts/repositories";
import type { File } from "../../@core-contracts/entities";

interface IDBFilesConfig {
  dbName: string;
  version: number;
}

export class IDBRepository implements Repository {
  private config: IDBFilesConfig;
  private currentVersion?: number;

  constructor(config?: Partial<IDBFilesConfig>) {
    this.config = {
      dbName: config?.dbName || "files-repository-db",
      version: config?.version || 1,
    };
  }

  private async getCurrentVersion(): Promise<number> {
    if (this.currentVersion !== undefined) {
      return this.currentVersion;
    }

    return new Promise((resolve) => {
      const request = indexedDB.open(this.config.dbName);
      request.onsuccess = () => {
        const db = request.result;
        this.currentVersion = db.version;
        db.close();
        resolve(this.currentVersion);
      };
      request.onerror = () => {
        this.currentVersion = this.config.version;
        resolve(this.config.version);
      };
    });
  }

  private async openDB(): Promise<IDBDatabase> {
    const version = await this.getCurrentVersion();

    return new Promise((resolve, reject) => {
      if (!("indexedDB" in window)) {
        reject(new Error("IndexedDB not supported"));
        return;
      }

      const request = indexedDB.open(this.config.dbName, version);

      request.onerror = () => reject(request.error);

      request.onsuccess = () => {
        const db = request.result;
        const storeName = "files";

        // If store doesn't exist, trigger upgrade
        if (!db.objectStoreNames.contains(storeName)) {
          this.currentVersion = version + 1;
          db.close();
          this.openDB().then(resolve).catch(reject);
          return;
        }
        resolve(db);
      };

      request.onupgradeneeded = () => {
        const db = request.result;
        const storeName = "files";

        if (!db.objectStoreNames.contains(storeName)) {
          const store = db.createObjectStore(storeName, { keyPath: "id" });
          store.createIndex("name", "name", { unique: false });
          store.createIndex("type", "type", { unique: false });
          store.createIndex("lastModified", "lastModified", { unique: false });
        }
      };
    });
  }

  async saveFile(file: File): Promise<void> {
    const db = await this.openDB();
    const storeName = "files";

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.put(file);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getFileById(id: string): Promise<File | undefined> {
    const db = await this.openDB();
    const storeName = "files";

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.get(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || undefined);
    });
  }

  async getAllFiles(): Promise<File[]> {
    const db = await this.openDB();
    const storeName = "files";

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || []);
    });
  }

  async deleteFile(id: string): Promise<boolean> {
    const db = await this.openDB();
    const storeName = "files";

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);

      const getRequest = store.get(id);

      getRequest.onerror = () => reject(getRequest.error);
      getRequest.onsuccess = () => {
        if (!getRequest.result) {
          resolve(true);
          return;
        }
        const deleteRequest = store.delete(id);

        deleteRequest.onerror = () => reject(deleteRequest.error);
        deleteRequest.onsuccess = () => resolve(true);
      };
    });
  }

  async purge(): Promise<void> {
    const db = await this.openDB();
    const storeName = "files";

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.clear();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

}