import { useStore } from "@nanostores/react";
import { selectionMode } from "../stores/selectionMode";
import { fileStore, setStagedFiles } from "../stores/files";
import Switch from "@/shared/components/Switch";
import { navigate } from "astro:transitions/client";

export default function LibraryFileSelector() {
  const mode = useStore(selectionMode);
  const files = useStore(fileStore);
  const selectedFileId = files.stagedIndexes[0];
  const hasSelectedFile = Boolean(selectedFileId);

  console.log({ mode });

  const handleContinue = () => {
    if (!selectedFileId) return;
    const file = files.files[selectedFileId];
    if (!file) return;
    navigate(
      `/dashboard/generator?fileId=${selectedFileId}&fileName=${file.name}`
    );
  };

  return (
    <div
      id="mode-select-container"
      data-mode={mode ? "select" : ""}
      className={`transition-all duration-300 ${
        mode
          ? "sticky top-0 z-20 bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-slate-700/50"
          : "border-b border-slate-700/30"
      }`}
    >
      <div className="px-6 py-4">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="flex-1 flex items-center gap-3">
            <div className={`p-2 rounded-lg transition-colors ${
              mode ? "bg-blue-500/20" : "bg-slate-700/30"
            }`}>
              <i className={`bx text-xl transition-colors ${
                mode ? "bxs-check-square text-blue-400" : "bx-checkbox text-slate-400"
              }`}></i>
            </div>
            <div className="flex-1">
              <Switch id="mode-select" label="Modo Selección" />
              {mode && (
                <p className="text-xs text-slate-400 mt-1 animate-fade-in">
                  Selecciona un archivo de la biblioteca
                </p>
              )}
            </div>
          </div>
          <button
            id="mode-select:add-file"
            onClick={handleContinue}
            disabled={!hasSelectedFile}
            className={`
              flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm whitespace-nowrap
              transition-all duration-300 transform
              ${
                mode && hasSelectedFile
                  ? "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white shadow-lg hover:shadow-green-500/30 hover:scale-105"
                  : mode && !hasSelectedFile
                  ? "bg-slate-700/30 text-slate-500 cursor-not-allowed"
                  : "opacity-0 pointer-events-none scale-95"
              }
            `}
          >
            <i className="bx bx-right-arrow-circle text-xl"></i>
            Continuar con este archivo
          </button>
        </div>
      </div>
      {mode && (
        <div className="px-6 pb-4 animate-fade-in">
          <div className="flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-xs text-blue-300">
            <i className="bx bx-info-circle text-lg flex-shrink-0 mt-0.5"></i>
            <p>
              Haz clic en cualquier archivo de la tabla para seleccionarlo y generar un mapa mental a partir de su contenido
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
