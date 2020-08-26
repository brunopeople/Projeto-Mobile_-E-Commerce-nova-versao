import React from "react";

export default function CartColumns(){
    return(
        <div className="container-fluid text-center d-none d-lg-block my-5">
          <div className="row">
              {/** Coluna única */}
              <div className="col-lg-2">
                  <p className="text-uppercase">Produtos</p>
              </div>
              {/** fim da Coluna única */}
              
              {/**Coluna única Produto  */}
              <div className="col-lg-2">
                <p className="text-uppercase">Nome do Produto</p>
              </div>
              {/**Fim da coluna Produto */}

              {/**Coluna Quantidade */}
              <div className="col-lg-2">
                  <p className="text-uppercase">Quantidade</p>
              </div>

              {/**fim da coluna preço*/}
              {/**Inicio da coluna de remover*/}
              <div className="col-lg-2">
                  <p className="text-uppercase">Total</p>
              </div>
              {/**Fim das Colunas */}
          </div>
        </div>
    );
}