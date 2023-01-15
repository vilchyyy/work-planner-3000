import { createTsForm } from "@ts-react/form";
import { z } from "zod";
import TextField from "./TextField";

const mapping = [
    [z.string(), TextField],
    // [z.boolean(), CheckBoxField],
    // [z.number(), NumberField],
  ] as const; 
  
  // A typesafe React component
const Form = createTsForm(mapping);

export default Form;