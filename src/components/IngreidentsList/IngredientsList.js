import React, { useState } from 'react';
import './IngredientsList.css';

function IngredientList ({ shawarmaOrder, setShawarmaOrder, setFavourite}){
    
    const [selectedTopping, setSelectedTopping] = useState([]);
    const [selectedSauce, setSelectedSauce] = useState([]);
    const [currentSelection, setCurrenSelection] = useState("main");
    const [selectedSpiciness, setSpiciness] = useState(0);
    const [spicinessName, setSpicinessName] = useState("Mild");
    const [spicinessColor, setSpicinessColor] = useState("yellow"); // Default color
    
    const toppings = [
        { name: 'Lettuce'},
        { name: 'Tomatoes'},
        { name: 'Coleslaw'},
        { name: 'Onions & Herbs'},
        { name: 'Purple Cabbage'},
        { name: 'Cucumbers'},
        { name: 'Hummus'}
    ];

    const sauces = [
        { name: 'BBQ' },
        { name: 'Chipotle' },
        { name: 'Garlic' },
        { name: 'Tahini' },
        { name: 'Dijon' }
    ]

    const handleToppingClick = (topping) => {
        setSelectedTopping( (prevSelected) =>
            {
                if(prevSelected.includes(topping)){
                    return prevSelected.filter((item) => item !== topping); // filters array where it is not topping
                }else{
                    return [...prevSelected, topping]; // selects: topping is added to NEW preselected array
                }
            }
        );

        setShawarmaOrder( (orderList) => {
            const newToppings = orderList.toppings.includes(topping)
                ? orderList.toppings.filter( (item)  => item !== topping)
                : [...orderList.toppings, topping];

            return {
                ...orderList,
                toppings: newToppings
            };

        })
    };

    const handleSauceClick = (sauce) => {
        setSelectedSauce( (selection) => {
            if(selection.includes(sauce)){
                return selection.filter((item) => item !== sauce);
            }else{
                return [...selection, sauce];
            }
        });

        setShawarmaOrder( (orderList) => {
            const saucesList = orderList.sauces.includes(sauce)
                ? orderList.sauces.filter( (item) => item !== sauce)
                : [...orderList.sauces, sauce];
            
            return {
                ...orderList,
                sauces: saucesList
            }
        })
    }

    const ingredientButtonClick = (ingredient) => {
        setCurrenSelection("toppings");

        setShawarmaOrder( (orderList) => ({
            ...orderList, main: ingredient
        }))

    };

    const backButtonClicked = (selection) => {
        if (currentSelection === "toppings"){
            setCurrenSelection("main");
        }else if (currentSelection === "sauces"){
            setCurrenSelection("toppings");
        }else if (currentSelection === "spicy"){
            setCurrenSelection("sauces");
        }
    };

    const nextButtonClicked = (selection) => {
        if (currentSelection === "toppings"){
            setCurrenSelection("sauces");
        }else if(currentSelection === "sauces"){
            setCurrenSelection("spicy");
        }
    };

    const getSpicinessColor = (value) => {
        const red = 255;
        const green = Math.floor(255 - (value * 25.5)); // Green decreases as the value increases
        const blue = 0;
        return `rgb(${red}, ${green}, ${blue})`;
    };

    const handleSpicinessChange = (event) => {

        let newSpicinessName = "Mild";
        let newSpicinessColor = getSpicinessColor(event.target.value);

        if (event.target.value <= 4){
            newSpicinessName = "Mild";
        }else if(event.target.value > 4 && event.target.value <= 7){
            newSpicinessName = "Medium";
        }else{
            newSpicinessName = "HOT";
        }

        setSpiciness(event.target.value);
        setSpicinessColor(newSpicinessColor);
        setSpicinessName(newSpicinessName);
        
        setShawarmaOrder( (orderList) => ({
           ...orderList,
           spiciness: {
                level: event.target.value, 
                name: newSpicinessName, 
                color: newSpicinessColor
           }
        }));

    };

    const completeButtonClicked = () => {
        if(shawarmaOrder.main){
            setFavourite(shawarmaOrder);
            setShawarmaOrder({
                main: "",
                toppings: [],
                sauces: [],
                spiciness: { level: 0, name: "Mild", color: "yellow"}
            });
            setCurrenSelection('main');
        }
        
    };

    return (
        <div id="ingredients">
            {currentSelection === 'main' && (
                <>
                    <h1>Choose your main:</h1>
                    <div id="button-container">
                        <button onClick={() => ingredientButtonClick("Chicken")} id="chicken">Chicken</button>
                        <button onClick={() => ingredientButtonClick("Beef")} id="beef">Beef</button>
                        <button onClick={() => ingredientButtonClick("Veggie")} id="vegetarian">Veggie</button>
                    </div>
                </>
            )}

            {currentSelection === 'toppings' && (
                <div id="toppings">
                        <div id="button-container">
                            <button id="backButton" onClick={ () => backButtonClicked("main")}>Back</button>
                            <button id="nextButton" onClick={ () => nextButtonClicked("sauces")}>Next</button>
                        </div>
                        <h1>Choose your toppings:</h1>
                        <div id="toppings-container">
                            {
                                toppings.map((topping) => (
                                    <div
                                        key={topping.name}
                                        onClick={() => handleToppingClick(topping.name)}
                                        className={`topping ${selectedTopping.includes(topping.name) ? 'selected' : ''}`}
                                    >
                                        <span className="topping-name">{topping.name}</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
            )}

            {currentSelection === 'sauces' && (
                <div id="sauces">
                    <div id="button-container">
                            <button id="backButton" onClick={ () => backButtonClicked()}>Back</button>
                            <button id="nextButton" onClick={ () => nextButtonClicked()}>Next</button>
                    </div>
                    <h1>Choose your sauces:</h1>
                    <div id="sauces-container">
                        {
                            sauces.map((sauce) => (
                                <div
                                    onClick= { () => handleSauceClick(sauce.name)}
                                    className= {`sauce ${selectedSauce.includes(sauce.name) ? 'selected' : ''}`}
                                >
                                    <span className="sauce-name">{sauce.name}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )}

            {currentSelection === 'spicy' && (
                <div id='spiciness'>
                    <div id="button-container">
                            <button id="backButton" onClick={ () => backButtonClicked()}>Back</button>
                            <button id="nextButton" onClick={ () => nextButtonClicked()}>Next</button>
                    </div>
                    <h1>How spicy do you want it to be?</h1>
                    <div id="spicy-slider">
                        <input
                            type="range"
                            min="0"
                            max="10"
                            step="1"
                            value={selectedSpiciness}
                            onChange={handleSpicinessChange}
                            style={{ width: '200px' }} // Adjust the width as needed
                        />
                        <span>Spiciness Level: <span style={{ color: spicinessColor, fontWeight: 'bold' }}>{spicinessName}</span> </span>
                    </div>
                    <button onClick={ () => completeButtonClicked()}>Complete</button>
                </div>
            )}
        </div>
    );
}

export default IngredientList;