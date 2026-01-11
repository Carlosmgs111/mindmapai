import { useEffect } from "react";
import { TextIndex } from "./TextIndex";
import { textsStore } from "./textsStores";
import { useStore } from "@nanostores/react";

const execEnv = import.meta.env.PUBLIC_EXEC_ENV;

export const TextList = () => {
  const texts = useStore(textsStore);

  useEffect(() => {
    if (execEnv === "browser") {
      import("@/modules/knowledge-base/text-extraction").then(
        async ({ textExtractorApiFactory }) => {
          const api = await textExtractorApiFactory({
            extractor: "browser-pdf",
            repository: "idb",
          });
          api.getAllIndexes().then((texts) => {
            textsStore.set(texts);
          });
        }
      );
      return;
    }
    fetch("/api/texts").then((res) => {
      res.json().then((texts) => {
        textsStore.set(texts);
      });
    });
  }, []);

  return (
    <div className="flex flex-wrap gap-4">
      {texts.map((text) => (
        <TextIndex key={text.id} {...text} />
      ))}
    </div>
  );
};
