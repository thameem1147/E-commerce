import React from 'react';
import { Container, Typography, Button, Grid,CssBaseline} from "@material-ui/core";
import useStyles from "./style";
import CartItem from "./cartItems/CartItem";
import {Link} from "react-router-dom";

const Cart = ({ cart,fun1,fun2,fun3 }) => {
    const classes = useStyles();
   
    const EmptyCart = () => (
        <Typography variant="subtitle1">you have no items in your shopping cart,
        <Link to="/" className={classes.link}>+ add something!!!</Link>!
        </Typography>
    );
   
    const FillCart = () => (
     <>
     <Grid container spacing={3}>
        {cart.line_items.map((item) => (
           <Grid item xs={12} sm={4} key={item.id}>
               <CartItem item={item} fun1={fun1} fun2={fun2} />
           </Grid>
        ))}
     </Grid>
     <div className={classes.cardDetails}>
         <Typography variant="h4">
             Subtotal: {cart.subtotal.formatted_with_symbol}
         </Typography>
         <div>
             <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={fun3}>empty cart</Button>
             <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">check out</Button>    
         </div>
     </div>
     </>
    );
    if (!cart.line_items) return 'loading...'
    return (
      <Container>
        <CssBaseline />
          <div className={classes.toolbar}>
              <Typography className={classes.title} variant="h3" gutterBottom >your shopping cart</Typography>
              { !cart.line_items.length ? <EmptyCart /> : <FillCart />}
          </div>
      </Container>
    )
}

export default Cart;
