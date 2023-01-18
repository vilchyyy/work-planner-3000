import { useTsController } from "@ts-react/form";

type NumberFieldProps = {
  placeholder?: string;
  className?: string;
  label?: string;
};

function NumberField({ placeholder, className, label }: NumberFieldProps) {
  const { field, error } = useTsController<string>();
  return (
    <>
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <input 
        type="number"
        className={`form-control  mb-2 block w-full rounded border border-solid border-gray-300 px-3 py-1.5 transition ${
          error?.errorMessage ? "border-red-600" : "border-gray-300"
        } ${className ?? ""}`}
        value={field.value ?? 0} // conditional to prevent "uncontrolled to controlled" react warning
        placeholder={placeholder}
        onChange={(e) => {
          field.onChange(e.target.value);
        }}
      />
      {error?.errorMessage && (
        <p className="mb-2 font-semibold text-red-600">{error?.errorMessage}</p>
      )}
    </>
  );
}

export default NumberField;
