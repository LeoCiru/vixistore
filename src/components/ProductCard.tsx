import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Products } from "../types";
import { titleCase } from "../helpers";
import { FaShoppingCart, FaRegHeart } from "react-icons/fa";

function ProductCard() {

    //Para pasar al estado inicial del useState.
    const initialState: Products[] = [{
        id: '',
        title: '',
        image: '',
        category: '',
        rating: {
            rate: 0
        },
        price: 0
    }]

    const [products, setProducts] = useState<Products[]>(initialState)

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                const data = await response.json();

                setProducts(data);
            } catch (error) {
                console.log(error)
            }
        }

        fetchProducts();
    }, [])


  return (
    <div className="cards-container">
        {products.map(product => (
            <div key={product.id} className="product-card">
                <div className="first-card-info">
                    <h4>{product.title}</h4>
                </div>

                    <img src={product.image} alt={`Imagen de ${product.title}`} />

                <div className="second-card-info">
                    <small className="category">{titleCase(product.category)}</small>
                    <p className="rate">
                        <span><FaStar /></span>: {product.rating.rate}
                    </p>
                    <p>Precio: ${product.price}</p>
                </div>

                <div className="cart-buttons">
                    <button className="add-cart">
                        <div>
                            <FaShoppingCart/>
                        </div>
                        <span>Añadir al carrito</span>
                    </button>

                    <button className="add-wishlist">
                        <div>
                            <FaRegHeart/>
                        </div>
                        <span>Añadir a wishlist</span>
                    </button>
                </div>
            </div>
        ))}
    </div>
  )
}

export default ProductCard