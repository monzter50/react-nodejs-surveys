import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import store from "../../redux/store";
import {
    handleToken
} from "../../redux/actions/index";
const Payments = ({children}) => {
    return (
        <>
            <StripeCheckout
                amount={500}
                token={token=> store.dispatch(handleToken(token))}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
            {children}
            </StripeCheckout>
        </>
    )
}

export default Payments
