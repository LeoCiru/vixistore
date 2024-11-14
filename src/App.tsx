import './App.css'
import ButtonsCart from './components/ButtonsCart'
/* import Filter from './components/Filter' */
import Header from './components/Header'
import ProductCard from './components/ProductCard'
import ItemDetail from './pages/ItemDetail'

function App() {
  

  return (
    <main>
      <Header/>
      <hr />

      <h1>Bienvenido a nuestra tienda</h1>

      <div className='main-content'>
        {/* <Filter/> */}
        {/* <ProductCard/> */}
        <ItemDetail
          title='Holaa'
          image='Klk'
          rating={{rate: 2}}
          price={300}
          description='Holaestoesunapruebaaa'
        />
      </div>
    </main>
  )
}

export default App
