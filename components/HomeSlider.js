import { useState } from 'react';
import axios from "axios";

const Slider = ({ image }) => {
    const [uploadImage, setUploadImage] = useState('');

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
        .then(res => {
            axios({
                method: 'POST',
                url: `https://paddywackgifts.com/backend/public/api/home-sliders/${image}`,
                headers: { 'content-type': 'application/json' },
                data: {
                    'slider_id': image,
                    'image_url': res.data
                },
                params: {
                    '_method': 'PUT'
                }
            })
            .then(result => {
                swal("Success!", "Your image has been uploaded successfully!", "success")
                router.push("/home-sliders")
            })
            .catch(error => swal("Uh oh! Something went wrong. Please try again."))
        })
        .catch(error => swal("Uh oh! Something went wrong. Please try again."))
    }
    
    return (
        <form onSubmit={fileUpload}>
            <input type="file" onChange={imageUpload} />
            <button type="submit">Upload</button>
        </form>
    )
}

export default Slider;