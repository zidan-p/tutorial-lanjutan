import logo from './logo.svg';
import './App.css';
import Blog from './components/blog/blog';
import Contact from './components/contact/contact';
import Detail from './components/contact/detail-contact/detail-contact';
import Product from './components/product/product';
import {BrowserRouter,Routes,Route, Link} from "react-router-dom";
import React from 'react';

function Nav(props){
  return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Belajar React</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse container" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
            <li className="nav-item">
              <a className="nav-link " ><Link to="/" className='ling'>Home</Link></a>
            </li>
            <li className="nav-item">
              <a className="nav-link active " aria-current="page" ><Link to="/contact" className='ling'>Contact</Link></a>
            </li>
            <li className="nav-item">
              <a className="nav-link " ><Link to="/blog" className='ling'>Blog</Link></a>
            </li>
            <li className="nav-item">
              <a className="nav-link " ><Link to="/product" className='ling'>Product</Link></a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    
  )
}

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<div><h1>Ini adalah halaman Home</h1></div>} />
          <Route path="blog" element={<Blog />} />
          <Route path="product" element={<Product />} />
          <Route path="contact" element={<Contact />} ></Route>
          <Route path='detail' element={<Detail />} >
            <Route path=":id" element={<Detail />} /> {/** :id di sini digunakna sebagai param */}
          </Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
