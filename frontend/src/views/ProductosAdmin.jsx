import { PhotoIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import axiosClient from "../axios";
import ProductRowAdmin from "../components/ProductRowAdmin";
import { useStateContext } from "../contexts/ContextProvider";

export default function ProductosAdmin() {
    const [name, setName] = useState(""); // Nombre del producto

    // Precio
    const [images, setImages] = useState([]); // Lista de archivos seleccionados
    const [categoryId, setCategoryId] = useState("");
    const [subCategoryId, setSubCategoryId] = useState(""); // ID de la subcategoría
    // ID de la categoría
    const [principal, setPrincipal] = useState("0");

    const [image, setImage] = useState();
    const [file, setFile] = useState();
    const [description, setDescription] = useState();

    const [error, setError] = useState(false);
    const [succ, setSucc] = useState(false);

    const { subCategoryInfo, productInfo, categoryInfo, fetchProductInfo } =
        useStateContext();

    const handleFileChange = (e) => {
        setImages(e.target.files); // Almacena los archivos seleccionados
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const prodData = new FormData();

            prodData.append("name", name);
            prodData.append("category_id", categoryId);
            prodData.append(
                "sub_category_id",
                subCategoryId ? subCategoryId : null
            );
            prodData.append("description", description);

            prodData.append("image", image);

            prodData.append("file", file);

            // 1. Crear el producto
            const productResponse = await axiosClient.post(
                "/product",
                prodData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const productId = productResponse.data.data.id; // ID del producto recién creado

            // 2. Subir imágenes
            const formData = new FormData();
            formData.append("principal", principal);
            Array.from(images).forEach((file, index) => {
                formData.append(`image`, file); // Agregar cada archivo al FormData
            });

            formData.append("product_id", productId); // Agregar el ID del producto

            const imageResponse = await axiosClient.post("/image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log(
                "Producto e imágenes creadas:",
                productResponse,
                imageResponse
            );
            setSucc(true);
            fetchProductInfo();
        } catch (err) {
            if (err && err.response) {
                const errorMessages = err.response.data.errors;
                const messagesArray = [];

                Object.values(errorMessages).forEach((messagesArrayField) => {
                    messagesArrayField.forEach((message) => {
                        let translatedMessage = message;
                        if (message === "The title field is required.") {
                            translatedMessage =
                                "El campo título no puede estar vacío.";
                        } else if (message === "The text field is required.") {
                            translatedMessage =
                                "El campo texto no puede estar vacío.";
                        } else if (message === "The image field is required.") {
                            translatedMessage =
                                "El campo imagen no puede estar vacío.";
                        }
                        messagesArray.push(translatedMessage);
                    });
                });
                setSucc(false);
                setError(messagesArray);
            }
        }
    };

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null);
            }, 6000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    useEffect(() => {
        if (succ) {
            const timer = setTimeout(() => {
                setSucc(null);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [succ]);

    return (
        <div className="relative overflow-x-auto">
            {error && (
                <div className="fixed top-10 left-[55%] bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    {error.map((errMsg, index) => (
                        <p key={index}>{errMsg}</p>
                    ))}
                </div>
            )}
            {succ && (
                <div className="fixed top-10 left-[55%] bg-green-100 border-l-4 border-green-500 text-green-700 p-4">
                    <p className="font-bold">Guardado correctamente</p>
                </div>
            )}
            <form
                onSubmit={handleSubmit}
                className="p-5 flex flex-col justify-between h-fit"
            >
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <label
                                    htmlFor="cover-photo"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Imagen de Portada
                                </label>
                                <div className="mt-2 flex justify-between rounded-lg border border-dashed border-gray-900/25 ">
                                    <div className="flex items-center justify-start p-4 w-1/2">
                                        <div className="text-center items-center h-fit self-center flex flex-row justify-start gap-3">
                                            <PhotoIcon
                                                aria-hidden="true"
                                                className="mx-auto size-12 text-gray-300"
                                            />
                                            <div className=" flex items-center gap-2 text-sm/6 text-gray-600">
                                                <label
                                                    className="cursor-pointer text-white bg-indigo-600 px-3 py-1.5 rounded-md"
                                                    htmlFor="portada"
                                                >
                                                    Elegir imagen
                                                </label>
                                                {images[0]?.name}
                                                <input
                                                    accept="image/*"
                                                    id="portada"
                                                    name="file-upload"
                                                    type="file"
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="image"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Imagen Tecnica
                                </label>
                                <div className="mt-2 flex justify-between rounded-lg border border-dashed border-gray-900/25 ">
                                    <div className="flex items-center justify-start p-4 w-1/2">
                                        <div className="text-center items-center h-fit self-center flex flex-row justify-start gap-3">
                                            <PhotoIcon
                                                aria-hidden="true"
                                                className="mx-auto size-12 text-gray-300"
                                            />
                                            <div className=" flex items-center gap-2 text-sm/6 text-gray-600">
                                                <label
                                                    className="cursor-pointer text-white bg-indigo-600 px-3 py-1.5 rounded-md"
                                                    htmlFor="tecnica"
                                                >
                                                    Elegir imagen
                                                </label>
                                                {image?.name}
                                                <input
                                                    accept=""
                                                    id="tecnica"
                                                    name="image"
                                                    type="file"
                                                    onChange={(e) =>
                                                        setImage(
                                                            e.target.files[0]
                                                        )
                                                    }
                                                    className="hidden"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="file"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Ficha Tecnica
                                </label>
                                <div className="mt-2 flex justify-between rounded-lg border border-dashed border-gray-900/25 ">
                                    <div className="flex items-center justify-start p-4 w-1/2">
                                        <div className="text-center items-center h-fit self-center flex flex-row justify-start gap-3">
                                            <PhotoIcon
                                                aria-hidden="true"
                                                className="mx-auto size-12 text-gray-300"
                                            />
                                            <div className=" flex items-center gap-2 text-sm/6 text-gray-600">
                                                <label
                                                    className="cursor-pointer text-white bg-indigo-600 px-3 py-1.5 rounded-md"
                                                    htmlFor="archivo"
                                                >
                                                    Elegir Archivo
                                                </label>
                                                {file?.name}
                                                <input
                                                    accept=""
                                                    id="archivo"
                                                    name="file"
                                                    type="file"
                                                    onChange={(e) =>
                                                        setFile(
                                                            e.target.files[0]
                                                        )
                                                    }
                                                    className="hidden"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="name"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Nombre
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={name}
                                        onChange={(ev) =>
                                            setName(ev.target.value)
                                        }
                                        id="name"
                                        name="name"
                                        type="text"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="description"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Descripcion
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        value={description}
                                        onChange={(ev) =>
                                            setDescription(ev.target.value)
                                        }
                                        id="description"
                                        name="description"
                                        rows={4}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="categoria"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Categoria
                                </label>
                                <div className="mt-2">
                                    <select
                                        value={categoryId}
                                        onChange={(ev) =>
                                            setCategoryId(ev.target.value)
                                        }
                                        id="categoria"
                                        name="categoria"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    >
                                        <option value="" disabled>
                                            Seleccione una categoria
                                        </option>
                                        {categoryInfo.map((category, index) => (
                                            <option
                                                key={index}
                                                value={category?.id}
                                            >
                                                {category?.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="subcategoria"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Sub Categoria
                                </label>
                                <div className="mt-2">
                                    <select
                                        value={subCategoryId}
                                        onChange={(ev) =>
                                            setSubCategoryId(ev.target.value)
                                        }
                                        id="subcategoria"
                                        name="subcategoria"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    >
                                        <option value="" disabled>
                                            Seleccione una sub categoria
                                        </option>
                                        {subCategoryInfo
                                            .filter(
                                                (subcategory) =>
                                                    subcategory.category_id ===
                                                    Number(categoryId)
                                            )
                                            .map((subcategory, index) => (
                                                <option
                                                    key={index}
                                                    value={subcategory?.id}
                                                >
                                                    {subcategory?.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </form>
            <div>
                <h2 className="text-2xl font-bold p-4">Grupos de productos</h2>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Imagenes de portada
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Imagene tecnica
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Ficha tecnica
                        </th>

                        <th scope="col" className="px-6 py-3">
                            Nombre
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Descripcion
                        </th>

                        <th scope="col" className="px-6 py-3">
                            Categoria
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Sub Categoria
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Editar
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {productInfo.map((info, index) => (
                        <ProductRowAdmin
                            key={index}
                            productObject={info}
                            subCategory={
                                subCategoryInfo.find(
                                    (category) =>
                                        category.id ===
                                        Number(info?.subCategory?.id)
                                )?.name
                            }
                            categoryName={
                                categoryInfo.find(
                                    (category) =>
                                        category.id ===
                                        Number(info?.category?.id)
                                )?.name
                            }
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
