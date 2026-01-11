import { useState } from "react";
import type { FilesApi } from "@/modules/files/@core-contracts/api";
import type { ExecEnvironment } from "../types";

interface FileUploaderProps {
  execEnv: ExecEnvironment;
  onUploadComplete?: () => void;
}

export default function FileUploader({ execEnv, onUploadComplete }: FileUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filesApi, setFilesApi] = useState<FilesApi | null>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      if (execEnv === "browser") {
        // Cargar la API del browser si no está cargada
        if (!filesApi) {
          const { filesApiFactory } = await import("@/modules/files/index");
          const api = await filesApiFactory({
            storage: "browser-mock",
            repository: "idb",
          });
          setFilesApi(api);

          // Subir el archivo usando la API del browser
          const buffer = await file.arrayBuffer();
          await api.uploadFile({
            id: crypto.randomUUID(),
            name: file.name,
            type: file.type,
            size: file.size,
            lastModified: file.lastModified,
            buffer: Buffer.from(buffer),
            url: "",
          });
        } else {
          // API ya cargada
          const buffer = await file.arrayBuffer();
          await filesApi.uploadFile({
            id: crypto.randomUUID(),
            name: file.name,
            type: file.type,
            size: file.size,
            lastModified: file.lastModified,
            buffer: Buffer.from(buffer),
            url: "",
          });
        }
      } else {
        // Modo servidor - usar FormData
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/file", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Error al subir el archivo");
        }
      }

      // Limpiar input y notificar éxito
      event.target.value = "";
      onUploadComplete?.();
    } catch (err) {
      console.error("Error uploading file:", err);
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer hover:bg-gray-700/30 transition-all">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-400">
            <span className="font-semibold">Click para subir</span> o arrastra un archivo
          </p>
          <p className="text-xs text-gray-500">PDF (MAX. 10MB)</p>
        </div>
        <input
          type="file"
          className="hidden"
          accept=".pdf"
          onChange={handleFileSelect}
          disabled={uploading}
        />
      </label>

      {uploading && (
        <div className="flex items-center justify-center p-4 bg-blue-900/20 rounded-lg">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-400 mr-3"></div>
          <span className="text-blue-400">Subiendo archivo...</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-900/20 rounded-lg">
          <p className="text-red-400">Error: {error}</p>
        </div>
      )}
    </div>
  );
}
