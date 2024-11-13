import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Products } from "../types";
import { titleCase } from "../helpers";
import { FaShoppingCart, FaRegHeart } from "react-icons/fa";

function ProductCard() {

    //Para pasar al estado inicial de los products.
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

    const [products, setProducts] = useState<Products[]>(initialState);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const productsPerPage = 10;

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                const data = await response.json();

                setProducts(data);

                //Crea un arreglo con las categorías obtenidas del endpoint de categorías.
                const responseCategories = await fetch("https://fakestoreapi.com/products/categories")
                const dataCategories = await responseCategories.json();
                const uniqueCategories = dataCategories;
                setCategories(['all', ...uniqueCategories]);
            } catch (error) {
                console.log(error)
            }
        }

        fetchProducts();
    }, [])

  //Filtrar los productos según la categoría seleccionada
  const filteredProducts = selectedCategory === 'all' ? products : products.filter((product) => product.category === selectedCategory);

  // Calcular el número de páginas
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Obtener productos de la página actual
  const indexLastProduct = currentPage * productsPerPage;
  const indexFirstProduct = indexLastProduct - productsPerPage;
  const paginatedProducts = filteredProducts.slice(indexFirstProduct, indexLastProduct);

  const changePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };


  return (
    <>
        <div className="main-products-content">
            <div>
                {/* Dropdown para seleccionar la categoría */}
                <div>
                    <h2>Filtros</h2>
                    <select
                        value={selectedCategory}
                        onChange={(e) => {
                            setSelectedCategory(e.target.value);
                            setCurrentPage(1);
                        }}
            
                    >
                        {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category === 'all' ? 'Todas las Categorías' : titleCase(category)}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </div>
            
            {/* Mostrar los productos */}
            <div className="cards-container">
                {paginatedProducts.map(product => (
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
                        )
                    )
                }
            </div>  
        </div>

        {/* Navegación de Paginación */}
        <div className="pagination">
            <button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Anterior
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => changePage(pageNumber)}
                            disabled={currentPage === pageNumber}
                        >
                            {pageNumber}
                        </button>
                    )
                )
            }

            <button
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Siguiente
            </button>
        </div>
    </>
  )
}

export default ProductCard;