import { useEffect, useState } from "react"
import { Categories } from "../types";
import { titleCase } from "../helpers";

function Filter() {

    const [categories, setCategories] = useState<Categories>([])

    //Obtener todas las categorías desde que se acceda a la página de inicio.
    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch("https://fakestoreapi.com/products/categories");
                const data = await response.json();

                setCategories(data);
            } catch (error) {
                console.log(error)
            }
        }

        fetchCategories();
    }, [])
    
  return (
    <div className="filter-card">
        <h3 >Filtros</h3>

        {categories.map((category) => (
            <div
                key={category}
                className="filter-items"
            >
                <div className="filter-item">
                    <input type="checkbox" name="" id={category} />
                    <label htmlFor={category}>{titleCase(category)}</label>
                </div>
            </div>
        ))}

    </div>
  )
}

export default Filter