import ButtonsCart from "../components/ButtonsCart"
import { ProductDetail } from "../types"

function ItemDetail({
    title, 
    image,
    rating: {
        rate
    },
    price,
    description
}: ProductDetail) {
  return (
    <div>
        <div className="image">
            <img src={image} alt={title} />
        </div>

        <div className="content-details">
            <h1>{title}</h1>
            <p>{rate}</p>
            <h4>{price}</h4>
            <p>{description}</p>

            <ButtonsCart/>
        </div>
    </div>
  )
}

export default ItemDetail