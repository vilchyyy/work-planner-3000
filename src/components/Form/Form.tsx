import { createTsForm } from "@ts-react/form";
import { z } from "zod";
import DateField from "./DateField";
import MultiCheckbox from "./MultiCheckbox";
import NumberField from "./NumberField";
import SelectField from "./SelectField";
import TextField from "./TextField";

const mapping = [
    [z.string(), TextField],
    [z.enum(["a"]), SelectField],
    [z.date(), DateField],
    [z.array(z.string()), MultiCheckbox],
    // [z.boolean(), CheckBoxField],
    [z.number(), NumberField],
  ] as const; 
  
  // A typesafe React component
const Form = createTsForm(mapping);

export default Form;