import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from './Components/container';
import Home from './Components/home';
import Login from './Components/login';
import Navbar from './Components/navbar';
import Products from './Components/products';
import ProductDetails from './Components/products/details';
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
              <Route path='products/:productid' element={<ProductDetails/>} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;