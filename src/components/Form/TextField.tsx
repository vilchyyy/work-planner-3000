import { useTsController } from "@ts-react/form";

type TextFieldProps = {
  placeholder?: string;
  className?: string;
};

function TextField({ placeholder, className }: TextFieldProps) {
  const { field, error } = useTsController<string>();
  return (
    <>
      <input
        className={`form-control  mb-2 block w-full rounded border border-solid border-gray-300 px-3 py-1.5 transition ${
          error?.errorMessage ? "border-red-600" : "border-gray-300"
        } ${className ?? ""}`}
        value={field.value ?? ""} // conditional to prevent "uncontrolled to controlled" react warning
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

export default TextField;
