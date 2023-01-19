type ModalProps = {
    children?: React.ReactNode;
    title: string;
    action?: () => void;
    hide?: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, title, action, hide }) => {
    return (
            <div className="fixed p-5 rounded-lg flex flex-col gap-5 w-96 bg-neutral-700 text-white z-10 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 " aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <h1 className="text-2xl " > {title} </h1>
                <p> {children}  </p>
                <div className="text-2xl flex gap-2 justify-end " >
                    <button onClick={action} className="bg-green-700 p-2.5 px-5 rounded hover:bg-green-800 text-white transition" >Yes</button>
                    <button onClick={hide} className="bg-red-700 p-2.5 px-5 rounded hover:bg-red-800 text-white transition" >No</button>
                </div>
            </div>  
    )
}

export default Modal;