import { useState } from "react";
import axiosClient from "../axios";
import CategoryAdminCard from "../components/CategoryAdminCard";
import SubCategoryAdminCard from "../components/SubCategoryAdminCard";
import { useStateContext } from "../contexts/ContextProvider";
export default function CategoriasAdmin() {
    const {
        categoryInfo,
        fetchCategoryInfo,
        subCategoryInfo,
        fetchSubCategoryInfo,
    } = useStateContext();

    const [image, setImage] = useState();
    const [name, setName] = useState();
    const [destacado, setDestacado] = useState();
    const [order, setOrder] = useState();
    const [link, setLink] = useState();

    //subcategory

    const [nameSub, setNameSub] = useState();
    const [orderSub, setOrderSub] = useState();
    const [linkSub, setLinkSub] = useState();
    const [categoryId, setCategoryId] = useState();

    const hanldeFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const submit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        formData.append("name", name);
        formData.append("destacado", destacado ? 1 : 0);
        formData.append("order_value", order);
        formData.append("link", link);

        try {
            const response = await axiosClient.post("/category", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log(response);
            fetchCategoryInfo();
        } catch (error) {
            console.log(error);
        }
    };

    const submitSub = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", nameSub);
        formData.append("order_value", orderSub);
        formData.append("link", linkSub);
        formData.append("category_id", categoryId);

        try {
            const response = await axiosClient.post("/subcategory", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log(response);
            fetchSubCategoryInfo();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col w-[90%] mx-auto py-10 gap-3">
                <h1 className="text-2xl">Categorias</h1>
                <div className="flex justify-center w-full">
                    <table className=" w-full shadow-md">
                        <thead className=" bg-gray-400">
                            <tr className=" text-center">
                                <td className=" min-w-[200px] py-2">Imagen</td>
                                <td>Nombre</td>
                                <td>Link</td>
                                <td>Destacado</td>
                                <td>Orden</td>
                                <td>Editar</td>
                            </tr>
                        </thead>
                        <tbody className=" text-center">
                            {categoryInfo.map((category) => (
                                <CategoryAdminCard
                                    key={category.id}
                                    category={category}
                                />
                            ))}
                            <tr className="h-[80px]">
                                <td>
                                    <label
                                        htmlFor="imagen"
                                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Seleccionar Imagen
                                    </label>
                                    <input
                                        id="imagen"
                                        onChange={hanldeFileChange}
                                        className="hidden"
                                        type="file"
                                    />
                                </td>
                                <td className="table-cell">
                                    <input
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        type="text"
                                        placeholder="Nombre de la categoria"
                                    />
                                </td>
                                <td className="table-cell">
                                    <input
                                        className="text-center"
                                        value={link}
                                        onChange={(e) =>
                                            setLink(e.target.value)
                                        }
                                        type="text"
                                        placeholder="Link"
                                    />
                                </td>

                                <td className="table-cell">
                                    <input
                                        checked={destacado}
                                        onChange={(e) =>
                                            setDestacado(e.target.checked)
                                        }
                                        type="checkbox"
                                        placeholder="Destacado"
                                    />
                                </td>
                                <td className="table-cell">
                                    <input
                                        value={order}
                                        onChange={(e) =>
                                            setOrder(e.target.value)
                                        }
                                        type="text"
                                        placeholder="Orden"
                                    />
                                </td>
                                <td className="table-cell">
                                    <button
                                        onClick={submit}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Crear categoria
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex flex-col w-[90%] mx-auto py-10 gap-3">
                <h1 className="text-2xl">Sub Categorias</h1>
                <div className="flex justify-center w-full">
                    <table className=" w-full shadow-md border">
                        <thead className="table-header-group bg-gray-400">
                            <tr className="table-row text-center">
                                <td className="table-cell py-2">Nombre</td>
                                <td className="table-cell">Link</td>
                                <td className="table-cell">Categoria</td>
                                <td className="table-cell">Orden</td>
                                <td className="table-cell">Editar</td>
                            </tr>
                        </thead>
                        <tbody className=" text-center">
                            {subCategoryInfo.map((category) => (
                                <SubCategoryAdminCard
                                    key={category.id}
                                    subCategory={category}
                                />
                            ))}
                            <tr className="h-[80px]" action="">
                                <td>
                                    <input
                                        value={nameSub}
                                        onChange={(e) =>
                                            setNameSub(e.target.value)
                                        }
                                        type="text"
                                        placeholder="Nombre de la categoria"
                                    />
                                </td>
                                <td>
                                    <input
                                        className="text-center"
                                        value={linkSub}
                                        onChange={(e) =>
                                            setLinkSub(e.target.value)
                                        }
                                        type="text"
                                        placeholder="Link"
                                    />
                                </td>

                                <td>
                                    <select
                                        onChange={(e) => {
                                            setCategoryId(e.target.value);
                                            console.log(categoryId);
                                        }}
                                        name=""
                                        id=""
                                    >
                                        <option value="">
                                            Seleccionar categoria
                                        </option>
                                        {categoryInfo.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </td>

                                <td>
                                    <input
                                        value={orderSub}
                                        onChange={(e) =>
                                            setOrderSub(e.target.value)
                                        }
                                        type="text"
                                        placeholder="Orden"
                                    />
                                </td>
                                <td>
                                    <button
                                        onClick={submitSub}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Crear Sub-categoria
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
