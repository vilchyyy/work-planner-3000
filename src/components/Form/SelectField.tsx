import { useTsController } from "@ts-react/form";

type SelectFieldProps = {
  className?: string;
  options: string[];
  label?: string;
};

function SelectField({ className, options, label }: SelectFieldProps) {
  const { field, error } = useTsController<string>();
  return (
    <>
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <select
        className={`form-select m-0 block w-full rounded border border-solid border-gray-300 px-3 py-1.5 text-base font-normal
      text-gray-700 transition focus:border-neutral-900 mb-3 ${
        className ?? ""
      }`}
        value={field.value ? field.value : "none"}
        onChange={(e) => {
          field.onChange(e.target.value);
        }}
      >
        {!field.value && <option value="none">Please select...</option>}
        {options.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>
      <span>{error?.errorMessage && error.errorMessage}</span>
    </>
  );
}

export default SelectField;
