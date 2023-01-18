type TableProps = {
    children?: React.ReactNode;
}

const Table: React.FC<TableProps> = ({ children }) => {
    return (
        <table className="w-full text-sm text-left text-neutral-500 dark:text-neutral-400"> {children} </table>
    )
}

export default Table;