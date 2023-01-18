type TitleProps = {
    children?: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ children }) => {
    return (
        <h1 className="text-4xl mb-6"> {children} </h1>
    )
}

export default Title;