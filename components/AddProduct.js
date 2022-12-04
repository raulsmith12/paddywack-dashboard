import { useState, useRef } from 'react';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import { useRouter } from 'next/router';

const AddProduct = () => {
    const router = useRouter();
    const [shopName, setShopName] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const editorRef = useRef(null);
    const [route, setRoute] = useState();

    const handleProductAdd = e => {
        e.preventDefault();
        if (editorRef.current) {
            setDescription(editorRef.current.getContent());
        }
        axios({
            method: 'post',
            url: 'https://backend.paddywackgifts.com/public/api/shop',
            headers: { 'content-type': 'application/json' },
            data: {
                'name': shopName,
                'price': price,
                'description': description
            }
        })
        .then(result => {
            swal("Success!", "Product info successfully updated!", "success");
            setTimeout(() => {
                setRoute(result.data.data.id);
                router.push("/products")
            }, 3500);
        })
        .catch(error => swal("Uh oh! Something went wrong. Please try again."))
    }

    return (
        <form onSubmit={e => handleProductAdd(e)}>
            <div className="row">
                <div className="col-12 mb-3">
                    <label htmlFor="shopName" className="form-label">Title</label>
                    <input type="text" className="form-control" id="shopName" name="shopName" required value={shopName} onChange={e => setShopName(e.target.value)} />
                </div>
            </div>
            <div className="row">
                <div className="col-12 mb-3">
                    <label className="form-label">Description</label>
                    <Editor
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue={description}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-12 input-group mb-3">
                    <span class="input-group-text">$</span>
                    <input type="text" class="form-control" label="price" required value={price} onChange={e => setPrice(e.target.value)} />
                    <span class="input-group-text">.00</span>
                </div>
            </div>
        </form>
    )
}

export default AddProduct;