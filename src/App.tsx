import './App.css'
import Filter from './components/Filter'
import Header from './components/Header'
import ProductCard from './components/ProductCard'

function App() {
  

  return (
    <main>
      <Header/>
      <hr />

      <h1>Bienvenido a nuestra tienda</h1>

      <div className='main-content'>
        <Filter/>
        <ProductCard/>
      </div>
    </main>
  )
}

export default App
