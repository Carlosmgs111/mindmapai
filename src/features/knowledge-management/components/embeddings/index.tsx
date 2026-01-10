import { useEffect, useState } from "react";

const execEnv = import.meta.env.PUBLIC_EXEC_ENV;

export const EmbeddingsList = () => {
  const [embeddings, setEmbeddings] = useState<any[]>([]);
  useEffect(() => {
    if (execEnv === "browser") {
      import("@/modules/embeddings").then(async ({ embeddingApiFactory }) => {
        const api = await embeddingApiFactory({
          provider: "browser",
          repository: "browser",
        });
        api.getAllDocuments().then((documents) => {
          setEmbeddings(documents);
        });
      });
      return;
    }
    fetch("/api/embeddings").then((res) => {
      res.json().then((data) => {
        setEmbeddings(data);
      });
    });
  }, []);
  return (
    <div>
      <h1>Embeddings</h1>
      <ul className="list-disc text-white">
        {embeddings.map((embedding) => (
          <li key={embedding.id}>
            {embedding.id} - {embedding.metadata.sourceId}
          </li>
        ))}
      </ul>
    </div>
  );
};
