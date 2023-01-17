import { createTsForm } from "@ts-react/form";
import { z } from "zod";
import SelectField from "./SelectField";
import TextField from "./TextField";

const mapping = [
    [z.string(), TextField],
    [z.enum(["a"]), SelectField]
    // [z.boolean(), CheckBoxField],
    // [z.number(), NumberField],
  ] as const; 
  
  // A typesafe React component
const Form = createTsForm(mapping);

export default Form;