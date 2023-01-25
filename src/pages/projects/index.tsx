import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Layout from "../../components/Layout";
import Table from "../../components/Table/Table";
import Tbody from "../../components/Table/Tbody/Tbody";
import Tr from "../../components/Table/Tbody/Tr/Tr";
import Th from "../../components/Table/Thead/Th";
import Bth from "../../components/Table/Tbody/Tr/Th";
import Thead from "../../components/Table/Thead/Thead";
import { api } from "../../utils/api";
import Td from "../../components/Table/Tbody/Tr/Td";
import { useRouter } from "next/router";
import { useState } from "react";
import Modal from "../../components/Modal";

const Projects: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { data: projects } = api.projects.getAll.useQuery();
  const [modal, setModal] = useState<boolean>(false);
  const [modalAction, setModalAction] = useState<() => void>();
  const mutation = api.projects.deleteOne.useMutation();  
  const utlis = api.useContext();

  const handleEdit = async (id: string) => {
    await router.push(`/projects/edit/${id}`);
  };
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return (
      <Layout>
        <p>You need to be authenticated to see this page</p>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>Work Planner 3000</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Table>
          <Thead>
            <tr>
              <Th>Name</Th>
              <Th>Start Date</Th>
              <Th>End Date</Th>
              <Th>Actions</Th>
            </tr>
          </Thead>
          <Tbody>
            {projects?.map((project) => (
              <Tr key={project.id}>
                <Bth>{project.name}</Bth>
                <Td>{project.start.toLocaleDateString()}</Td>
                <Td>{project.end.toLocaleDateString()}</Td>
                <Td>
                  {session?.user?.permissions &&
                    session.user?.permissions >= 2 && (
                      <button
                        className="focus:shadow-outline-blue rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 hover:bg-blue-700 focus:outline-none active:bg-blue-600"
                        onClick={() => {
                          void handleEdit(project.id);
                        }}
                      >
                        Edit
                      </button>
                    )}
                  {session?.user?.permissions &&
                    session.user?.permissions >= 2 && (
                      <button
                        className="focus:shadow-outline-red ml-2 rounded-lg border border-transparent bg-red-600 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 hover:bg-red-700 focus:outline-none active:bg-red-600"
                        onClick={() => {
                          setModal((prevModal) => !prevModal);
                          setModalAction(() =>  () => {
                            mutation.mutate({ id: project.id },{
                              onSuccess: () => {
                                void utlis.projects.getAll.invalidate();
                              }
                            });
                            setModal((prevModal) => !prevModal);
                          });
                        }}
                      >
                        Delete
                      </button>
                    )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {modal && (
          <Modal
            title="Are you sure?"
            action={modalAction}
            hide={() => setModal((prevModal) => !prevModal)}
          >
            Deleting projects is not reversable
            {/* {mutation.error && (
              <p className="text-red-700">{mutation.error?.message}</p>
            )}
            {mutation.isLoading && <p>Loading...</p>} */}
          </Modal>
        )}
      </Layout>
    </>
  );
};

export default Projects;
