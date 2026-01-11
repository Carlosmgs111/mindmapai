import { navigate } from "astro:transitions/client";
import { removeText } from "./textsStores";

const execEnv = import.meta.env.PUBLIC_EXEC_ENV;

export const TextIndex = ({
  id,
  sourceId,
  metadata,
}: {
  id: string;
  sourceId?: string;
  metadata?: { author?: string; title?: string; numpages?: number };
}) => {
  const onClickEvent = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };
  const onNavigateSource = (e: React.MouseEvent) => {
    onClickEvent(e);
    navigate(`/knowledge/files?id=${sourceId}`);
  };

  const onDelete = (e: React.MouseEvent) => {
    onClickEvent(e);
    if (execEnv === "browser") {
      import("@/modules/knowledge-base/text-extraction").then(
        ({ textExtractorApiFactory }) => {
          textExtractorApiFactory({
            extractor: "browser-pdf",
            repository: "idb",
          }).then(async (api) => {
            const result = await api.removeText(id);
            if (result) removeText(id);
          });
        }
      );
      return;
    }
    fetch(`/api/texts/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) removeText(id);
    });
  };

  return (
    <a
      href={`/knowledge/texts/${id}`}
      className="p-4 border border-slate-700/50 bg-slate-800/50 rounded text-white min-w-[400px] flex-grow flex flex-col gap-1"
    >
      <h1 className="text-lg font-semibold border-b border-slate-700/50">
        {metadata?.title || "No title"}
      </h1>
      <div className="flex items-center gap-1">
        <button
          onClick={onNavigateSource}
          className="text-[10px] font-thin bg-slate-700/50 px-4 py-2 rounded w-fit flex items-center gap-1 cursor-pointer"
          title="Consultar origen"
        >
          Origen
          <i className="bx bxs-arrow-out-up-left-stroke-square scale-x-[-1]"></i>
        </button>
        <button
          onClick={onDelete}
          className="p-2 rounded-md hover:bg-red-400/50 text-red-500 transition-colors cursor-pointer bx bxs-trash"
          title="Eliminar"
        ></button>
      </div>
      <p className="text-sm font-thin bg-slate-700/50 px-2 py-1 rounded">
        {metadata?.author || "No author"}
      </p>
      <p className="text-sm font-thin bg-slate-700/50 px-2 py-1 rounded">
        {metadata?.numpages || "No pages"}
      </p>
    </a>
  );
};
