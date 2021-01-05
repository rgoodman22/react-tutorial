import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
      height: 350,
      width: 200,
    },
    image: {
        width: 100,
        height: "auto"
    }
  }));

const ProductTile = ({product}) => {
    const classes = useStyles();
    const imgSource = "products/" + product.sku + "_1.jpg";
    console.log(imgSource);

    return (
        <Grid item key={product.sku} justify={"center"}>
            <Paper className={classes.paper}>
                <img className = {classes.image} src = {imgSource} alt = {product.description}/>
            </Paper>
        </Grid>
    );
}

export default ProductTile;