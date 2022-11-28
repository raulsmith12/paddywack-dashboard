import axios from "axios";
import { useEffect, useState } from "react";

const GalleryImage = props => {
    const [imageUrl, setImageUrl] = useState();
    const [description, setDescription] = useState();
    const [uploadImage, setUploadImage] = useState('');

    useEffect(() => {
        async function fetchData() {
            const image = await axios(
                `https://backend.paddywackgifts.com/public/api/galleries/${props.id}`
            )

            setImageUrl(image.data.data.image_url);
            setDescription(image.data.data.description);
        }

        fetchData();
    })

    return (
        <div className="shadow p-3 mb-5 bg-body rounded">
            <img src={imageUrl} width="90%" alt={description} />
        </div>
    )
}

export default GalleryImage;