import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Container, Typography, Button, Card, CardContent, Grid} from "@mui/material";

function Cart() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (cart.length === 0) {
    return (
      <container style ={{marginTop:"50px",textAlign:"Center"}}>
        <Typography variant="h4" gutterBottom>
          Your Cart is Empty 🛒
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Looks like you haven't added anything yet.
        </Typography>
      <Button
      variant="contained"
      style={{marginTop:"20px"}}
      onClick={()=> window.location.href="/"}
      >Continue Shopping
      </Button>
      </container>
    );
      
  }

  return (
    <Container style={{ marginTop: "20px" }}>
      <Typography variant="h4">Your Cart</Typography>

      {cart.map((item) => (
        <Card key={item.id} style={{marginBottom:"15px"}}>
          <CardContent>
            <Grid container spacing={2} alignItems={"center"}>
            
            <Grid item xs ={3}>
              <img src={item.image} alt={item.title} style={{width:"100px",height:"100px"}} />
            </Grid>
            <Grid itme xs={5}>
               <Typography>{item.title}</Typography>
               <Typography>₹ {item.price}</Typography>
            </Grid>

            <Grid item xs ={2}>
              <Button onClick={()=>decreaseQuantity(item.id)}>-</Button>
              <Typography display="inline" style={{margin:"0 10px"}}>{item.quantity}</Typography>
              <Button onClick={()=>increaseQuantity(item.id)}>+</Button>
            </Grid>

          <Grid item xs={2}>
            <Button
            variant="outlined"
            color="error"
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </Button>
          </Grid>
          </Grid>
          </CardContent>
        </Card>
      ))}

      <Typography variant="h5" style={{ marginTop: "20px" }}>
        Total: ₹ {getTotal().toFixed(2)}
      </Typography>
    </Container>
  );
}

export default Cart;