type ThProps = {
    children?: React.ReactNode;
}

const Th: React.FC<ThProps> = ({ children }) => {
    return (
        <th scope="row" className="px-6 py-4 font-medium text-neutral-900 whitespace-nowrap dark:text-white"> {children} </th>
    )
}

export default Th;