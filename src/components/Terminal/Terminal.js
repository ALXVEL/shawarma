import React from "react";
import './Terminal.css';

function Terminal({shawarmaOrder}){
    if(!shawarmaOrder.main){
        return (
            <div id='terminal'>
                <h1>Order Terminal</h1>
                <h4>Begin your order.</h4>
            </div>
        );
    }else{
        return (
            <div id='terminal'>
                <h1>Order Terminal</h1>
                {/*<pre>{JSON.stringify(shawarmaOrder, null, 2)}</pre>*/}
                <div id='content-holder'>
                    <div id="main">
                        <span>Main: {shawarmaOrder.main}</span>
                    </div>
                    <div id="toppings">
                        <span>Toppings:
                            <ul>
                            {
                                shawarmaOrder.toppings.map( (topping) => (
                                    <li>
                                        {topping}
                                    </li>
                                ))
                            }
                            </ul>
                        </span>
                    </div>
                    <div id="sauces">
                        <span>Sauce:
                            <ul>
                                {
                                    shawarmaOrder.sauces.map( (sauce) => (
                                        <li>
                                            {sauce}
                                        </li>
                                    ))
                                }
                            </ul>
                        </span>
                    </div>
                    <div id="spiciness">
                        <span>Spiciness: {shawarmaOrder.spiciness.name} - {shawarmaOrder.spiciness.level}</span>
                    </div>
                </div>
            </div>
        );
    }
    
}

export default Terminal;