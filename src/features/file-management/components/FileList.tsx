import { useEffect, useState } from "react";
import TimeAgo from "javascript-time-ago";
import es from "javascript-time-ago/locale/es";
import FileItem from "./FileItem";
import LibraryFileSelector from "./LibraryFileSelector";
import { setFiles } from "../stores/files";
import type { FilesApi } from "@/modules/files/@core-contracts/api";
import type { FileData, ExecEnvironment } from "../types";

TimeAgo.addLocale(es);

interface FileListProps {
  execEnv: ExecEnvironment;
}

export default function FileList({ execEnv }: FileListProps) {
  const [files, setFilesState] = useState<FileData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filesApi, setFilesApi] = useState<FilesApi | null>(null);
  const timeAgo = new TimeAgo("es-ES");

  useEffect(() => {
    const loadFiles = async () => {
      try {
        setLoading(true);

        if (execEnv === "browser") {
          // Importación dinámica del filesApiFactory con configuración browser
          const { filesApiFactory } = await import("@/modules/files/index");
          const api = await filesApiFactory({
            storage: "browser-mock",
            repository: "idb",
          });
          setFilesApi(api);

          const loadedFiles = await api.getAllFiles();
          console.log({ loadedFiles });
          setFilesState(loadedFiles as FileData[]);

          // Actualizar el store de nanostores
          const indexedFiles: { [key: string]: any } = {};
          loadedFiles.forEach((file: any) => {
            indexedFiles[file.id] = file;
          });
          setFiles(indexedFiles);
        } else {
          // Usar la API del servidor
          const response = await fetch("/api/file");
          if (!response.ok) {
            throw new Error("Error al cargar los archivos");
          }
          const loadedFiles = await response.json();
          setFilesState(loadedFiles);

          // Actualizar el store de nanostores
          const indexedFiles: { [key: string]: any } = {};
          loadedFiles.forEach((file: any) => {
            indexedFiles[file.id] = file;
          });
          setFiles(indexedFiles);
        }
      } catch (err) {
        console.error("Error loading files:", err);
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    loadFiles();
  }, [execEnv]);

  const handleDelete = async (id: string) => {
    if (execEnv === "browser" && filesApi) {
      // Usar la API del browser
      const res = await filesApi.deleteFile(id);
      console.log({ res });
      setFilesState((prev) => prev.filter((f) => f.id !== id));
    } else {
      // Usar la API del servidor
      const res = await fetch(`/api/file/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setFilesState((prev) => prev.filter((f) => f.id !== id));
      } else {
        throw new Error("Error al eliminar el archivo");
      }
    }
  };

  const handleDetail = async (id: string) => {
    if (execEnv === "browser" && filesApi) {
      // Usar la API del browser
      const file = await filesApi.getFileById(id);
      console.log({ file });
      // Aquí puedes mostrar un modal o panel con los detalles
    } else {
      // Usar la API del servidor
      const res = await fetch(`/api/file/${id}`, {
        method: "GET",
      });
      const file = await res.json();
      console.log({ file });
      // Aquí puedes mostrar un modal o panel con los detalles
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700/50 shadow-xl">
        <div className="flex flex-col items-center justify-center p-12 gap-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-700"></div>
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-blue-400 absolute top-0 left-0"></div>
          </div>
          <span className="text-slate-300 font-medium">Cargando archivos...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-red-900/20 to-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-red-500/30 shadow-xl">
        <div className="flex items-center gap-4 text-red-400">
          <i className="bx bxs-error text-4xl"></i>
          <div>
            <h3 className="font-semibold text-lg">Error al cargar archivos</h3>
            <p className="text-sm text-red-300 mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/50 backdrop-blur-sm p-12 rounded-xl border border-slate-700/50 shadow-xl">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="p-6 bg-slate-700/30 rounded-full">
            <i className="bx bxs-folder-open text-6xl text-slate-500"></i>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-200 mb-2">
              No hay archivos todavía
            </h3>
            <p className="text-slate-400 text-sm">
              Sube tu primer documento PDF para comenzar
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 shadow-xl overflow-hidden">
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center gap-3 mb-2">
          <i className="bx bxs-folder text-2xl text-blue-400"></i>
          <h2 className="text-xl font-semibold text-slate-100">
            Mis Archivos
          </h2>
          <span className="ml-auto px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full font-medium">
            {files.length} {files.length === 1 ? 'archivo' : 'archivos'}
          </span>
        </div>
        <p className="text-slate-400 text-sm">
          Documentos disponibles en tu biblioteca
        </p>
      </div>

      <LibraryFileSelector />

      <div className="overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-slate-900 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-600 hover:[&::-webkit-scrollbar-thumb]:bg-slate-500">
        <table className="w-full">
          <thead className="bg-slate-900/50 sticky top-0">
            <tr className="border-b border-slate-700/50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                <div className="flex items-center gap-2">
                  <i className="bx bx-file text-lg"></i>
                  Nombre
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <i className="bx bx-time text-lg"></i>
                  Última modificación
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <i className="bx bx-data text-lg"></i>
                  Tamaño
                </div>
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300 sticky right-0 bg-slate-900/50 border-l border-slate-700/50 whitespace-nowrap">
                <div className="flex items-center justify-center gap-2">
                  <i className="bx bx-cog text-lg"></i>
                  Acciones
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/30">
            {files.map((file) => (
              <FileItem
                key={file.id}
                file={file}
                onDelete={handleDelete}
                onDetail={handleDetail}
                timeAgo={timeAgo}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
