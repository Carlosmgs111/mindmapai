import { useStore } from "@nanostores/react";
import { selectionMode } from "@/features/file-management/stores/selectionMode";

interface SwitchProps {
  id: string;
  label?: string;
  name?: string;
  disabled?: boolean;
}

export default function Switch({ id, label, name, disabled = false }: SwitchProps) {
  const isChecked = useStore(selectionMode);

  const handleToggle = () => {
    if (disabled) return;
    selectionMode.set(!isChecked);
  };

  return (
    <form className="flex items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        data-switch-id={id}
        data-checked={isChecked}
        disabled={disabled}
        onClick={handleToggle}
        className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
          isChecked ? "bg-gray-900" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-2 w-2 transform rounded-full bg-white transition-transform ${
            isChecked ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </button>
      {name && (
        <input
          type="checkbox"
          id={id}
          name={name}
          disabled={disabled}
          checked={isChecked}
          readOnly
          className="sr-only"
        />
      )}
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-200 cursor-pointer select-none"
          onClick={handleToggle}
        >
          {label}
        </label>
      )}
    </form>
  );
}
