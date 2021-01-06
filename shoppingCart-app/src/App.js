import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ProductGrid from './components/ProductGrid';

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    <React.Fragment>
      <Typography component="div" style={{ backgroundColor: '#778899', paddingTop: '30px'}}>
        <ProductGrid products = {products} />
      </Typography>
    </React.Fragment>
    
  );
};

export default App;