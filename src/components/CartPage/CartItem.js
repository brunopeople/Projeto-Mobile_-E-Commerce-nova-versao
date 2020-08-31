import React from "react";
import {Fatrash, FaChevronCircleUp, FaChevronCircleDown, FaTrash} from "react-icons/fa";

export default function CartItem({
    cartItem,
    increment,
    decrement,
    removeItem
}){
    const { id, title, price, count, total, image } = cartItem;

    return(
        <div className="row mt-5 mt-lg-0 text-capitalize text-center align-items-center">
            {/**aqui será renderizando a imagem */}
            <div className="col-10 mx-auto col-lg-2 pb-2">
                <img src={image} width="60" className="img-fluid" alt="product"/>
            </div>
            {/**fim*/}
            {/*titulo do produto*/}
            <div className="col-10 mx-auto col-lg-2 pb-2">
                <span className="d-lg-none">product: </span>
                {title}
            </div>
            {/**fim do titulo */}
            {/**Preço do produto */}
            <div className="col-10 mx-auto col-lg-2 pb-2">
                <span className="d-lg-none">price: $</span>
                {price}
            </div>
            {/*fim do preço*/}
            {/**contador de controle */}
            <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                <div className="d-flex justify-content-center">
                    <div>
                        <FaChevronCircleDown
                            onClick={() => decrement(id)}
                            className="cart-icon text-primary"
                        />
                    </div>
                </div>
            </div>
            {/**fim do controle de contador*/}
            {/**botão de remover produto*/}
             <div className="col-10 mx-auto col-lg-2">
                 <FaTrash
                    className="text-danger cart-icon"
                    onClick={() => removeItem(id)}
                 />
             </div>
             {/**fim do botão da remoção */}
             {/**Item total */}
            <div className="col-10 mx-auto col-lg-2">
                <strong className="text-muted">Item Total: ${total}</strong>
            </div>
            {/**fim do item total*/}
        </div>
    );
}
