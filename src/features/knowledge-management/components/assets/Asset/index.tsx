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
    <div className="flex flex-col gap-8 text-white">
      <div className="flex flex-wrap gap-2 items-center justify-between bg-slate-800/20 p-2 rounded-lg p-4">
        <h1 className="text-lg font-thin uppercase">{asset?.name}</h1>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm">Version: v1</span>
          <button
            className="px-4 py-2 border rounded border-gray-700/50 w-auto h-full cursor-pointer hover:bg-gray-700/50 transition-all flex items-center gap-2"
            onClick={() => setOpenSettingsOverlay(true)}
          >
            <i className="bx bxs-slider "></i> Configuraciones
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-6">
        <div className="w-full bg-slate-800/20 p-4 border rounded-lg border-gray-700/50 flex flex-col">
          <h2 className="font-bold mb-2 border-b border-gray-700/50 w-full">
            Fuentes
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              <button
                className="p-2 border rounded border-gray-700/50 aspect-square w-auto h-full cursor-pointer"
                key="add-file"
                title="Agregar nueva fuente"
                onClick={() => setOpenFilesOverlay(true)}
              >
                <i className="bx bx-plus text-2xl"></i>
              </button>,
              ...asset.files.map((file) => (
                <FileCard key={file.id} {...file} />
              )),
            ]}
          </div>
        </div>
        <div className="w-full bg-slate-800/20 p-4 border rounded-lg border-gray-700/50 flex flex-col">
          <h2 className="font-bold mb-2 border-b border-gray-700/50 w-full">
            Textos extraidos
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              ...asset.texts.map((text) => (
                <TextCard key={text.id} {...text} />
              )),
            ]}
          </div>
        </div>
        {/* <div className="w-full bg-slate-800/20 p-4 border rounded-lg border-gray-700/50 flex flex-col">
          <h2 className="font-bold mb-2">Embeddings Collections</h2>
          {asset?.embeddings.map((embeddings) => (
            <FileCard key={embeddings.id} {...embeddings} />
          ))}
        </div>  */}
      </div>

      <Overlay open={openSettingsOverlay} setOpen={setOpenSettingsOverlay}>
        <div className="flex flex-col gap-2 p-8 border border-gray-600/50 rounded-tl-lg rounded-bl-lg bg-slate-900 h-full">
          <div className="flex flex-wrap gap-2 items-center justify-between bg-slate-600/20 p-2 rounded-lg p-4">
            <h2 className="font-bold mb-2 border-b border-gray-500/50 w-full text-lg">
              Cambiar nombre
            </h2>
            <input
              className="border border-gray-500/50 rounded-sm p-2 flex-1 text-sm outline-none"
              value={asset.name}
              type="text"
            />
            <button className="font-semibold px-4 py-2 border rounded-sm bg-slate-600/30 hover:bg-slate-600/50 text-sm transition-all text-slate-100">
              Actualizar
            </button>
          </div>
          <div className="flex flex-wrap text-lg text-red-500 gap-4 justify-between w-full items-center bg-red-800/20 p-4 rounded-lg">
            <h2 className="font-semibold w-full border-b border-red-500">
              Eliminar este Asset
            </h2>
            <span className="text-sm">Elimina el Asset {asset.name}</span>
            <button
              onClick={onClickEvent}
              className="font-semibold px-4 py-2 border rounded-sm bg-red-600/30 hover:bg-red-600/50 transition-all text-red-600 text-sm"
            >
              Eliminar
            </button>
          </div>
        </div>
      </Overlay>
      <Overlay open={openFilesOverlay} setOpen={setOpenFilesOverlay}>
        <div className="flex flex-col gap-2 p-8 border border-gray-600/50 rounded-tl-lg rounded-bl-lg bg-slate-900 h-full">
          <div className="flex flex-wrap gap-2 items-center justify-between bg-slate-600/20 p-4 rounded-lg">
            <h2 className="font-semibold mb-2 border-b border-gray-500/50 w-full text-lg">
              Subir archivo
            </h2>
            <LoadedFileSelector />
          </div>
        </div>
      </Overlay>
     
    </div>
  );
}
