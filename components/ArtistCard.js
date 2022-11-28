import axios from "axios";
import { useState, useEffect } from "react";

const ArtistCard = props => {
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [image, setImage] = useState();
    const [uploadImage, setUploadImage] = useState('');

    useEffect(() => {
        async function fetchData() {
            const artist = await axios(
                `https://backend.paddywackgifts.com/public/api/artist/${props.id}`
            )

            setName(artist.data.data.name);
            setDescription(artist.data.data.description);
            setImage(artist.data.data.image_url);
        }

        fetchData();
    }, [])
    
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
            swal("Success!", "Your image has been uploaded successfully! Please be sure to review all Artist information and click on Submit to change your artist image!", "success"),
            setImage(result.data)
        })
        .catch(error => swal("Uh oh! Something went wrong. Please try again."))
    }

    const handleFormSubmit = e => {
        e.preventDefault();
        axios({
            method: 'post',
            url: `https://paddywackgifts.com/backend/public/api/artist/${props.id}`,
            headers: { 'content-type': 'application/json' },
            data: {
                'name': name,
                'description': description,
                'image_url': image
            },
            params: {
                '_method': 'PUT'
            }
        })
        .then(result => {
            swal("Success!", "Artist content successfully updated!", "success")
        })
        .catch(error => swal("Uh oh! Something went wrong. Please try again."))
    }

    return (
        <div className="shadow p-3 mb-5 bg-body rounded">
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="nameText" className="form-label">Name</label>
                <input type="text" className="form-control" id="nameText" name="nameText" required value={name} onChange={e => setName(e.target.value)} />
                <br />
                <label htmlFor="descriptionText" className="form-label">Description</label>
                <textarea type="text" className="form-control" id="descriptionText" name="descriptionText" required value={description} onChange={e => setDescription(e.target.value)} rows="5" /><br />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form><br />
            <img src={image} width="90%" alt={name} /><br /><br />
            <form onSubmit={fileUpload}>
                <input type="file" onChange={imageUpload} />
                <button type="submit">Upload</button>
            </form>
        </div>
    )
}

export default ArtistCard;