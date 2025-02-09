import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import barsIcon from "../assets/icons/bars-solid.svg";
import chevronDownWhite from "../assets/icons/chevron-down-white.svg";
import chevronDown from "../assets/icons/chevron-down.svg";
import fbIcon from "../assets/icons/fbIcon.svg";
import igIcon from "../assets/icons/igIcon.svg";
import phoneIcon from "../assets/icons/phone.svg";
import searchIcon from "../assets/icons/search.svg";
import letterIcon from "../assets/icons/sobre.svg";
import userIcon from "../assets/icons/user-icon.svg";
import xmark from "../assets/icons/xmark-solid.svg";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";
import SearchCard from "./SearchCard";

export default function Navbar() {
    const [tinyMenu, setTinyMenu] = useState(false);
    const [userMenu, setUserMenu] = useState(false);
    const [userLoged, setUserLoged] = useState(false);
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [search, setSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const searchBarRef = useRef(null);
    const tinyMenuRef = useRef(null);
    const loginRef = useRef(null);

    const { setLinkInfo, categoryInfo, logos } = useStateContext();

    function removeAccents(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                searchBarRef.current &&
                !searchBarRef.current.contains(event.target)
            ) {
                setSearch(false); // Cierra el contenedor si se hace clic fuera
            }
            if (
                // Cierra el menú si se hace clic fuera
                tinyMenuRef.current &&
                !tinyMenuRef.current.contains(event.target)
            ) {
                setTinyMenu(false);
            }
            if (
                // Cierra el menú si se hace clic fuera
                loginRef.current &&
                !loginRef.current.contains(event.target)
            ) {
                setUserMenu(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const { setUserToken, userToken, userInfo, contactInfo, productInfo } =
        useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();
        axiosClient
            .post("/login", {
                name: user,
                password: password,
            })
            .then(({ data }) => {
                setUserToken(data.token);
            });
    };

    const toggleDropdown = (id) => {
        setDropdowns((prevDropdowns) =>
            prevDropdowns.map((drop) =>
                drop.id === id ? { ...drop, open: !drop.open } : drop
            )
        );
    };

    const toggleChevronAnimation = (id) => {
        setDropdowns((prevDropdowns) =>
            prevDropdowns.map((drop) =>
                drop.id === id
                    ? { ...drop, chevronAnimation: !drop.chevronAnimation }
                    : drop
            )
        );
    };

    const socials = [
        { logo: fbIcon, href: contactInfo?.fb },
        { logo: igIcon, href: contactInfo?.ig },
    ];

    const [dropdowns, setDropdowns] = useState([{}]);

    useEffect(() => {
        setDropdowns([
            ...categoryInfo.map((category) => ({
                id: category.name,
                open: false,
                href: `/inicio/${removeAccents(
                    category.name.toLowerCase().split(" ").join("-")
                )}`,
                chevron: true,
                chevronAnimation: false,
                order_value: category.order_value,
                subHref: category.subcategories.map((subcategory) => ({
                    title: subcategory.name,
                    href: `/inicio/${category.name.toLowerCase()}/${subcategory.name.toLowerCase()}`,
                })),
            })),
        ]);
    }, [categoryInfo]);

    return (
        <div className="sticky top-0 z-50 flex flex-col items-center justify-center font-roboto-condensed">
            <div className="bg-primary-blue h-[40px] w-full flex items-center justify-between pl-20 pr-4 max-sm:pl-0 max-sm:justify-end">
                <div className="flex gap-4 items-center text-[14px] text-white h-[16px] max-sm:hidden">
                    <div className="flex gap-2 items-center">
                        <img className="h-[16px]" src={letterIcon} alt="" />
                        <p>{contactInfo?.mail}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <img className="h-[16px]" src={phoneIcon} alt="" />
                        <p>{contactInfo?.phone}</p>
                    </div>
                </div>
                <div className="flex fle-row gap-4 h-full items-center">
                    <div
                        ref={searchBarRef}
                        className="relative flex flex-row items-center gap-3"
                    >
                        <AnimatePresence>
                            <div
                                className={`flex flex-row items-center gap-2 rounded-md ${
                                    search ? "border px-2" : ""
                                }`}
                            >
                                <motion.div
                                    className={`flex items-center rounded-md overflow-hidden w-fit text-white
                                }`}
                                    animate={{ width: search ? 250 : 40 }} // Controla la expansión
                                    initial={{ width: 40 }}
                                    exit={{ width: 40 }}
                                    transition={{
                                        duration: 0.3,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <input
                                        id="searchid"
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        className={`bg-transparent outline-none w-full transition-opacity duration-300 text-base ${
                                            search ? "opacity-100" : "opacity-0"
                                        }`}
                                        autoFocus={search}
                                    />
                                </motion.div>

                                <label
                                    className="cursor-pointer"
                                    htmlFor="searchid"
                                    onClick={() => {
                                        setSearch(!search);
                                        setSearchTerm("");
                                    }}
                                >
                                    <img
                                        src={searchIcon}
                                        alt="Buscar"
                                        className="h-[15px]"
                                    />
                                </label>
                            </div>
                        </AnimatePresence>
                        <AnimatePresence>
                            {search && searchTerm && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    className="absolute flex flex-col top-8 bg-white shadow-md p-5 font-roboto-condensed w-[367px] h-[439px] z-40"
                                >
                                    <h2 className="font-bold text-[24px] py-5">
                                        Resultados de busqueda
                                    </h2>
                                    <div className="flex flex-col">
                                        {productInfo
                                            .filter((product) =>
                                                product.name
                                                    .toLowerCase()
                                                    .includes(
                                                        searchTerm.toLowerCase()
                                                    )
                                            )
                                            .map((product, index) => (
                                                <SearchCard
                                                    key={index}
                                                    searchObject={product}
                                                />
                                            ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    {socials.map((social, index) => (
                        <a
                            key={index}
                            target="_blanck"
                            href={social.href}
                            rel="noopener noreferrer"
                        >
                            <img src={social.logo} alt="" />
                        </a>
                    ))}
                    <div className="flex flex-row gap-4 h-[16px] items-center justify-center ">
                        {!userToken && (
                            <>
                                <button onClick={() => setUserMenu(!userMenu)}>
                                    <img
                                        className="h-[15px] w-[15px]"
                                        src={userIcon}
                                        alt=""
                                    />
                                </button>
                                <AnimatePresence>
                                    {userMenu && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{
                                                duration: 0.2,
                                                ease: "linear",
                                            }}
                                            ref={loginRef}
                                            className="absolute flex flex-col top-10 right-10 bg-white shadow-md p-5 font-roboto-condensed w-[367px] h-[439px] z-40 border"
                                        >
                                            <h2 className="font-bold text-[24px] py-5">
                                                Iniciar sesion
                                            </h2>
                                            <form
                                                onSubmit={onSubmit}
                                                className="w-full h-full flex flex-col justify-around gap-3"
                                                action=""
                                            >
                                                <div>
                                                    <div className="flex flex-col gap-2">
                                                        <label htmlFor="user">
                                                            Usuario
                                                        </label>
                                                        <input
                                                            value={user}
                                                            onChange={(ev) =>
                                                                setUser(
                                                                    ev.target
                                                                        .value
                                                                )
                                                            }
                                                            className="w-[328px] h-[45px] border pl-2"
                                                            type="text"
                                                            name="user"
                                                            id="user"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <label htmlFor="password">
                                                            Contraseña
                                                        </label>
                                                        <input
                                                            value={password}
                                                            onChange={(ev) =>
                                                                setPassword(
                                                                    ev.target
                                                                        .value
                                                                )
                                                            }
                                                            className="w-[328px] h-[45px] border pl-2"
                                                            type="password"
                                                            name="password"
                                                            id="password"
                                                        />
                                                    </div>
                                                </div>

                                                <button
                                                    className="w-[325px] h-[47px] bg-primary-red text-white self-center"
                                                    type="submit"
                                                >
                                                    INICIAR SESION
                                                </button>
                                            </form>
                                            <div className="flex flex-col items-center">
                                                <p>¿No tenes usuario?</p>
                                                <Link
                                                    className="text-primary-red"
                                                    to={"/registro"}
                                                >
                                                    REGISTRATE
                                                </Link>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </>
                        )}
                    </div>
                    {userToken && (
                        <div className="h-full relative">
                            <button
                                onClick={() => setUserLoged(!userLoged)}
                                className="w-[139px] h-full flex justify-center items-center bg-white"
                            >
                                <h2 className="font-medium text-sm text-primary-blue">
                                    {userInfo?.name
                                        ? userInfo?.name.toUpperCase()
                                        : ""}
                                </h2>
                            </button>
                            <AnimatePresence>
                                {userLoged && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -30 }}
                                        transition={{
                                            duration: 0.1,
                                            ease: "linear",
                                        }}
                                        className="absolute flex flex-col gap-4 top-10 right-0 border broder-gray bg-white shadow-md p-5 font-roboto-condensed w-[367px] h-fit z-20"
                                    >
                                        <Link
                                            className="bg-primary-red text-white text-center px-4 py-2"
                                            to={"/privado"}
                                        >
                                            SECCION PRIVADA
                                        </Link>
                                        <button
                                            className="bg-primary-red text-white text-center px-4 py-2"
                                            to={"/privado"}
                                        >
                                            CERRAR SESION
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>
            <nav className="flex bg-white relative flex-row items-center px-20 gap-24 w-full h-[85px] shadow-sm justify-between max-xl:justify-center">
                <div className="max-h-[57px] max-w-[267px] min-w-[230px] min-h-[50px] w-fit">
                    <Link className="" to={"/"}>
                        <img
                            src={logos?.principal_url}
                            alt="Logo"
                            className="w-full h-full object-contain"
                        />
                    </Link>
                </div>

                <ul className="flex flex-row gap-10 w-fit max-xl:hidden items-center">
                    <Link
                        className="hover:text-gray-500"
                        to={"/inicio/nosotros"}
                    >
                        Nosotros
                    </Link>
                    {dropdowns
                        .sort((a, b) => {
                            if (a.order_value < b.order_value) return -1;
                            if (a.order_value > b.order_value) return 1;
                            return 0;
                        })
                        .map((drop) => (
                            <div
                                onMouseEnter={() => toggleDropdown(drop.id)}
                                onMouseLeave={() => toggleDropdown(drop.id)}
                                className={`relative flex gap-1 max-xl:text-sm items-center `}
                                key={drop.id}
                            >
                                <div className="flex flex-row items-center gap-1">
                                    <Link
                                        onClick={() => setLinkInfo("")}
                                        className="hover:text-gray-500 whitespace-nowrap"
                                        to={drop.href}
                                    >
                                        {drop.id}
                                    </Link>
                                    {drop.chevron && (
                                        <img src={chevronDown} alt="Chevron" />
                                    )}
                                </div>

                                <AnimatePresence>
                                    {drop.open && drop.subHref && (
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: "fit-content" }}
                                            exit={{ height: 0 }}
                                            className="absolute flex flex-col top-6 left-0 bg-[#CBCBCB] shadow-md font-roboto-condensed w-[200px] h-fit z-40 overflow-hidden"
                                        >
                                            {drop.subHref.map((sub) => (
                                                <Link
                                                    onClick={() =>
                                                        setLinkInfo(sub.title)
                                                    }
                                                    className="flex flex-row items-center justify-between px-2 border-b border-white hover:text-gray-700"
                                                    key={sub.title}
                                                    to={`${drop.href}`}
                                                >
                                                    {sub.title}
                                                    <FontAwesomeIcon
                                                        icon={faChevronRight}
                                                        color={"#000"}
                                                    />
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    <Link
                        className="hover:text-gray-500"
                        to={"/inicio/calidad"}
                    >
                        Calidad
                    </Link>
                    <Link
                        className="hover:text-gray-500"
                        to={"/inicio/novedades"}
                    >
                        Novedades
                    </Link>
                    <Link
                        className="hover:text-gray-500"
                        to={"/inicio/contacto"}
                    >
                        Contacto
                    </Link>
                </ul>
                <button
                    onClick={() => setTinyMenu(!tinyMenu)}
                    className="w-[20px] h-[20px] absolute left-10 xl:hidden"
                >
                    <img src={barsIcon} alt="" />
                </button>
            </nav>
            <AnimatePresence>
                {tinyMenu && (
                    <div className="absolute top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] z-40">
                        <motion.div
                            ref={tinyMenuRef}
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col absolute top-0 left-0 h-screen w-1/2 bg-primary-blue max-sm:w-[80%]"
                        >
                            <button
                                onClick={() => setTinyMenu(false)}
                                className="absolute h-[16px] w-[16px] right-4 top-2"
                            >
                                <img src={xmark} alt="" />
                            </button>
                            <ul className="flex flex-col gap-5 p-10 text-white w-full">
                                {dropdowns.map((drop) => (
                                    <div
                                        className="relative flex-col justify-between gap-1 items-center p-2"
                                        key={drop.id}
                                    >
                                        <div className="flex flex-row justify-between w-full items-center border-b">
                                            <Link
                                                onClick={() =>
                                                    setLinkInfo(categoryInfo)
                                                }
                                                className="hover:text-gray-600 whitespace-nowrap"
                                                to={drop.href}
                                            >
                                                {drop.id}
                                            </Link>
                                            {drop.chevron && (
                                                <motion.button
                                                    animate={{
                                                        rotateZ:
                                                            drop.chevronAnimation
                                                                ? 180
                                                                : 0,
                                                    }}
                                                    transition={{
                                                        ease: "linear",
                                                    }}
                                                    onClick={() => {
                                                        toggleDropdown(drop.id);
                                                        toggleChevronAnimation(
                                                            drop.id
                                                        );
                                                    }}
                                                    className="h-5 w-5"
                                                >
                                                    <img
                                                        src={chevronDownWhite}
                                                        alt=""
                                                    />
                                                </motion.button>
                                            )}
                                        </div>
                                        <AnimatePresence>
                                            {drop.open &&
                                                drop.subHref &&
                                                tinyMenu && (
                                                    <motion.div
                                                        initial={{ height: 0 }}
                                                        animate={{
                                                            height: "fit-content",
                                                        }}
                                                        transition={{
                                                            duration: 0.2,
                                                            ease: "linear",
                                                        }}
                                                        exit={{ height: 0 }}
                                                        className=" flex flex-col w-full font-roboto-condensed gap-1 pt-2 overflow-hidden"
                                                    >
                                                        {drop.subHref.map(
                                                            (sub) => (
                                                                <Link
                                                                    onClick={() =>
                                                                        setLinkInfo(
                                                                            sub.title
                                                                        )
                                                                    }
                                                                    className="flex flex-row items-center justify-between pl-5 hover:text-gray-600"
                                                                    key={
                                                                        sub.title
                                                                    }
                                                                    to={
                                                                        "/inicio/terminales-y-accesorios"
                                                                    }
                                                                >
                                                                    {sub.title}
                                                                </Link>
                                                            )
                                                        )}
                                                    </motion.div>
                                                )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
