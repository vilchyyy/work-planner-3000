import { Role } from "@prisma/client";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { z } from "zod";
import Form from "../../../components/Form/Form";
import Layout from "../../../components/Layout";
import Title from "../../../components/Title";
import { api } from "../../../utils/api";

export const editProjectSchema = z.object({
  name: z.string().min(2).max(20),
  start: z.coerce.date(),
  end: z.coerce.date(),
  members: z.array(z.string()).optional(),
  id: z.string(),
});

const EditProject: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const mutation = api.projects.editOne.useMutation();
  const { data: project } = api.projects.getOne.useQuery({id: router.query.id as string});
  const { data: users } = api.users.getUsers.useQuery();
  const utils = api.useContext();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!project) {
    return (
      <Layout>
        <p>Project not found</p>
      </Layout>
    );
  }

  if (session?.user && session.user?.permissions < 2) {
    return (
      <Layout>
        <p>You lack permissions to see this page</p>
      </Layout>
    );
  }

  if (!session) {
    return (
      <Layout>
        <p>You are not authenticated</p>
      </Layout>
    );
  }

  const handleSubmit = (data: z.infer<typeof editProjectSchema>) => {
    if (!project) {
      console.log("User not found");
      return;
    }
    console.log(data);
    mutation.mutate(data);
    if (mutation.isSuccess) {
      console.log("Success!");
    }
    if (mutation.error) {
      console.log(mutation.error);
    }
  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="m-6 grid">
          <Title>Edit a Project</Title>
          <div className="w-96">
            <Form
              schema={editProjectSchema}
              onSubmit={handleSubmit}
              renderAfter={() => (
                <button className="mt-2 w-full rounded bg-neutral-700 p-2.5 text-white transition hover:scale-105 hover:bg-stone-800">
                  Submit
                </button>
              )}
              defaultValues={{
                name: project.name ?? "",
                start: project.start ?? "",
                end: project.end ?? "",
                members: project.members.map(user => (user.email) ?? ""),
                id: project.id ?? ""
              }}
              props={{
                name: {
                  label: "Name",
                },
                members: {
                  options: users?.map(user => (user.email) ?? "") ?? [],
                },
                id : {
                  className: "hidden"
                }
              }}
            />
            {mutation.isLoading && <p>Submitting</p>}
            {mutation.isSuccess && <p>Success!</p>}
            {mutation.error && <p>{mutation.error.message}</p>}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default EditProject;
