import { FileCard } from "../../files/FileCard";
import { TextCard } from "../../texts/TextCard";
import { useAsset } from "./useAsset";
import { Overlay } from "@/shared/components/Overlay";
import LoadedFileSelector from "@/features/file-management/components/LoadedFileSelector";

export default function Asset({ id }: { id: string }) {
  const {
    asset,
    onClickEvent,
    openSettingsOverlay,
    setOpenSettingsOverlay,
    openFilesOverlay,
    setOpenFilesOverlay,
  } = useAsset(id);

  if (!asset) return null;

  return (
    <div className="flex flex-col gap-6 text-white min-h-screen">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-800/40 via-slate-800/30 to-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
        <div className="relative flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/30">
                <i className="bx bxs-book-library text-2xl text-blue-400"></i>
              </div>
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {asset?.name}
              </h1>
            </div>
            <div className="flex items-center gap-2 ml-1">
              <span className="px-3 py-1 text-xs font-medium bg-slate-700/50 text-slate-300 rounded-full border border-slate-600/50">
                Version: v1
              </span>
              <span className="px-3 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/30">
                <i className="bx bx-check-circle text-sm"></i> Activo
              </span>
            </div>
          </div>
          <button
            className="group relative px-5 py-2.5 bg-slate-700/50 hover:bg-slate-700/70 border border-slate-600/50 hover:border-slate-500/50 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
            onClick={() => setOpenSettingsOverlay(true)}
          >
            <i className="bx bxs-cog text-lg group-hover:rotate-90 transition-transform duration-300"></i>
            <span className="font-medium text-sm">Configuraciones</span>
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sources Section */}
        <div className="group relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-slate-600/50">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <i className="bx bxs-file-detail text-xl text-blue-400"></i>
                </div>
                <h2 className="text-lg font-semibold text-slate-200">
                  Fuentes
                </h2>
              </div>
              <span className="px-2.5 py-1 text-xs font-bold bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/30">
                {asset.files.length}
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                className="group/add relative p-4 border-2 border-dashed border-slate-600/50 hover:border-blue-500/50 rounded-xl aspect-square w-20 h-20 cursor-pointer transition-all duration-200 hover:scale-105 hover:bg-blue-500/5"
                key="add-file"
                title="Agregar nueva fuente"
                onClick={() => setOpenFilesOverlay(true)}
              >
                <i className="bx bx-plus text-3xl text-slate-400 group-hover/add:text-blue-400 transition-colors"></i>
              </button>
              {asset.files.map((file) => (
                <FileCard key={file.id} {...file} />
              ))}
            </div>
            {asset.files.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="p-4 bg-slate-700/30 rounded-full mb-3">
                  <i className="bx bx-folder-open text-4xl text-slate-500"></i>
                </div>
                <p className="text-slate-400 text-sm">
                  No hay fuentes agregadas
                </p>
                <p className="text-slate-500 text-xs mt-1">
                  Haz clic en el botón + para agregar archivos
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Extracted Texts Section */}
        <div className="group relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-slate-600/50">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/30">
                  <i className="bx bxs-article text-xl text-purple-400"></i>
                </div>
                <h2 className="text-lg font-semibold text-slate-200">
                  Textos extraídos
                </h2>
              </div>
              <span className="px-2.5 py-1 text-xs font-bold bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/30">
                {asset.texts.length}
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {asset.texts.map((text) => (
                <TextCard key={text.id} {...text} />
              ))}
            </div>
            {asset.texts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="p-4 bg-slate-700/30 rounded-full mb-3">
                  <i className="bx bx-file-blank text-4xl text-slate-500"></i>
                </div>
                <p className="text-slate-400 text-sm">
                  No hay textos extraídos
                </p>
                <p className="text-slate-500 text-xs mt-1">
                  Los textos aparecerán después de procesar las fuentes
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Settings Overlay */}
      <Overlay open={openSettingsOverlay} setOpen={setOpenSettingsOverlay}>
        <div className="flex flex-col gap-6 p-8 border border-slate-700/50 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 h-full text-slate-100 shadow-2xl">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-700/50">
            <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/30">
              <i className="bx bxs-cog text-2xl text-blue-400"></i>
            </div>
            <h2 className="text-2xl font-bold text-slate-100">
              Configuraciones
            </h2>
          </div>

          {/* Rename Section */}
          <div className="flex flex-col gap-4 bg-slate-800/40 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50">
            <div className="flex items-center gap-2 mb-2">
              <i className="bx bx-edit text-lg text-blue-400"></i>
              <h3 className="font-semibold text-lg text-slate-200">
                Cambiar nombre
              </h3>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <input
                className="flex-1 min-w-[200px] border border-slate-600/50 bg-slate-800/50 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                value={asset.name}
                type="text"
                placeholder="Nombre del asset"
              />
              <button className="group relative px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
                <span className="flex items-center gap-2">
                  <i className="bx bx-check text-lg"></i>
                  Actualizar
                </span>
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="flex flex-col gap-4 bg-gradient-to-br from-red-950/40 to-red-900/20 backdrop-blur-sm p-6 rounded-xl border border-red-800/50">
            <div className="flex items-center gap-2 mb-2">
              <i className="bx bx-error text-lg text-red-400"></i>
              <h3 className="font-semibold text-lg text-red-400">
                Zona de peligro
              </h3>
            </div>
            <div className="flex flex-wrap gap-4 justify-between items-center">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-red-300">
                  Eliminar este Asset
                </p>
                <p className="text-xs text-slate-400">
                  Esta acción eliminará permanentemente{" "}
                  <span className="font-semibold text-slate-300">
                    {asset.name}
                  </span>
                </p>
              </div>
              <button
                onClick={onClickEvent}
                className="group relative px-5 py-2.5 bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 hover:border-red-500 rounded-lg transition-all duration-200 text-red-400 hover:text-red-300 text-sm font-medium shadow-lg hover:shadow-red-500/20 hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  <i className="bx bx-trash text-lg"></i>
                  Eliminar
                </span>
              </button>
            </div>
          </div>
        </div>
      </Overlay>

      {/* Files Upload Overlay */}
      <Overlay open={openFilesOverlay} setOpen={setOpenFilesOverlay}>
        <div className="flex flex-col gap-6 p-8 border border-slate-700/50 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 h-full text-slate-100 shadow-2xl">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-700/50">
            <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/30">
              <i className="bx bxs-folder-up-arrow text-2xl text-blue-400"></i>
            </div>
            <h2 className="text-2xl font-bold text-slate-100">Subir archivo</h2>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 w-[600px]">
            <LoadedFileSelector />
          </div>
        </div>
      </Overlay>
    </div>
  );
}
