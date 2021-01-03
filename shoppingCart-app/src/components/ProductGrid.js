import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 400,
      width: 200,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));


const ProductGrid = ({products}) => {
    const classes = useStyles();

    return (
        <Container maxWidth="md">
          <Grid container justify="center" spacing={4}>
          {products.map((value) => (
              <Grid key={value} item>
                  <Paper className={classes.paper}>
                      {value.title}
                  </Paper>
              </Grid>
          ))}
          </Grid>
      </Container>
    );
}

export default ProductGrid;

