type ThProps = {
    children?: React.ReactNode;
}

const Th: React.FC<ThProps> = ({ children }) => {
    return (
        <th scope="col" className="px-6 py-3"> {children} </th>
    )
}

export default Th;