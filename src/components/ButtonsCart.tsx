import { FaRegHeart, FaShoppingCart } from "react-icons/fa"

function ButtonsCart() {
  return (
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
  )
}

export default ButtonsCart