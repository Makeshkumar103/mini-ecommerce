import { Fragment } from "react/jsx-runtime";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";


export default function Home() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL+'/products')
        .then(res => res.json())
        .then(res => setProducts(res.products))
        console.log(process.env.REACT_APP_API_URL)
    },[]) 

    return <Fragment>
      <h1 id="products_heading">Latest Products</h1>
    
        <section id="products" className="container mt-5">
        <div className="row">
            {products.map(product =><ProductCard product={product} />)}

            
        </div>
        </section>
    </Fragment>
}