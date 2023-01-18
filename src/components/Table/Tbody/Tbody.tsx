type TbodyProps = {
    children?: React.ReactNode;
}

const Tbody: React.FC<TbodyProps> = ({ children }) => {
    return (
        <tbody> {children} </tbody>
    )
}

export default Tbody;