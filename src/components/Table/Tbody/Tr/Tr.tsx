type TrProps = {
    children?: React.ReactNode;
}

const Tr: React.FC<TrProps> = ({ children }) => {
    return (
        <tr className="bg-white border-b dark:bg-neutral-900 dark:border-neutral-700"> {children} </tr>
    )
}

export default Tr;