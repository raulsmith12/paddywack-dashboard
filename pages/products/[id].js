import { useRouter } from "next/router"
import { useState, useEffect } from "react";
import axios from "axios";
import ProductInfo from "../../components/ProductInfo";
import ProductPictures from "../../components/ProductPictures";

const Product = () => {
    const router = useRouter();
    const { id } = router.query;
    const [shopName, setShopName] = useState();

    useEffect(() => {
        async function fetchData() {
        
            const productStuff = await axios(
                `https://backend.paddywackgifts.com/public/api/shop/${id}`
            );

            setShopName(productStuff.data.data.name);
        }

        fetchData();
    }, []);

    return (
        <div className="container-fluid position-relative">
            <h2 className="display-2">{shopName}</h2>
            <ProductInfo id={id} />
            <h4>Pictures</h4>
            <ProductPictures id={id} />
        </div>
    )
}

export default Product;