import { FaShoppingCart, FaRegHeart } from "react-icons/fa";

function Header() {
  return (
    <header>
        <nav>
            <div className="first-part">
                <h2>Vixi Store</h2>
                
                <ul>
                    <li><a href="/">Inicio</a></li>
                    <li><a href="#">Administrar</a></li>
                </ul>
            </div>

            <div className="buttons-store">
                <button className="cart">
                    <FaShoppingCart />
                </button>

                <button className="wishlist">
                    <FaRegHeart />
                </button>
            </div>
        </nav>
    </header>
  )
}

export default Header