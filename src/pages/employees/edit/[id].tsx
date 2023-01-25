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

export const editEmployeeSchema = z.object({
  name: z.string().min(2).max(20),
  email: z.string().email().max(30),
  role: z.enum([Role.ADMIN, Role.USER, Role.SUPER]),
  permissions: z.number().min(0).max(3).optional(),
  id: z.string().cuid(),
});

const EditEmployee: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log(session, status);
  const mutation = api.users.editUser.useMutation();
  const { data: user } = api.users.getUser.useQuery({
    id: router.query.id as string,
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <Layout>
        <p>Employee not found</p>
      </Layout>
    );
  }

  if (session?.user && session.user?.permissions < user?.permissions) {
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

  const handleSubmit = (data: z.infer<typeof editEmployeeSchema>) => {
    if (!user) {
      console.log("User not found");
      return;
    }
    console.log(data);
    mutation.mutate({ ...data, id: user.id });
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
        <title>Work Planner 3000</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="m-6 grid">
          <Title>Edit an employee</Title>
          <div className="w-96">
            <Form
              schema={editEmployeeSchema}
              onSubmit={handleSubmit}
              renderAfter={() => (
                <button className="mt-2 w-full rounded bg-neutral-700 p-2.5 text-white transition hover:scale-105 hover:bg-stone-800">
                  Submit
                </button>
              )}
              defaultValues={{
                name: user.name ?? "",
                email: user.email ?? "",
                role: user.role ?? "USER",
                permissions: user.permissions,
                id: user.id,
              }}
              props={{
                name: {
                  placeholder: "ex: John Smith",
                  label: "Name",
                },
                email: {
                  placeholder: "ex: jsmith@company.com",
                  label: "Email",
                },
                role: {
                  options: [Role.ADMIN, Role.USER],
                  label: "Role",
                },
                permissions: {
                  className: "hidden",
                },
                id: {
                  className: "hidden",
                },
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

export default EditEmployee;
