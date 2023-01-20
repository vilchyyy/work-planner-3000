import { useTsController } from "@ts-react/form";

export default function MultiCheckbox({ options }: { options: string[] }) {
    const {
      field: { onChange, value },
    } = useTsController<string[]>();
  
    function toggleField(option: string) {
      if (!value) onChange([option]);
      else {
        onChange(
          value.includes(option)
            ? value.filter((e) => e !== option)
            : [...value, option]
        );
      }
    }
  
    return (
      <>
        {options.map((optionValue) => (
        <div className="flex justify-between" key={optionValue}>    
          <label
            htmlFor={optionValue}
          >{optionValue}</label>
            
            <input
              name={optionValue}
              type="checkbox"
              onChange={() => toggleField(optionValue)}
              checked={value?.includes(optionValue) ? true : false}
            />

          </div>
        ))}
      </>
    );
  }