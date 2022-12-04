import { useRouter } from 'next/router';
import axios from 'axios';
import swal from 'sweetalert';
import Link from 'next/link';

const ProductCard = ({ image, name, id }) => {
    const router = useRouter();

    const deleteProduct = (e) => {
        swal({
            title: 'Are you sure you want to delete this product?',
            text: 'Once deleted, this product cannot be recovered!',
            icon: 'warning',
            dangerMode: true
        })
        .then((willDelete) => {
            if (willDelete) {
                axios({
                    method: 'delete',
                    url: `https://backend.paddywackgifts.com/public/api/shop/${e}`
                })
                .then(result => {
                    swal("Success!", "Your product has been deleted!", "success"),
                    router.push("/")
                })
                .catch(error => swal("Uh oh! Something went wrong. Please try again."))
            }
        })
    }

    return (
        <div className="card mb-2">
            <div className="card-body">
                {image && (
                    <img src={image.thumbnail_url} width="100%" />
                )}
                <h5 className="card-title">{name}</h5>
                <Link href={`products/${id}`}><a className="btn btn-primary mx-2">Edit Product</a></Link>
                <button className="btn btn-danger mx-2" onClick={() => deleteProduct(id)}>Delete Product</button>
            </div>
        </div>
    )
}

export default ProductCard;