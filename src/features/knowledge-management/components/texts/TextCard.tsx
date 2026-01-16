
import type { Text } from "@/modules/knowledge-base/text-extraction/@core-contracts/entities";

export const TextCard = ({ id, description }: Text) => {
  return (
    <div className="flex flex-col gap-1 w-fit p-4 border rounded border-gray-700/50 bg-gray-800">
      <p className="uppercase text-xs">{id}</p>
      <p className="text-xs overflow-hidden">{description}</p>
    </div>
  );
};