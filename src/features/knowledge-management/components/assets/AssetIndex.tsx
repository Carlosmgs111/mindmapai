import { removeAsset } from "./assetsStores";

const execEnv = import.meta.env.PUBLIC_EXEC_ENV;

export const AssetIndex = ({
  id,
  sourcesIds,
  cleanedTextIds,
  embeddingsIds,
}: {
  id: string;
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
          repository: "browser",
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
      <p className="font-bold">ID: {id}</p>
      <p className="font-bold">Source IDs: {sourcesIds}</p>
      <p className="font-bold"> Cleaned Text IDs: {cleanedTextIds}</p>
      <p className="font-bold">Embeddings IDs: {embeddingsIds}</p>
      <button onClick={onClickEvent} className="font-bold">Eliminar</button>
    </div>
  );
};
