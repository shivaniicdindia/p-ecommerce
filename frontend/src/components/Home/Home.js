import React, { useEffect } from "react";
import "./home.css";
import Product from '../Product/Product';
import { getProduct } from "../../actions/productAction";
import {    useSelector,  useDispatch} from "react-redux";
const Home = () => {
  const dispatch = useDispatch();

   const {loading , error, products ,productCount}= useSelector(state=>state.products)
   
  useEffect(() => {
    dispatch(getProduct()) 
  }, [dispatch])


  return (
    <>
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a href="#container">
          <button>
            Scroll
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
            {products &&
              products.map((product) => (
                console.log(product +"working"),
                <Product key={product._id} product={product} />
              ))}
          </div>
    </>

  );
};

export default Home;