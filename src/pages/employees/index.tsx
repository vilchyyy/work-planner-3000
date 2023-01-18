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

const Employees: NextPage = () => {

    const { data: session, status } = useSession();
    const router = useRouter();
    const { data: users } = api.users.getUsers.useQuery()

    const handleEdit = async (id: string) => {
      await router.push(`/employees/edit/${id}`)
    }
    if (status === "loading") {
        return <div>Loading...</div>
    }

    if (status === "unauthenticated") {
        return (
          <Layout>
            <p>You need to be authenticated to see this page</p>
          </Layout>
        )
    }

    


    return (
      <>
        <Head>
          <title>Create T3 App</title>
          <meta name="description" content="Generated by create-t3-app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
            <Table>
                <Thead>
                  <tr>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Role</Th>
                    <Th>Actions</Th>
                  </tr>
                </Thead>
                <Tbody>
                  {users?.map((user) => (
                    <Tr key={user.id}>
                      <Bth>{user.name}</Bth>
                      <Td>{user.email}</Td>
                      <Td>{user.role}</Td>
                      <Td>
                        { session?.user?.permissions && session.user?.permissions > user.permissions && <button className="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                         onClick={() => {
                            void handleEdit(user.id)
                         }} >
                          Edit
                        </button>}
                        { session?.user?.permissions && session.user?.permissions > user.permissions && <button className="px-4 py-2 ml-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-red">
                          Delete
                        </button>}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
            </Table>
        </Layout>
            
        
      </>
    );
  };
  
  export default Employees;
  