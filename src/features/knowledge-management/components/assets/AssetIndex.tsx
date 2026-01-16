import type { KnowledgeAsset } from "@/modules/knowledge-base/knowledge-asset/@core-contracts/entities";
import TimeAgo from "javascript-time-ago";

import es from "javascript-time-ago/locale/es";
TimeAgo.addLocale(es);
const timeAgo = new TimeAgo("es-ES");

export const AssetIndex = ({
  id,
  name,
  filesIds,
  textsIds,
  embeddingsCollectionsIds,
  createdAt,
  updatedAt,
}: KnowledgeAsset) => {
  return (
    <a
      className="flex flex-col gap-4 p-4 rounded-lg aspect-[5/4] w-full h-auto cursor-pointer border border-slate-700/50 bg-slate-800/20 max-w-[400px]"
      href={`/knowledge/${id}`}
    >
      <h2 className="font-semibold text-xl bg-slate-500/20 p-2 rounded-sm uppercase">
        {name}
      </h2>
      <div className="flex gap-2 flex-col">
        <div className="flex bg-slate-500/20 p-2 rounded-sm flex-col">
          <span>Files:</span>
          {filesIds.length > 0 ? filesIds.length : <span>No files</span>}
        </div>
        <div className="flex bg-slate-500/20 p-2 rounded-sm flex-col">
          <span>Texts:</span>
          {textsIds.length > 0 ? textsIds.length : <span>No texts</span>}
        </div>
        <div className="flex bg-slate-500/20 p-2 rounded-sm flex-col">
          <span>Embeddings Collections:</span>
          {embeddingsCollectionsIds.length > 0 ? (
            embeddingsCollectionsIds.length
          ) : (
            <span>No embeddings collections</span>
          )}
        </div>
      </div>
      <div className="flex gap-2 text-xs bg-slate-500/20 p-2 rounded-sm">
        <span className="font-bold">Creado {timeAgo.format(createdAt)}</span>
        <span className="font-bold">
          Actualizado {timeAgo.format(updatedAt)}
        </span>
      </div>
    </a>
  );
};
