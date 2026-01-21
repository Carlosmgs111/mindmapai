import { useState } from "react";
import { useStore } from "@nanostores/react";
import TimeAgo from "javascript-time-ago";
import type { FileData } from "../types";
import { selectionMode } from "../stores/selectionMode";
import { fileStore, setStagedFiles } from "../stores/files";

interface FileItemProps {
  file: FileData;
  onDelete: (id: string) => Promise<void>;
  onDetail: (id: string) => Promise<void>;
  timeAgo: TimeAgo;
}

export default function FileItem({ file, onDelete, onDetail, timeAgo }: FileItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const mode = useStore(selectionMode);
  const files = useStore(fileStore);
  const isSelected = files.stagedIndexes.includes(file.id);

  const handleDelete = async () => {
    const result = window.confirm(
      "Esta a punto de eliminar el archivo, esta seguro de continuar?"
    );
    if (result) {
      setIsDeleting(true);
      try {
        await onDelete(file.id);
      } catch (error) {
        console.error("Error deleting file:", error);
        alert("Error al eliminar el archivo");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleDetail = async () => {
    try {
      await onDetail(file.id);
    } catch (error) {
      console.error("Error getting file details:", error);
    }
  };

  const handleFileClick = () => {
    if (!mode) return;

    if (isSelected) {
      // Deseleccionar archivo
      setStagedFiles(files.stagedIndexes.filter((id) => id !== file.id));
    } else {
      // Seleccionar archivo (solo uno a la vez)
      setStagedFiles([file.id]);
    }
  };

  return (
    <tr
      id="file-index"
      data-id={file.id}
      onClick={handleFileClick}
      className={`group hover:bg-slate-700/20 transition-all duration-200 ${
        isDeleting ? "opacity-50 pointer-events-none" : ""
      } ${isSelected ? "bg-blue-500/10 border-l-4 border-l-blue-500" : ""} ${
        mode ? "cursor-pointer" : ""
      }`}
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          {mode && (
            <div className="flex-shrink-0">
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  isSelected
                    ? "bg-blue-500 border-blue-500"
                    : "border-slate-600 group-hover:border-slate-500"
                }`}
              >
                {isSelected && (
                  <i className="bx bx-check text-white text-sm"></i>
                )}
              </div>
            </div>
          )}
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex-shrink-0 w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
              <i className="bx bxs-file text-xl text-red-400"></i>
            </div>
            <span className="text-slate-200 font-medium truncate group-hover:text-blue-400 transition-colors">
              {file.name}
            </span>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-slate-400 text-sm">
        <div className="flex items-center gap-2">
          <i className="bx bx-calendar text-lg"></i>
          {timeAgo.format(file.lastModified)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-slate-400 text-sm">
        <div className="flex items-center gap-2">
          <i className="bx bx-file text-lg"></i>
          {new Intl.NumberFormat("es-ES", {
            style: "unit",
            unit: "kilobyte",
          }).format(Math.round(file.size / 1024))}
        </div>
      </td>
      <td className="px-6 py-4 sticky right-0 bg-slate-800/95 backdrop-blur-sm border-l border-slate-700/50 group-hover:bg-slate-700/50">
        <div className="flex items-center justify-center gap-1">
          <button
            className="p-2.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={(e) => {
              e.stopPropagation();
              handleDetail();
            }}
            title="Ver Detalles"
            disabled={isDeleting || mode}
          >
            <i className="bx bx-info-circle text-xl"></i>
          </button>
          <button
            className="p-2.5 rounded-lg text-slate-400 hover:text-green-400 hover:bg-green-500/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={(e) => e.stopPropagation()}
            title="Editar Nombre"
            disabled={isDeleting || mode}
          >
            <i className="bx bx-edit text-xl"></i>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            className="p-2.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Eliminar"
            disabled={isDeleting || mode}
          >
            <i className="bx bx-trash text-xl"></i>
          </button>
        </div>
      </td>
    </tr>
  );
}
