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
      className="group relative flex flex-col p-5 rounded-xl w-full cursor-pointer
                 border border-slate-700/70 bg-slate-800/60
                 transition-all duration-300 ease-out
                 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1
                 overflow-hidden min-h-[280px]"
      href={`/knowledge/assets/${id}`}
    >
      {/* Gradient overlay on hover */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0
                      group-hover:from-blue-500/10 group-hover:to-cyan-500/10
                      transition-all duration-300"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-3 h-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-700/50">
          <h2 className="font-bold text-lg text-white uppercase tracking-wide line-clamp-2 text-ellipsis overflow-hidden" title={name}>
            {name}
          </h2>
          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg
                          bg-slate-700/50 border border-slate-600/50">
            <i className="bx bxs-folder text-lg text-blue-400"></i>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 flex-1 py-2">
          <div
            className="flex flex-col items-center justify-center p-3 rounded-lg
                          bg-slate-700/40 border border-slate-600/40
                          group-hover:bg-slate-700/60 group-hover:border-slate-500/60
                          transition-all duration-300"
          >
            <i className="bx bxs-file text-2xl text-blue-400 mb-1"></i>
            <span className="text-2xl font-bold text-white">
              {filesIds.length}
            </span>
            <span className="text-xs text-slate-400 font-medium">Files</span>
          </div>

          <div
            className="flex flex-col items-center justify-center p-3 rounded-lg
                          bg-slate-700/40 border border-slate-600/40
                          group-hover:bg-slate-700/60 group-hover:border-slate-500/60
                          transition-all duration-300"
          >
            <i className="bx bxs-article text-2xl text-cyan-400 mb-1"></i>
            <span className="text-2xl font-bold text-white">
              {textsIds.length}
            </span>
            <span className="text-xs text-slate-400 font-medium">Texts</span>
          </div>

          <div
            className="flex flex-col items-center justify-center p-3 rounded-lg
                          bg-slate-700/40 border border-slate-600/40
                          group-hover:bg-slate-700/60 group-hover:border-slate-500/60
                          transition-all duration-300"
          >
            <i className="bx bx-database text-2xl text-purple-400 mb-1"></i>
            <span className="text-2xl font-bold text-white">
              {embeddingsCollectionsIds.length}
            </span>
            <span className="text-xs text-slate-400 font-medium">Vectors</span>
          </div>
        </div>

        {/* Footer with timestamps */}
        <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-700/50 mt-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <i className="bx bx-time-five text-sm"></i>
            <span>Creado {timeAgo.format(createdAt)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <i className="bx bx-refresh text-sm"></i>
            <span>Actualizado {timeAgo.format(updatedAt)}</span>
          </div>
        </div>
      </div>

      {/* Hover indicator */}
      <div
        className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100
                      transition-opacity duration-300"
      >
        <i className="bx bx-right-arrow-circle text-xl text-blue-400"></i>
      </div>
    </a>
  );
};
