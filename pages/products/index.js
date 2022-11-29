import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const productCards = await axios(
                'https://backend.paddywackgifts.com/public/api/shop'
            );

            console.log(productCards.data);
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
        </div>
    )
}

export default Products;