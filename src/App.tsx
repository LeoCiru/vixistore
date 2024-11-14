import './App.css';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import PageAdmin from './pages/PageAdmin';
import PageItemDetail from './pages/PageItemDetail';
import { Route, Routes } from 'react-router-dom';

function App() {
  

  return (
    <main>
      <Header/>

      <div className='main-content'>
          <Routes>
            <Route path="/" element={<ProductCard />} />
            <Route path="/product/:id" element={<PageItemDetail />} />
            <Route path="/admin" element={<PageAdmin />} />
          </Routes>
      </div>
    </main>
  )
}

export default App
