import React from 'react';
import { Cart } from '@shopify/app-bridge/actions';
import {useAppBridge} from "@shopify/app-bridge-react";

export const CartPage = () => {
    const app = useAppBridge();
    const cart = Cart.create(app);
    console.log('cart: ', cart)
    // cart.subscribe(CartPage.Action.UPDATE, function (payload) {
    //     console.log('[Client] cart update', payload);
    // });
    const cartData = async () => {
        const response = await cart.app.getState();
        console.log('cartData:', response)
    }

    cartData();

    const carContent = ()=> {
        try {
            let cartContents = fetch(window.Shopify.routes.root + 'cart.js')
                .then(response => response.json())
                .then(data => { return data });
            console.log('Cart page cartContents: ', cartContents)
        } catch (e) {
            console.log('cart page error: ', e);
        }
    }
    carContent();

    return (
        <div>
            Cart Info Page

        </div>
    );
};

export default CartPage;
