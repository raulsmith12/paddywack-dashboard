import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../../components/ProductCard';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const productCards = await axios(
                'https://backend.paddywackgifts.com/public/api/shop'
            );

            setProducts(productCards.data.data);
        }

        fetchData();
    }, []);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <h1>Products</h1>
                </div>
            </div>
            <div className="row">
                {products.map(i => (
                    <div className="col-3" key={i.id}>
                        <ProductCard id={i.id} image={i.images[0]} name={i.name} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Products;