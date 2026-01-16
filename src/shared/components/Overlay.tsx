import { sc } from "@/shared/utils/sc";

export const Overlay = ({
  children,
  open,
  setOpen,
}: {
  children?: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {

const id = "overlay:" + crypto.randomUUID();
  const onClickEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    e.stopPropagation();
    e.preventDefault();
    setOpen(false);
  };

  return (
    <div
      id={id}
      onClick={onClickEvent}
      className={sc(
        "fixed inset-0 bg-slate-800/30 transition-opacity duration-300 flex justify-end backdrop-blur-xs",
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
    >
      <div
        className={sc(
          "transition-transform duration-300 ease-in-out overflow-visible max-w-1/2 w-fit h-full",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {children}
      </div>
    </div>
  );
};
