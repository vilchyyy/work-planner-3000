import type { TablerIconProps } from "@tabler/icons";
import { useRouter } from "next/router";

type NavElementProps = {
    icon?: React.ReactElement<TablerIconProps>;
    text?: string;
    link?: string;
    className?: string;
    onClick?: () => void;
}

const NavElement: React.FC<NavElementProps> = (props) => {
    const router = useRouter()

    const handleClick = () => {
        if (!props.onClick) {
            router.push(props.link ?? "/").catch((err) => {
                console.log(err)
            });
        } else {
            props.onClick()
        }

    }
        
    return (

            <div onClick={ handleClick } className={`flex gap-4 hover:bg-neutral-700 transition rounded w-full p-3 h-min cursor-pointer ${props.className ?? ""}`}>
                {props.icon}
                <p className="hidden lg:block ">{props.text}</p>
            </div>
    )
}

export default NavElement