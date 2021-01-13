import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from "@material-ui/core";
import useStyles from "./style";

const CartItem = ({ item, fun1, fun2 }) => {
    const classes = useStyles();

    return (
       <Card>
           <CardMedia image={item.media.source} alt={item.name} className={classes.media} />
             <CardContent className={classes.CardContent}>
                 <Typography variant="h4">{item.name}</Typography>
                 <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
             </CardContent>
             <CardActions className={classes.CardActions}>
                 <div className={classes.buttons}>
                     <Button type="button" size="small" onClick={() => fun1(item.id, item.quantity - 1)}>-</Button>
                     <Typography>{item.quantity}</Typography>
                     <Button type="button" size="small" onClick={() => fun1(item.id, item.quantity + 1)}>+</Button>
                 </div>
                 <Button type="button" variant="contained" color="secondary" onClick={() => fun2(item.id)}>Remove</Button>
             </CardActions>
       </Card>
    )
}

export default CartItem;
