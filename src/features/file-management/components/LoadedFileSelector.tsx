import { useState, useEffect, useRef } from "react";
import { fileStore, setStagedFiles, setFiles } from "../stores/files";
import { sc } from "@/shared/utils/sc";
import { filesApiFactory } from "@/backend/files";

const filesApi = await filesApiFactory({
  storage: "browser-mock",
  repository: "idb",
});

interface LoadedFileSelectorProps {
  uploadEndpoint?: string;
  id?: string;
  className?: string;
}

export default function LoadedFileSelector({
  uploadEndpoint,
  id,
  className = "",
}: LoadedFileSelectorProps) {
  const [fileName, setFileName] = useState<string>(
    "Haz clic para seleccionar archivo"
  );
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Restaurar archivo del estado al montar el componente
    const fileStored = fileStore.get();
    if (
      fileStored.stagedIndexes[0] &&
      fileStored.files[fileStored.stagedIndexes[0]] instanceof File
    ) {
      const file = fileStored.files[fileStored.stagedIndexes[0]] as File;
      setFileName(file.name);

      // Restaurar el archivo en el input
      if (fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log({ files });
    if (files && files.length > 0) {
      const fileNames = Array.from(files).map((file: File) => {
        const fileId = crypto.randomUUID();
        const currentFiles = { ...fileStore.get().files, [fileId]: file };
        setFiles(currentFiles);
        setStagedFiles([fileId]);
        return file.name;
      });
      setFileName(fileNames.join(", "));
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fileInputRef.current?.files) {
      return;
    }

    if (fileInputRef.current.files.length === 0) {
      alert("No se seleccionó ningún archivo");
      return;
    }

    // if (!uploadEndpoint) {
    //   alert("No se proporcionó un endpoint");
    //   return;
    // }

    const formData = new FormData();
    Array.from(fileInputRef.current.files).forEach((file) => {
      formData.append("file", file);
    });

    const fileUploadDTO = {
      id: crypto.randomUUID(),
      name: fileInputRef.current.files[0].name,
      type: fileInputRef.current.files[0].type,
      size: fileInputRef.current.files[0].size,
      lastModified: new Date().getTime(),
      buffer: new Uint8Array(
        await fileInputRef.current.files[0].arrayBuffer()
      ) as Buffer,
      url: "",
    };

    const res = await filesApi.uploadFile({ file: fileUploadDTO });
    console.log({ res });
    if (res) {
      window.location.reload();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer?.files;
    if (files && files.length > 0 && fileInputRef.current) {
      fileInputRef.current.files = files;
      handleFileChange({ target: fileInputRef.current } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const hasFile = fileName !== "Haz clic para seleccionar archivo";

  return (
    <form
      id={id}
      className={sc(
        "flex flex-col sm:flex-row gap-3 items-stretch text-slate-200 w-full"
      )}
      onSubmit={handleUpload}
    >
      <input
        ref={fileInputRef}
        className="hidden"
        id="fileInput"
        type="file"
        name="file"
        accept=".pdf"
        onChange={handleFileChange}
      />
      <label
        id="fileLabel"
        className={sc(
          "group relative flex-1 p-5 rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden",
          hasFile
            ? "bg-blue-500/10 border-blue-500/50 hover:bg-blue-500/20 hover:border-blue-500"
            : "bg-slate-700/30 border-slate-600 hover:bg-slate-700/50 hover:border-slate-500",
          isDragging && "bg-slate-700/50 border-slate-500",
          className
        )}
        htmlFor="fileInput"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex items-center gap-3">
          <div
            className={`p-3 aspect-square w-fit h-auto rounded-lg transition-all ${
              isDragging
                ? "bg-blue-500/30 scale-110"
                : hasFile
                ? "bg-blue-500/20"
                : "bg-slate-600/30 group-hover:bg-slate-600/50"
            }`}
          >
            <i
              className={`text-2xl transition-all ${
                isDragging
                  ? "bx bxs-archive-arrow-down text-blue-300 animate-bounce"
                  : hasFile
                  ? "bx bxs-file-plus text-blue-400"
                  : "bx bxs-archive-arrow-up text-slate-400 group-hover:text-slate-300"
              }`}
            ></i>
          </div>
          <div className="flex-1 min-w-0">
            <p
              className={`font-medium truncate ${
                isDragging
                  ? "text-blue-300"
                  : hasFile
                  ? "text-slate-200"
                  : "text-slate-400 group-hover:text-slate-300"
              }`}
            >
              {isDragging ? "Suelta el archivo aquí" : fileName}
            </p>
            {!hasFile && !isDragging && (
              <p className="text-xs text-slate-500 mt-1">
                Selecciona o arrastra un archivo PDF
              </p>
            )}
          </div>
          <i className={`bx text-xl transition-all ${
            isDragging
              ? "bx-down-arrow-alt text-blue-400 animate-pulse"
              : "bx-right-arrow-alt text-slate-500 group-hover:text-slate-400"
          }`}></i>
        </div>
      </label>
      {uploadEndpoint && (
        <button
          className={`px-6 py-4 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 flex items-center justify-center gap-2 ${
            hasFile
              ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg hover:shadow-blue-500/30"
              : "bg-slate-700/50 text-slate-500 cursor-not-allowed"
          }`}
          id="uploadButton"
          type="submit"
          disabled={!hasFile}
        >
          <i className="bx bx-folder-up-arrow text-xl"></i>
          Subir archivo
        </button>
      )}
    </form>
  );
}
