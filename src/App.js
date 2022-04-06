import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Container from './Components/container';
import Home from './Components/home';
import Login from './Components/login';
import Navbar from './Components/navbar';
import Products from './Components/products';
import HandleProducts from './Components/handle-products';
import './globals.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App text-slate-700">
        <Container>
          <Navbar/>
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='login' element={<Login/>} />
              <Route path='products' element={<Products/>} />
              <Route path='products/:productid' element={<HandleProducts/>} />
            </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
