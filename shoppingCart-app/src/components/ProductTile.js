import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
      height: 350,
      width: 200,
    },
    image: {
        width: 175,
        height: "auto"
    }
  }));

const ProductTile = ({product}) => {
    const [pSize, setSize] = useState(null);
    const classes = useStyles();
    const imgSource = "products/" + product.sku + "_1.jpg";
    console.log(imgSource);

    return (
        <Grid item key={product.sku}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}
                                justify="center"
                                direction="column"
                                alignItems="center">
                    <Grid item>
                        <img className = {classes.image} src = {imgSource} alt = {product.description}/>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}

export default ProductTile;