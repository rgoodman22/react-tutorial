import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import ProductTile from './ProductTile';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "center"
  }
}));


const ProductGrid = ({products}) => {
    const classes = useStyles();
    return (
        <Container maxWidth="md">
          <Grid container justify="center" spacing={3} className={classes.root}>
            {products.map((product) => 
              <ProductTile key = {product.sku} product = { product }/>
            )}
          </Grid>
      </Container>
    );
}

export default ProductGrid;

