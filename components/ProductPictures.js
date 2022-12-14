import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ThreeDots } from 'react-loader-spinner';

const ProductPictures = ({ id }) => {
    const router = useRouter();
    const [pictures, setPictures] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [uploadImage, setUploadImage] = useState('');
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        async function fetchData() {
        
            const productStuff = await axios(
                `https://backend.paddywackgifts.com/public/api/shop/${id}`
            );

            setPictures(productStuff.data.data.images);
        }

        fetchData();
    }, [pictures]);

    const addImageToProduct = (file) => {
        axios({
            method: 'post',
            url: 'https://backend.paddywackgifts.com/public/api/shop-images',
            headers: { 'content-type': 'application/json' },
            data: {
                'shop_id': id,
                'image_url': file,
                'thumbnail_url': file
            }
        });
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
        setShowForm(false);
        setShowLoader(true);
        axios({
            method: 'post',
            url: 'https://backend.paddywackgifts.com/public/api/files',
            headers: { 'content-type': 'application/json' },
            data: {
                'file_name': uploadImage
            }
        })
        .then(result => {
            setShowLoader(false),
            swal("Success!", "Your image has been uploaded successfully!", "success"),
            addImageToProduct(result.data)
        })
    }

    const confirmDelete = (id) => {
        swal({
            title: `Are you sure you want to delete this?`,
            text: 'Once deleted, this file cannot be recovered!',
            icon: 'warning',
            dangerMode: true
        })
        .then((willDelete) => {
            if (willDelete) {
                axios({
                    method: 'delete',
                    url: `https://backend.paddywackgifts.com/public/api/shop-images/${id}`
                })
                .then(result => {
                    swal("Success!", "Your image has been deleted!", "success"),
                    setTimeout(() => {
                        router.push("products")
                    }, 3500);
                })
                .catch(error => swal("Uh oh! Something went wrong. Please try again."))
            }
        })
    }

    return (
        <>
            <ThreeDots 
                height="80" 
                width="80" 
                radius="9"
                color="#922667" 
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName="position-absolute top-50 start-50 translate-middle"
                visible={showLoader}
            />
            <div className="row">
                {pictures.map(i => {
                    return (
                        <div className="col-2 border border-primary mx-1 py-2" key={i.id}>
                            <img src={i.image_url} width="100%" /><br /><br />
                            <button type="button" className="btn btn-danger btn-lg" onClick={e => confirmDelete(i.id)}>Remove Picture</button>
                        </div>
                    )
                })}
                <div className="col-md-2 col-sm-4">
                    <button type="button" className="btn btn-success btn-lg" onClick={e => setShowForm(true)}>Add Picture</button>
                    {showForm && (
                        <form onSubmit={fileUpload}>
                            <input type="file" onChange={imageUpload} className="form-control my-2" />
                            <button type="submit" className="btn btn-outline-success">Upload</button>
                        </form>
                    )}
                </div>
            </div>
        </>
    )
}

export default ProductPictures;
