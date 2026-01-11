import { removeAsset } from "./assetsStores";

const execEnv = import.meta.env.PUBLIC_EXEC_ENV;

export const AssetIndex = ({
  id,
  name,
  sourcesIds,
  cleanedTextIds,
  embeddingsIds,
}: {
  id: string;
  name: string;
  sourcesIds: string[];
  cleanedTextIds: string[];
  embeddingsIds: string[];
}) => {
  const onClickEvent = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if(execEnv === "browser") {
      import("@/modules/knowledge-base/knowledge-asset").then(({ knowledgeAssetApiFactory }) => {
        knowledgeAssetApiFactory({
          repository: "idb",
          aiProvider: "web-llm",
        }).then(async (api) => {
          const result = await api.deleteKnowledgeAsset(id);
          if (result) removeAsset(id);
        });
      });
      return;
    }
    fetch(`/api/knowledge/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) removeAsset(id);
    });
  };
  return (
    <div className="flex flex-col gap-1">
      <h2 className="font-bold text-xl">{name}</h2>
      <p className="font-thin">Source IDs: {sourcesIds.join(", ")}</p>
      <p className="font-thin"> Cleaned Text IDs: {cleanedTextIds.join(", ")}</p>
      <p className="font-thin">Embeddings IDs: {embeddingsIds.join(", ")}</p>
      <button onClick={onClickEvent} className="font-bold">Eliminar</button>
    </div>
  );
};
