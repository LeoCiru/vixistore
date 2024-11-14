import { useState, useEffect } from 'react';
import { ProductForm } from '../types';
import { titleCase } from '../helpers';


function PageAdmin() {
  const [products, setProducts] = useState<ProductForm[]>([]);
  const [productInfo, setProductInfo] = useState<Omit<ProductForm, 'id'>>({
    title: '',
    price: 0,
    description: '',
    image: '',
    category: '',
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [hasError, setHasEror] = useState(false);

  // Función para obtener todos los productos
  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductInfo((prevForm) => ({
      ...prevForm,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  // Agregar nuevo producto
  const handleAddProduct = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productInfo),
      });
      const newProduct = await response.json();
      if (Object.values(newProduct).includes('')) {
        setHasEror(true);
        setTimeout(() => {
          setHasEror(false);
        }, 3000);
        return;
      }

     setProducts([...products, newProduct]);
     setHasEror(false);
     setProductInfo({ title: '', price: 0, description: '', image: '', category: '' });
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };

  // Preparar edición de producto
  const handleEdit = (product: ProductForm) => {
    setIsEditing(true);
    setEditProductId(product.id);
    setProductInfo({
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
    });
  };

  // Actualizar producto
  const handleUpdateProduct = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (editProductId === null) return;

    try {
      const response = await fetch(`https://fakestoreapi.com/products/${editProductId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productInfo),
      });
      const updatedProduct: ProductForm = await response.json();

      if (Object.values(updatedProduct).includes('')) {
        setHasEror(true);
        setTimeout(() => {
          setHasEror(false);
        }, 3000);
        return;
      }
      setProducts(products.map((p) => (p.id === editProductId ? updatedProduct : p)));
      setProductInfo({ title: '', price: 0, description: '', image: '', category: '' });
      setIsEditing(false);
      setEditProductId(null);
    } catch (error) {
      console.error('Error al actualizar producto:', error);
    }
  };

  // Eliminar producto
  const handleDeleteProduct = async (id: number) => {
    try {
      await fetch(`https://fakestoreapi.com/products/${id}`, { method: 'DELETE' });
      if (confirm("¿Confirmas eliminar este elemento?")) {
        setProducts(products.filter((product) => product.id !== id));
        return;
      }
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  return (
    <div className='admin-container'>
      <h1>Administrar productos</h1>

      {/* Formulario para agregar/editar productos */}
      <form>
        <h2>{isEditing ? 'Editar Producto' : 'Agregar Producto'}</h2>

        <label htmlFor="title">Título:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={productInfo.title}
          onChange={handleChange}
        />

        <label htmlFor="price">Precio:</label>
        <input
          type="number"
          name="price"
          id="price"
          value={productInfo.price}
          onChange={handleChange}
        />

        <label htmlFor="description">Descripción:</label>
        <input
          type="text"
          name="description"
          id="description"
          value={productInfo.description}
          onChange={handleChange}
        />

        <label htmlFor="image">URL imagen:</label>
        <input
          type="text"
          name="image"
          id="image"
          value={productInfo.image}
          onChange={handleChange}
        />

        <label htmlFor="category">Categoría:</label>
        <input
          type="text"
          name="category"
          id="category"
          value={productInfo.category}
          onChange={handleChange}
        />

        {hasError && <div className="error">
                      <p>Todos los campos deben ser completados</p>
                    </div>
        }

        <button
          className={"add-button"}
          onClick={isEditing ? handleUpdateProduct : handleAddProduct}
        >
          {isEditing ? 'Actualizar' : 'Agregar'}
        </button>
      </form>

      {/* Tabla de productos */}
      <div className='tabla'>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Imagen (url)</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td className='description'>{product.description.substring(0, 150)}</td>
                <td>{product.image}</td>
                <td>{titleCase(product.category)}</td>
                <td>
                  <div className='table-buttons'>
                    <button
                      onClick={() => handleEdit(product)}
                      className='edit'
                    >
                      Editar
                    </button>
                    
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className='delete'
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PageAdmin;
