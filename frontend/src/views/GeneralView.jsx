import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DefaultCard from "../components/DefaultCard";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function GeneralView() {
    const { categoryInfo, productInfo, linkInfo } = useStateContext();

    const location = useLocation();

    const [categoryName, setCategoryName] = useState();

    const [cleanPathname, setCleanPathname] = useState(
        location.pathname.replace(/^\/+/, "").replace(/-/g, " ").split("/")
    );

    function removeAccents(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    useEffect(() => {
        const newPath = location.pathname
            .replace(/^\/+/, "")
            .replace(/-/g, " ")
            .split("/");
        setCleanPathname(newPath);
        setCategoryName(newPath[1]?.split("-").join(" "));
    }, [location]);

    const filteredCategory = categoryInfo.find(
        (category) =>
            removeAccents(category?.name?.toUpperCase()) ===
            categoryName?.toUpperCase()
    );

    useEffect(() => {
        setSelectedSubcategory(linkInfo.toLowerCase());
    }, [linkInfo]);
    const [selectedSubcategory, setSelectedSubcategory] = useState(
        linkInfo?.toLowerCase() || ""
    );

    console.log("selectedSubcategory", selectedSubcategory);

    const filteredProducts = selectedSubcategory
        ? productInfo.filter(
              (info) =>
                  info?.subCategory?.name === selectedSubcategory &&
                  removeAccents(info?.category.name?.toUpperCase()) ===
                      categoryName?.toUpperCase()
          )
        : productInfo.filter(
              (info) =>
                  removeAccents(info.category?.name.toUpperCase()) ===
                  categoryName?.toUpperCase()
          );

    console.log(filteredCategory);

    return (
        <div className="flex flex-row w-full py-20 px-20 gap-10 font-roboto-condensed min-h-[526px]">
            {/* Lista de subcategorías */}
            <div className="w-[20%]">
                <button
                    onClick={() => setSelectedSubcategory("")}
                    className={` text-[16px] border-y border-[#EAEAEA] py-2 w-full text-left ${
                        !selectedSubcategory ? "font-bold" : ""
                    }`}
                >
                    Todos los productos
                </button>
                {filteredCategory?.subcategories.map((subcategory, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedSubcategory(subcategory.name)}
                        className={`text-[16px] border-y border-[#EAEAEA] py-2 w-full text-left ${
                            subcategory.name === selectedSubcategory
                                ? "font-bold"
                                : ""
                        }`}
                    >
                        {subcategory.name.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* Lista de productos */}
            <div className="flex flex-row flex-wrap justify-start w-[80%] gap-4">
                {filteredProducts.map((product, index) => (
                    <DefaultCard
                        key={index}
                        cardObject={product}
                        images={product.images}
                    />
                ))}
            </div>
        </div>
    );
}
