type NavSegmentProps = {
    children?: React.ReactNode;
}

const NavSegment: React.FC<NavSegmentProps> = ({children}) => {
    return (
        <div className="flex flex-col gap-4">
            {children}
        </div>
    )
}

export default NavSegment