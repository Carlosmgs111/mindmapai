import { useEffect, useState } from "react";
import { AssetIndex } from "./AssetIndex";
import { assetsStore } from "../../stores/assetsStores";
import { useStore } from "@nanostores/react";
import { Overlay } from "@/shared/components/Overlay";
import { KnowledgeGenerator } from "../KnowledgeGenerator";
const execEnv = import.meta.env.PUBLIC_EXEC_ENV;

export const AssetsIndexesList = () => {
  const assets = useStore(assetsStore);
  const [openGenerator, setOpenGenerator] = useState(false);
  const [openGeneratorSettings, setOpenGeneratorSettings] = useState(false);
  useEffect(() => {
    if (execEnv === "browser") {
      import("@/features/knowledge-management/lib/clientKnowledgeBaseApi").then(
        async ({ clientKnowledgeBaseApiFactory }) => {
          const knowledgeAssetApi = await clientKnowledgeBaseApiFactory();
          knowledgeAssetApi.getAllKnowledgeAssets().then((assets) => {
            assetsStore.set(assets);
          });
        }
      );
      return;
    }
    fetch("/api/knowledge").then((res) => {
      res.json().then((data) => {
        assetsStore.set(data);
      });
    });
  }, []);
  return (
    <>
      <div className="flex flex-wrap gap-2 text-sm text-white">
        {[
          <button
            className="flex text-xl items-center justify-center gap-2 aspect-square w-auto h-full cursor-pointer bg-slate-800/50 border border-slate-700/50 rounded-lg"
            onClick={() => setOpenGenerator(true)}
          >
            <i className="bx bxs-plus"></i>
            <span>Agregar nuevo asset</span>
          </button>,
          ...assets.map((asset) => <AssetIndex key={asset.id} {...asset} />),
        ]}
      </div>
      <Overlay open={openGenerator} setOpen={setOpenGenerator}>
        <div className="flex flex-col gap-2 p-8 border border-gray-600/50 rounded-tl-lg rounded-bl-lg bg-slate-900 h-full">
          <KnowledgeGenerator />
        </div>
      </Overlay>
    </>
  );
};
