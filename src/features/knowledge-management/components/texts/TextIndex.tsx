export const TextIndex = ({
  id,
  sourceId,
  metadata,
}: {
  id: string;
  sourceId?: string;
  metadata?: { author?: string; title?: string; numpages?: number };
}) => {
    console.log({id, sourceId, metadata});
  return (
    <div className="p-4 border border-gray-200 rounded text-white">
      <h1>{id}</h1>
      <p>{sourceId}</p>
      <p>{metadata?.author}</p>
      <p>{metadata?.title}</p>
      <p>{metadata?.numpages}</p>
    </div>
  );
};
