type TdProps = {
    children?: React.ReactNode;
}

const Th: React.FC<TdProps> = ({ children }) => {
    return (
        <td className="px-6 py-4"> {children} </td>
    )
}

export default Th;