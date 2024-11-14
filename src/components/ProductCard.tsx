import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Products } from "../types";
import { titleCase } from "../helpers";
import ButtonsCart from "./ButtonsCart";
import { useNavigate } from 'react-router-dom';

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
    // Estado para el ordenamiento
    const [order, setOrder] = useState<string>('desc');
    const navigate = useNavigate();

    //Llamar los datos de los respectivos endpoints y retornar su data.
    useEffect(() => {
        async function fetchProducts() {
            try {
                // Construir la URL para incluir la categoría y el tipo de ordenamiento
                let url = `https://fakestoreapi.com/products`;
                if (selectedCategory !== 'all' || selectedCategory === 'all') {
                    url = `https://fakestoreapi.com/products/?sort=${order}`;
                }
                const response = await fetch(url);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.log(error)
            }
        }

        fetchProducts();
    }, [selectedCategory, order])

    useEffect(() => {
        async function fetchCategories() {
            try {
                //Crea un arreglo con las categorías obtenidas del endpoint de categorías.
                const responseCategories = await fetch("https://fakestoreapi.com/products/categories")
                const dataCategories = await responseCategories.json();
                const uniqueCategories = dataCategories;
                setCategories(['all', ...uniqueCategories]);
            } catch (error) {
                console.log(error);
            }
        }

        fetchCategories();
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

  const handleClickProduct = (id: string) => {
    navigate(`/product/${id}`); // Navegar a la ruta de detalles del producto
  };

  return (
    <>
        <h1>Bienvenido a nuestra tienda</h1>
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

                    {/* Dropdown para seleccionar el tipo de orden */}
                    <div className="order">
                        <h2>Ordenar</h2>
                        <select
                        value={order}
                        onChange={(e) => setOrder(e.target.value)}
                        >
                        <option value="desc">Más recientes</option>
                        <option value="asc">Más antiguos</option>
                        </select>
                    </div>
                </div>
            </div>
            
            {/* Mostrar los productos */}
            <div className="cards-container">
                {paginatedProducts.map(product => (
                            <div
                                key={product.id}
                                className="product-card"
                                onClick={() => handleClickProduct(product.id)}
                            >
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
                
                                <ButtonsCart/>
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
                            onClick={() => {
                                    changePage(pageNumber);
                                    window.scrollTo(0, 0);
                                }
                            }
                            disabled={currentPage === pageNumber}
                        >
                            {pageNumber}
                        </button>
                    )
                )
            }

            <button
                onClick={() => {
                        changePage(currentPage + 1);
                        window.scrollTo(0, 0);
                    }
                }
                disabled={currentPage === totalPages}
            >
                Siguiente
            </button>
        </div>
    </>
  )
}

export default ProductCard;