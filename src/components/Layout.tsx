import Navigation from "./Navigation/Navigation";

type LayoutProps = {
    children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
    <div className="flex">
        <Navigation/>
        <main className="w-full h-full " > {children} </main>
    </div>
    )
}

export default Layout;