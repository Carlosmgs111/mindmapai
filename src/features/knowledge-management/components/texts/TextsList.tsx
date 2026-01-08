import { useEffect, useState } from "react";
import { TextIndex } from "./TextIndex";
import type { TextIndexDTO } from "@/modules/text-extraction/@core-contracts/dtos";

const execEnv = import.meta.env.PUBLIC_EXEC_ENV;

export const TextList = () => {
  const [texts, setTexts] = useState<TextIndexDTO[]>([]);

  console.log(execEnv);

  useEffect(() => {
    if (execEnv === "browser") {
      import("@/modules/text-extraction").then(
        async ({ textExtractorApiFactory }) => {
          const api = await textExtractorApiFactory({
            extractor: "browser-pdf",
            repository: "browser",
          });
         api.getAllIndexes().then((texts) => {
           console.log({texts});
           setTexts(texts);
         });
        }
      );
    }
    // const fetchTexts = async () => {
    //   const response = await fetch("/api/texts");
    //   const data = await response.json();
    //   setTexts(data);
    // };
    // fetchTexts();
  }, []);

  return (
    <div>
      <h1>Texts</h1>
      {texts.map((text) => (
        <TextIndex key={text.id} {...text} />
      ))}
    </div>
  );
};
