import { FaShoppingCart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
        <nav>
            <div className="first-part">
                <h2>Vixi Store</h2>
                
                <ul>
                    <li><Link to={"/"}>Inicio</Link></li>
                    <li><Link to={"/admin"}>Administrar</Link></li>
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