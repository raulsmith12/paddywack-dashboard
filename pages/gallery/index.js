import axios from "axios";
import { useEffect, useState } from "react";
import GalleryImage from "../../components/GalleryImage";

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [description, setDescription] = useState();
    const [uploadImage, setUploadImage] = useState('');
    const [newImage, setNewImage] = useState();

    useEffect(() => {
        async function fetchData() {
            const galleryImages = await axios(
                'https://backend.paddywackgifts.com/public/api/galleries'
            );

            setImages(galleryImages.data.data);
        }

        fetchData();
    }, []);

    const imageUpload = e => {
      let file = e.target.files[0];
      createImage(file);
    }
  
    const createImage = (file) => {
        let reader  = new FileReader();
        reader.onload = (e) => {
            setUploadImage(e.target.result);
        };
        reader.readAsDataURL(file);
    }
  
    const fileUpload = e => {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'https://paddywackgifts.com/backend/public/api/files',
            headers: { 'content-type': 'application/json' },
            data: {
                'file_name': uploadImage
            }
        })
        .then(result => {
            swal("Success!", "Your image has been uploaded successfully! Please be sure to review all Gallery information and click on Submit to add your new image!", "success"),
            setNewImage(result.data)
        })
        .catch(error => swal("Uh oh! Something went wrong. Please try again."))
    }

    const handleFormSubmit = e => {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'https://paddywackgifts.com/backend/public/api/galleries',
            headers: { 'content-type': 'application/json' },
            data: {
                'description': description,
                'image_url': newImage
            }
        })
        .then(result => {
            swal("Success!", "Gallery information successfully updated!", "success")
        })
        .catch(error => swal("Uh oh! Something went wrong. Please try again."))
    }

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
                <div className="col-4 shadow p-3 mb-5 bg-body rounded">
                    <h4>Add New Image?</h4>
                    <img src={uploadImage} width="90%" alt="New Image" />
                    <form onSubmit={fileUpload}>
                        <input type="file" onChange={imageUpload} />
                        <button type="submit">Upload</button>
                    </form>
                    <form onSubmit={handleFormSubmit}>
                        <label htmlFor="descText" className="form-label">Description</label>
                        <input type="text" className="form-control" id="descText" name="descText" required value={description} onChange={e => setDescription(e.target.value)} />
                        <button type="submit" className="btn btn-primary my-2">Save Image</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Gallery;