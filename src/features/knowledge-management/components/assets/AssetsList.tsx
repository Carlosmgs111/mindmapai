import { useEffect } from "react";
import type { KnowledgeAssetApi } from "@/modules/knowledge-base/knowledge-asset/@core-contracts/api";
import { AssetIndex } from "./AssetIndex";
import { assetsStore } from "./assetsStores";
import { useStore } from "@nanostores/react";

const execEnv = import.meta.env.PUBLIC_EXEC_ENV;

export const AssetsList = () => {
  const assets = useStore(assetsStore);
  useEffect(() => {
    if (execEnv === "browser") {
      import("@/modules/knowledge-base/knowledge-asset").then(
        async ({ knowledgeAssetApiFactory }) => {
          const knowledgeAssetApi: KnowledgeAssetApi =
            await knowledgeAssetApiFactory({
              repository: "browser",
            });
          knowledgeAssetApi.getAllKnowledgeAssets().then((assets) => {
            assetsStore.set(assets);
          });
        }
      );
      return;
    }
    fetch("/api/knowledge").then((res) => {
      res.json().then((data) => {
        console.log(data);
        assetsStore.set(data);  
      });
    });
  }, []);
  return (
    <div className="flex flex-col gap-2 text-sm text-white">
      {assets.map((asset) => (
        <AssetIndex key={asset.id} {...asset} />
      ))}
    </div>
  );
};
