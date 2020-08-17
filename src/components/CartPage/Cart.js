import React from "react";
import Title from "../Title";
import CartColumns from "./CartColumn";
import CartList from "./CartList";
import CartTotals from "./CartTotal";

export default function Cart(){
    return(
        <div>
            <CartColumns/>
            <CartList/>
            <CartTotals/>
        </div>
    );
}