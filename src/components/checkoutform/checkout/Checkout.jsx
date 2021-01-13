import React, { useState, useEffect } from 'react';
import useStyles from "./style";
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core';
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import {commerce} from "../../../lib/commerce";
import {Link, useHistory} from "react-router-dom";

const steps = ['Shipping Address', 'Payment Details'];

const Checkout = ({ cart, order, handleCaptureCheckout, errorMsg}) => {
    const [ activeStep, setActiveStep] = useState(0);
    const [ checkoutToken, setCheckoutToken ] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const classes = useStyles();
    const history = useHistory();
    const [isFinished,setIsFinished] = useState(false);

    useEffect(() => {
     const generateToken = async () => {
         try {
          const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
          setCheckoutToken(token);
         } catch(error) {
        history.pushState('/');
     }
     }
     generateToken();
    },[cart]);
  
    const nextStep = () => setActiveStep((previous) => previous + 1);
    const backStep = () => setActiveStep((previous) => previous - 1);

    const next = (data) => {
        setShippingData(data);
        nextStep();
    }
    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true);
        },3000);
    }

    let Confirmation = () => order.customer ? (
        <>
      <div>
          <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
          <Divider className={classes.divider} />
          <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
      </div>
      <br />
      <Button component={Link} to ="/" variant="contained" type="button" color="secondary">Back to Home</Button>
        </>
    ) : isFinished ? (
        <>
        <div>
            <Typography variant="h5">Thank you for your purchase</Typography>
            <Divider className={classes.divider} />
        </div>
        <br />
        <Button component={Link} to ="/" variant="contained" type="button" color="secondary">Back to Home</Button>
          </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    );
    if(errorMsg){
        <>
        <Typography variant ="h5">Error: {errorMsg}</Typography>
        <br />
        <Button component={Link} to ="/" variant="contained" type="button" color="secondary">Back to Home</Button>
        </>
    }

    
    const Form = () => activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} next={next}/> : 
    <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} handleCaptureCheckout={handleCaptureCheckout}
        nextStep={nextStep} timeout={timeout}
    />
    return (
        <>
        <CssBaseline />
        <div className={classes.toolbar} />
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant="h4" align="center">Checkout</Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((step) => (
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                { activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form /> }
            </Paper>
        </main>
        </>
    )
}

export default Checkout;
