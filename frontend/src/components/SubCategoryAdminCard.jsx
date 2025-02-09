import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";
export default function SubCategoryAdminCard({ subCategory }) {
    const { fetchSubCategoryInfo, categoryInfo } = useStateContext();

    const [edit, setEdit] = useState(false);

    const [name, setName] = useState();
    const [link, setLink] = useState();
    const [categoria, setCategoria] = useState();
    const [order, setOrder] = useState();

    useEffect(() => {
        setName(subCategory?.name);
        setLink(subCategory?.link);
        setOrder(subCategory?.order_value);
        setCategoria(subCategory?.category_id);
    }, [subCategory]);

    const update = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("name", name);
        formData.append("link", link);
        formData.append("category_id", categoria);
        formData.append("order_value", order);

        try {
            const response = await axiosClient.post(
                `/subcategory/${subCategory.id}?_method=PUT`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log(response);
            fetchSubCategoryInfo();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteSubCategory = async () => {
        try {
            const response = await axiosClient.post(
                `/subcategory/${subCategory.id}?_method=DELETE`
            );

            console.log(response);
            fetchSubCategoryInfo();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <tr className=" h-[80px] border-y">
            <td>{name}</td>
            <td>{link}</td>
            <td>
                {
                    categoryInfo.find((category) => category.id === categoria)
                        ?.name
                }
            </td>
            <td>{order}</td>
            <td>
                <button onClick={() => setEdit(!edit)}>
                    <FontAwesomeIcon icon={faPenToSquare} size="xl" />
                </button>
            </td>
            {edit && (
                <div className="absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <form
                        onSubmit={update}
                        className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start min-w-[400px] gap-2"
                    >
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border py-1 pl-2"
                        />
                        <label htmlFor="link">Link</label>
                        <input
                            type="text"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            className="w-full border py-1 pl-2"
                        />

                        <label htmlFor="categorias">Categoria</label>
                        <select
                            className="border w-full py-1"
                            onChange={(e) => setCategoria(e.target.value)}
                            name="categorias"
                            id=""
                        >
                            {categoryInfo.map((category) => (
                                <option value={category.id} key={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="order">Orden</label>
                        <input
                            type="text"
                            value={order}
                            onChange={(e) => setOrder(e.target.value)}
                            className="w-full border py-1 pl-2"
                        />
                        <div className="flex flex-row gap-2">
                            <button
                                className="bg-green-500 text-white px-2 py-1"
                                type="submit"
                            >
                                Actualizar
                            </button>
                            <button
                                className="bg-blue-500 text-white px-2 py-1"
                                onClick={() => setEdit(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="bg-red-500 text-white px-2 py-1"
                                onClick={deleteSubCategory}
                            >
                                Eliminar
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </tr>
    );
}
