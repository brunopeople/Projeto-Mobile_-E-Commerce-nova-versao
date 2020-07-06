import React from "react";
import Title from "../Title";

export default function Contact(){
    return(
        <section className="py-5">
            <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3">
                    <Title title="Sobre Nós"/>

                    <form
                    className="mt-5"
                    action="https://formspree.io/learncodetutorial@gmail.com"
                    method="POST"
                    >

                    {/*Nome*/}
                    <div className="form-group">
                        <input
                        type="text"
                        name="firstName"
                        className="form-control"
                        placeholder="Bruno Pessoa"
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="email@email.com"
                        />
                    </div>

                    {/*subject*/}

                    <div className="form-group">
                        <input
                        type="text"
                        classname="form-control"
                        placeholder="important!!!"
                      />
                    </div>
                    {/*Mensagem*/}
                    <div className="form">
                        <textarea
                        name="message"
                        className="form-control"
                        rows="10"
                        palceholder="Olá você amigo!!!"
                        />
                    </div>

                    {/*Submeter*/}

                    <div className="form-group mt-3">
                        <input
                        type="submit"
                        value="Send"
                        className="form-control bg-primary text-white"
                        />
                    </div>
                    </form>
                </div>
            </div>
        </section>
    );
}