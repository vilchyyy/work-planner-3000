import NavElement from "./NavElement/NavElement"
import { IconBrowser, IconUsers, IconUserPlus, IconUserCircle, IconLogout, IconLayoutGrid, IconLayoutGridAdd, IconBeach, IconLogin  } from '@tabler/icons';
import NavSegment from "./NavSegment/NavSegment";
import { signIn, signOut, useSession } from "next-auth/react";

const Navigation: React.FC = () => {
    const { data: sessionData } = useSession();

    const handleLogin = () => {
        void signIn()
    }

    const handleLogout = () => {
        void signOut()
    }

    return (
            <nav className="flex gap-4 justify-between flex-col border-black border h-screen w-min lg:w-60 bg-neutral-800 text-white p-4  ">
                <NavSegment> 
                    <p className="w-full text-center text-xl font-semibold tracking-wider mb-2 mt-2 hidden lg:block">Work planner 3000</p>
                    <p className="w-full text-center text-xl font-semibold tracking-wider mb-2 mt-2 lg:hidden">3000</p>
                    <NavElement link="#" icon={ <IconBrowser/> } text="Dashboard" />
                    <NavElement link="#" icon={ <IconLayoutGrid/> } text="Projects" />
                    <NavElement link="#" icon={ <IconLayoutGridAdd/> } text="Add Project" />
                    <NavElement link="#" icon={ <IconUsers/> } text="Employees" />
                    <NavElement link="#" icon={ <IconUserPlus/> } text="Add Employee" />
                    <NavElement link="#" icon={ <IconBeach/> } text="Manage Days Off" />
                </NavSegment>

                <NavSegment>
                    <NavElement link="#" icon={ <IconUserCircle/> } text="My Account" />

                    {
                        sessionData ? 
                        <NavElement onClick={handleLogout} className="gap-3.5" link="#" icon={ <IconLogout className="ml-0.5" /> } text="Log out" />
                        :
                        <NavElement onClick={handleLogin} className="gap-3.5" link="#" icon={ <IconLogin className="ml-0.5" /> } text="Log in" />
                    }
                             
                </NavSegment>
            </nav>

    )
}

export default Navigation