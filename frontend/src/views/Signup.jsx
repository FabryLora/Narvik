import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup() {
    const { setUserToken, userToken, provincias, logos } = useStateContext();
    const [error, setError] = useState(null);

    const [userSubmitInfo, setUserSubmitInfo] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        razon_social: "",
        dni: "",
        telefono: "",
        direccion: "",
        provincia: "",
        localidad: "",
        codigo_postal: "",
    });

    const onSubmit = (ev) => {
        ev.preventDefault();

        axiosClient
            .post("/signup", userSubmitInfo)
            .then(({ data }) => {
                setUserToken(data.token);
            })
            .catch((error) => {
                if (error.response) {
                    setError(
                        Object.values(error.response.data.errors || {})
                            .flat()
                            .join(" ")
                    );
                } else {
                    setError("Ocurrió un error. Intenta nuevamente.");
                }
            });
    };

    if (userToken) {
        return <Navigate to="/" />;
    }

    const handleInputChange = (ev) => {
        const { name, value } = ev.target;
        setUserSubmitInfo({ ...userSubmitInfo, [name]: value });
    };

    return (
        <div className="flex flex-col gap-10 justify-center items-center w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 z-10">
            <Link to="/">
                <img src={logos?.principal_url} alt="Logo" />
            </Link>
            <div className="flex flex-col gap-2 bg-white shadow-md p-5 font-roboto-condensed w-fit h-fit z-20">
                {error && <div className="text-red-500">{error}</div>}
                <h2 className="font-bold text-[24px] py-5">Registrarse</h2>
                <form
                    onSubmit={onSubmit}
                    className="w-fit h-full flex flex-col gap-3"
                >
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-2 col-span-2">
                            <label htmlFor="name">Nombre de usuario</label>
                            <input
                                value={userSubmitInfo.name}
                                onChange={handleInputChange}
                                className="w-full h-[45px] border pl-2"
                                type="text"
                                name="name"
                                id="name"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                value={userSubmitInfo.password}
                                onChange={handleInputChange}
                                className="w-full h-[45px] border pl-2"
                                type="password"
                                name="password"
                                id="password"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password_confirmation">
                                Confirmar contraseña
                            </label>
                            <input
                                value={userSubmitInfo.password_confirmation}
                                onChange={handleInputChange}
                                className="w-full h-[45px] border pl-2"
                                type="password"
                                name="password_confirmation"
                                id="password_confirmation"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email">Email</label>
                            <input
                                value={userSubmitInfo.email}
                                onChange={handleInputChange}
                                className="w-full h-[45px] border pl-2"
                                type="email"
                                name="email"
                                id="email"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="razon_social">Razón Social</label>
                            <input
                                value={userSubmitInfo.razon_social}
                                onChange={handleInputChange}
                                className="w-full h-[45px] border pl-2"
                                type="text"
                                name="razon_social"
                                id="razon_social"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="dni">DNI / CUIT</label>
                            <input
                                value={userSubmitInfo.dni}
                                onChange={handleInputChange}
                                className="w-full h-[45px] border pl-2"
                                type="text"
                                name="dni"
                                id="dni"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="telefono">Teléfono</label>
                            <input
                                value={userSubmitInfo.telefono}
                                onChange={handleInputChange}
                                className="w-full h-[45px] border pl-2"
                                type="text"
                                name="telefono"
                                id="telefono"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2 col-span-2">
                            <label htmlFor="direccion">Dirección</label>
                            <input
                                value={userSubmitInfo.direccion}
                                onChange={handleInputChange}
                                className="w-full h-[45px] border pl-2"
                                type="text"
                                name="direccion"
                                id="direccion"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-3 col-span-2 gap-5">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="provincia">Provincia</label>
                                <select
                                    value={userSubmitInfo.provincia}
                                    onChange={(ev) =>
                                        setUserSubmitInfo({
                                            ...userSubmitInfo,
                                            provincia: ev.target.value,
                                            localidad: "",
                                        })
                                    }
                                    className="py-2 border h-[45px]"
                                    name="provincia"
                                    id="provincia"
                                >
                                    <option value="">
                                        Selecciona una provincia
                                    </option>
                                    {provincias.map((pr) => (
                                        <option key={pr.id} value={pr.name}>
                                            {pr.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="localidad">Localidad</label>
                                <select
                                    value={userSubmitInfo.localidad}
                                    onChange={(ev) =>
                                        setUserSubmitInfo({
                                            ...userSubmitInfo,
                                            localidad: ev.target.value,
                                        })
                                    }
                                    className="py-2 border h-[45px]"
                                    name="localidad"
                                    id="localidad"
                                >
                                    <option value="">
                                        Selecciona una localidad
                                    </option>
                                    {provincias
                                        .find(
                                            (pr) =>
                                                pr.name ===
                                                userSubmitInfo.provincia
                                        )
                                        ?.localidades.map((loc, index) => (
                                            <option
                                                key={index}
                                                value={loc.name}
                                            >
                                                {loc.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="codigo_postal">
                                    Codigo postal
                                </label>
                                <input
                                    value={userSubmitInfo.codigo_postal}
                                    onChange={handleInputChange}
                                    className="border py-2 pl-2 h-[45px]"
                                    type="text"
                                    name="codigo_postal"
                                    id="codigo_postal"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        className="w-[325px] h-[47px] bg-primary-red text-white self-center my-5"
                        type="submit"
                    >
                        REGISTRARSE
                    </button>
                </form>
                <div className="flex flex-col items-center">
                    <p>¿Ya tienes una cuenta?</p>
                    <Link className="text-primary-red" to="/iniciar-sesion">
                        INICIAR SESIÓN
                    </Link>
                </div>
            </div>
        </div>
    );
}
