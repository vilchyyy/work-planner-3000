import type { NextPage } from "next";
import { signIn } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { z } from "zod";
import Form from "../components/Form/Form";
import { api } from "../utils/api";

export const configurationValidationSchema = z.object({
  name: z.string().min(2).max(20) ,
  email: z.string().email().max(30),
});

const Configure: NextPage = () => {
  const mutation = api.users.createSuperUser.useMutation();
  const [message, setMessage] = useState<string | undefined>(undefined);
  const handleClick = ( data: z.infer<typeof configurationValidationSchema> ) => {
    mutation.mutate(data);
    if (mutation.isSuccess) {
      setMessage("Success!");
    }
  };
  

  useEffect(() => {
    if (mutation.error) setMessage(mutation.error?.message);
    else if (mutation.isSuccess) 
      signIn("email", { email: mutation.data?.email, callbackUrl: "/" }).catch((err: string) => {
        setMessage(err);
      });
  }, [mutation.error, mutation.isSuccess, mutation.data]);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-full h-screen justify-center" >
        <div className="flex flex-col items-center gap-4 ">
          <h1 className="text-2xl font-semibold " >Please provide your data to create a superuser account</h1>
          <Form
            schema={configurationValidationSchema}
            onSubmit={handleClick}
            renderAfter={() => <button className="w-80 bg-neutral-700 p-2.5 rounded text-white hover:bg-stone-800 hover:scale-105 transition" >Submit</button>}
            props={{
              name: {
                placeholder: "Name",
                className: "w-80",
              },
              email: {
                placeholder: "Email",
                className: "w-80",
              },
            }}
          />
          {message && <p>{message}</p>}
        </div>
      </div>
    </>
  );
};

export default Configure;
