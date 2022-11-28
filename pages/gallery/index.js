import axios from "axios";
import { useEffect, useState } from "react";
import GalleryImage from "../../components/GalleryImage";

const Gallery = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const galleryImages = await axios(
                'https://backend.paddywackgifts.com/public/api/galleries'
            );

            setImages(galleryImages.data.data);
        }

        fetchData();
    }, []);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <h1>Gallery</h1>
                </div>
            </div>
            <div className="row">
                {images.map(i => (
                    <div className="col-4" key={i.id}>
                        <GalleryImage id={i.id} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Gallery;