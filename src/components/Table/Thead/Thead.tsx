type TheadProps = {
    children?: React.ReactNode;
}

const Thead: React.FC<TheadProps> = ({ children }) => {
    return (
        <thead className="text-xs text-neutral-700 uppercase bg-neutral-50 dark:bg-neutral-700 dark:text-neutral-400"> {children} </thead>
    )
}

export default Thead;