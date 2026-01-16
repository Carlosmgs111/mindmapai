import type { File } from "@/modules/files/@core-contracts/entities";
import TimeAgo from "javascript-time-ago";

import es from "javascript-time-ago/locale/es";
TimeAgo.addLocale(es);
const timeAgo = new TimeAgo("es-ES");

export const FileCard = ({ id, name, type, size, lastModified }: File) => {
  return (
    <div className="flex flex-col gap-1 w-fit p-4 border rounded border-gray-700/50 bg-gray-800">
      <h1 className="font-semibold uppercase text-md">{name.split(".")[0]}</h1>
      <p className="uppercase text-xs">{type.split("/")[1]}</p>
      <p className="text-xs">
        {new Intl.NumberFormat("es-ES", {
          style: "unit",
          unit: "kilobyte",
        }).format(Math.round(size / 1024))}
      </p>
      <p className="text-xs">Subido {timeAgo.format(lastModified)}</p>
      <div className="flex gap-1">
        <button className="h-fit rounded-lg bx bx-file-detail text-gray-500 p-2 hover:bg-gray-500/50 transition-all" />
        <button className="h-fit rounded-lg bx bx-edit text-gray-500 p-2 hover:bg-gray-500/50 transition-all" />
        <button className="h-fit rounded-lg bx bx-trash text-gray-500 p-2 hover:bg-gray-500/50 transition-all" />
      </div>
    </div>
  );
};
