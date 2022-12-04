import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const GalleryImage = ({ id }) => {
    const [imageUrl, setImageUrl] = useState();
    const [description, setDescription] = useState();
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            const image = await axios(
                `https://backend.paddywackgifts.com/public/api/galleries/${id}`
            )

            setImageUrl(image.data.data.image_url);
            setDescription(image.data.data.description);
        }

        fetchData();
    }, []);

    const deleteImage = () => {
        swal({
            title: 'Are you sure you want to delete this image?',
            text: 'Once deleted, this image cannot be recovered!',
            icon: 'warning',
            dangerMode: true
        })
        .then((willDelete) => {
            if (willDelete) {
                axios({
                    method: 'delete',
                    url: `https://backend.paddywackgifts.com/public/api/galleries${id}`
                })
                .then(result => {
                    swal("Success!", "Your image has been deleted!", "success"),
                    router.push("/gallery")
                })
                .catch(error => swal("Uh oh! Something went wrong. Please try again."))
            }
        })
    }

    const handleFormSubmit = e => {
        e.preventDefault();
        axios({
            method: 'post',
            url: `https://paddywackgifts.com/backend/public/api/galleries/${id}`,
            headers: { 'content-type': 'application/json' },
            data: {
                'description': description,
                'image_url': imageUrl
            },
            params: {
                '_method': 'PUT'
            }
        })
        .then(result => {
            swal("Success!", "Gallery information successfully updated!", "success")
        })
        .catch(error => swal("Uh oh! Something went wrong. Please try again."))
    }

    return (
        <div className="shadow p-3 mb-5 bg-body rounded">
            <img src={imageUrl} width="90%" alt={description} />
            <button type="button" className="btn btn-success m-2" data-bs-toggle="modal" data-bs-target={`#modal${id}`}>View Image</button>
            <button type="button" className="btn btn-danger m-2" onClick={() => deleteImage()}>Delete Image</button>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="descText" className="form-label">Description</label>
                <input type="text" className="form-control" id="descText" name="descText" required value={description} onChange={e => setDescription(e.target.value)} />
                <button type="submit" className="btn btn-primary my-2">Change Description</button>
            </form>
            <div class="modal fade" id={`modal${id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body">
                            <img src={imageUrl} width="100%" alt={description} />
                            <h4>{description}</h4>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GalleryImage;