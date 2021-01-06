import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, CardContent, Card, Grid, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    card: {
      height: 500,
      width: 250,
      spacing: 1,
    },
    image: {
        width: 225,
        height: "auto",
        marginTop: 0,
    },
    h1: {
        margin: "0px",
        fontSize: 20,
        "text-align": "center",
        height: 40,
        "font-weight": "bold",
        color: "#29465b"
    }

  }));

const ProductTile = ({product}) => {
    //const [pSize, setSize] = useState(null);
    const classes = useStyles();
    const imgSource = "products/" + product.sku + "_1.jpg";
    console.log(imgSource);

    return (
        <Grid item key={product.sku}>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.h1}>
                        {product.title}
                    </Typography>
                </CardContent>
                <Divider variant="middle" light="true"/>
                <CardContent>
                    <img className = {classes.image} src = {imgSource} alt = {product.description}/>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default ProductTile;