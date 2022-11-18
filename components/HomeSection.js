import { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

const HomeSection = props => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState();
    const [link, setLink] = useState();

    useEffect(() => {
        const iconSubstr = props.section.link_url.substring(27);
        setTitle(props.section.title);
        setDescription(props.section.description);
        setIcon(props.section.icon_url);
        setLink(iconSubstr);
    }, []);

    const handleFormSubmit = e => {
        e.preventDefault();
        axios({
            method: 'post',
            url: `https://paddywackgifts.com/backend/public/api/home-sliders/${props.id}`,
            headers: { 'content-type': 'application/json' },
            data: {
                'title': title,
                'description': description,
                'link_url': link,
                'icon_url': icon
            },
            params: {
                '_method': 'PUT'
            }
        })
        .then(result => {
            swal("Success!", "Home Section content successfully updated!", "success")
        })
        .catch(error => swal("Uh oh! Something went wrong. Please try again."))
    }

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
            swal("Success!", "Your image has been uploaded successfully! Please be sure to review all Home Slider information and click on Submit to change your slider image!", "success"),
            setIcon(result.data)
        })
        .catch(error => swal("Uh oh! Something went wrong. Please try again."))
    }

    return (
        <>
            <h4>Section {props.id}</h4>
            <form className="border border-primary p-2" onSubmit={e => handleFormSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="titleText" className="form-label">Title</label>
                    <input type="text" className="form-control" id="titleText" name="titleText" required value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="descText" className="form-label">Description</label>
                    <textarea type="text" className="form-control" id="descText" name="descText" required value={description} onChange={e => setDescription(e.target.value)} rows="5" />
                </div>
                <div className="mb-3">
                    <h5>Icon</h5>
                    <img src={icon} width="100%" /><br /><br />
                    <form onSubmit={fileUpload}>
                        <input type="file" onChange={imageUpload} />
                        <button type="submit">Upload</button>
                    </form>
                </div>
                <div className="mb-3">
                    <label htmlFor="linkText" className="form-label">Link</label>
                    <input type="text" className="form-control" id="linkText" name="linkText" required value={link} onChange={e => setLink(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default HomeSection;