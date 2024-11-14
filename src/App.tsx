import './App.css'
/* import Filter from './components/Filter' */
import Header from './components/Header'
import ProductCard from './components/ProductCard'
import PageItemDetail from './pages/PageItemDetail'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  

  return (
    <main>
      <Header/>
      <hr />

      <h1>Bienvenido a nuestra tienda</h1>

      <div className='main-content'>
        <Router>
          <Routes>
          <Route path="/" element={<ProductCard />} />
          <Route path="/product/:id" element={<PageItemDetail />} />
          </Routes>
        </Router>
      </div>
    </main>
  )
}

export default App
