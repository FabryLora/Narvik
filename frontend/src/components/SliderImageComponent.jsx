import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";
export default function SliderImageComponent({ image }) {
    const { fetchSliderInfo } = useStateContext();

    const [trashHidden, setTrashHidden] = useState(false);
    const deleteImage = async () => {
        try {
            await axiosClient.delete(`/sliderimage/${image.id}`);
            fetchSliderInfo();
            toast.success("Imagen borrada correctamente");
        } catch (error) {
            toast.error("Error al borrar la imagen");
        }
    };

    return (
        <div
            onMouseEnter={() => setTrashHidden(true)}
            onMouseLeave={() => setTrashHidden(false)}
            className="relative h-[100px] w-[100px] border"
        >
            <img
                className="object-cover w-full h-full"
                src={image.image_url}
                alt=""
            />
            {trashHidden && (
                <button
                    onClick={deleteImage}
                    className=" absolute w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.5)]"
                >
                    <FontAwesomeIcon icon={faTrash} color="red" size="xl" />
                </button>
            )}
        </div>
    );
}
