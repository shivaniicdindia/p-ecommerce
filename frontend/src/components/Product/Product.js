import React from 'react';
import MetaData from '../layout/MetaData';


const Product = (product) => {
    return (
        <>
          <MetaData title={"E-commerce"}/>
        <div>
            {product.product.name}
        </div>
        </>
    );
}

export default Product;
