import "./MobileNav.css";
import { useState, useEffect } from "react";
import { useAnimate, stagger } from "framer-motion";
import CustomLink from "../CustomLink/CustomLink";

export const MenuToggle = ({ toggle,isOpen }) => {

    return (
        <div>
            {
                !isOpen ?
                    <button onClick={toggle} className="">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke={`${isOpen?'#80a10a':"#80a10a"}`} className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>


                    </button>
                    :
                    <button onClick={toggle} className="">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="#80a10a" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>


                    </button>
            }
        </div>
    )
}
    ;

export function Menu ({ toggle }) {
    return (
        <nav className="menuItem bg-[white]  opacity-[97%] w-[100vw]">
            <ul className="ulItem">
                <li onClick={toggle}>
                    <CustomLink class=" md:p-3 md:m-5 hover:text-nav" to='/'>Home</CustomLink>
                </li>

                <li onClick={toggle}>
                    <CustomLink class=" md:p-3 md:m-5 hover:text-nav" to='/stories'>Stories</CustomLink>

                </li>
                <li onClick={toggle}>
                    <CustomLink class=" md:p-3 md:m-5 hover:text-nav" to='/csr'>CSR</CustomLink>

                </li>
                <li onClick={toggle}>
                    <CustomLink class=" md:p-3 md:m-5 hover:text-nav" to='/career'>Career</CustomLink>

                </li>

                <li onClick={toggle}>
                    <CustomLink class="md:p-3 md:m-5 hover:text-nav" to='/about'>About </CustomLink>

                </li>
                
                <li onClick={toggle}>
                    <CustomLink class="md:p-3 md:m-5 hover:text-nav" to='/contact'>Contact </CustomLink>

                </li>
            </ul>
        </nav>
    );
}

const Path = (props) => (
    <path
        fill="transparent"
        strokeWidth="3"
        stroke="var(--background)"
        strokeLinecap="round"
        {...props}
    />
);



function useMenuAnimation(isOpen) {
    const [scope, animate] = useAnimate();

    useEffect(() => {
        const menuAnimations = isOpen
            ? [
                [
                    "nav",
                    { transform: "translateX(0%)" },
                    { ease: [0.08, 0.65, 0.53, 0.96], duration: 0.6 }
                ],
                [
                    "li",
                    { transform: "scale(1)", opacity: 1, filter: "blur(0px)" },
                    { delay: stagger(0.05), at: "-0.1" }
                ]
            ]
            : [
                [
                    "li",
                    { transform: "scale(0.5)", opacity: 0, filter: "blur(10px)" },
                    { delay: stagger(0.05, { from: "last" }), at: "<" }
                ],
                ["nav", { transform: "translateX(-100%)" }, { at: "-0.1" }]
            ];

        animate([
            [
                "path.top",
                { d: isOpen ? "M 3 16.5 L 17 2.5" : "M 2 2.5 L 20 2.5" },
                { at: "<" }
            ],
            ["path.middle", { opacity: isOpen ? 0 : 1 }, { at: "<" }],
            [
                "path.bottom",
                { d: isOpen ? "M 3 2.5 L 17 16.346" : "M 2 16.346 L 20 16.346" },
                { at: "<" }
            ],
            ...menuAnimations
        ]);
    }, [isOpen]);

    return scope;
}

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const scope = useMenuAnimation(isOpen);


    return (
        <div ref={scope} className="">
            <Menu  toggle={() => setIsOpen(!isOpen)}/>
            <MenuToggle toggle={() => setIsOpen(!isOpen)} isOpen={isOpen} />
        </div>
    );
}
