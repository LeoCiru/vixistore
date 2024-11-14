import ButtonsCart from "../components/ButtonsCart";
import { useParams, useNavigate } from 'react-router-dom';
import { ProductDetail } from "../types";
import { useState, useEffect } from "react";
import { FaStar, FaArrowLeft } from "react-icons/fa";

function ItemDetail() {
  const { id } = useParams<{ id: string }>(); // Hook para tomar el id referenciado por parámetro en la url de las Routes
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data: ProductDetail = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      }
    };

    fetchProducto();
  }, [id]);

  if (!product) return <div>Cargando producto...</div>;
  
  return (
    <>
      <div className="home-button">
        <button onClick={() => navigate("/")}>
          <FaArrowLeft /> Regresar
        </button>
      </div>
      
      <div className="product-detail">
          <div className="product-image">
              <img src={product.image} alt={product.title} />
          </div>
      
          <div className="content-details">
              <h2>{product.title}</h2>
              <p className="rate"><span><FaStar/></span>{product.rating.rate}</p>
              <h4>${product.price}</h4>
              <p>{product.description}</p>
      
              <ButtonsCart/>
          </div>
      </div>
    </>
  )
}

export default ItemDetail;