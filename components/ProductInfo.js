import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';

const ProductInfo = props => {
    const [shopName, setShopName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const editorRef = useRef(null);
    
    useEffect(() => {
        async function fetchData() {
        
            const productStuff = await axios(
                `https://backend.paddywackgifts.com/public/api/shop/${props.id}`
            );

            setShopName(productStuff.data.data.name);
            setPrice(productStuff.data.data.price);
            setDescription(productStuff.data.data.description);
        }

        fetchData();
    }, []);

    const handleProductEdit = e => {
        e.preventDefault();
        if (editorRef.current) {
            setDescription(editorRef.current.getContent());
        }
        axios({
            method: 'post',
            url: `https://galacticblue.net/cheekyginger/backend/public/api/products/${props.id}`,
            headers: { 'content-type': 'application/json' },
            data: {
                'name': shopName,
                'price': price,
                'description': description
            },
            params: {
                '_method': 'PUT'
            }
        })
        .then(result => {
            swal("Success!", "Product info successfully updated!", "success")
        })
        .catch(error => swal("Uh oh! Something went wrong. Please try again."))
    }

    return (
        <form onSubmit={e => handleProductEdit(e)}>
            <div className="row">
                <div className="col-6 mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" required defaultValue={shopName} onChange={e => setShopName(e.target.value)} />
                </div>
                <div className="col input-group mb-3">
                    <span class="input-group-text">$</span>
                    <input type="text" class="form-control" aria-label="Price" required defaultValue={price} onChange={e => setPrice(e.target.value)} />
                </div>
            </div>
            <div className="row">
                <div className="col-12 mb-3">
                    {description && (
                        <>
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
                        </>
                    )}
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                </div>
            </div>
        </form>
    )
}

export default ProductInfo;