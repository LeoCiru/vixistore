import { useState } from "react"
import { ProductForm } from "../types"

function PageAdmin() {
    const initialState = {
        id: 0,
        title: '',
        price: 0,
        description: '',
        image: '',
        category: '',
    }

    const [formData, setFormData] = useState<ProductForm>(initialState);
    const [hasError, setHasError] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

    const handleAddItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (!Object.values(formData).includes('')) {
            fetch('https://fakestoreapi.com/products',{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                  },
                body:JSON.stringify(formData)
            })
            .then(res=>res.json())
            .then(json=>console.log("Agregado con éxito: ", json));

            setFormData(initialState);
        } else {
            setHasError(true);
        }
    }

    const handleDeleteItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (!Object.values(formData).includes('')) {
            fetch(`https://fakestoreapi.com/products/${formData.id}`,{
                method:"DELETE",
                headers: {
                    'Content-Type': 'application/json',
                  },
                body:JSON.stringify(formData)
            })
            .then(res=>res.json())
            .then(json=>console.log("Eliminado con éxito: ", json));

            setFormData(initialState);
        } else {
            setHasError(true);
        }
    }

    const handleEditItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (!Object.values(formData).includes('')) {
            fetch(`https://fakestoreapi.com/products/${formData.id}`,{
                method:"PATCH",
                headers: {
                    'Content-Type': 'application/json',
                  },
                body:JSON.stringify(formData)
            })
            .then(res=>res.json())
            .then(json=>console.log("Eliminado con éxito: ", json));

            setFormData(initialState);
        } else {
            setHasError(true);
        }
    }

  return (
    <>
        <h1>Administrar productos</h1>

        <form action="">
            <div className="inputs">
                <label htmlFor="id">ID:</label>
                <input
                    type="number"
                    name="id"
                    id="id"
                    value={formData.id}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="title">Título:</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="price">Precio:</label>
                <input
                    type="number"
                    name="price"
                    id="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="description">Descripción:</label>
                <input
                    type="text"
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="image">Imagen:</label>
                <input
                    type="text"
                    name="image"
                    id="image"
                    value={formData.image}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="category">Categoría:</label>
                <input
                    type="text"
                    name="category"
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                />
                {hasError && <div className="error">
                                <p>Complete todos los campos</p>
                            </div>
                }
            </div>


            <div className="buttons">
                <button
                    className="add"
                    onClick={handleAddItem}
                >Crear</button>

                <button
                    className="edit"
                    onClick={handleEditItem}
                >Editar</button>

                <button
                    className="delete"
                    onClick={handleDeleteItem}
                >Eliminar</button>
            </div>
        </form>
    </>
  )
}

export default PageAdmin