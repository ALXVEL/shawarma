import './Favourites.css'

function Favourites({favourites}){
    return (
        <div id="content">
            <h1>Fan Favourites:</h1>
            <div id="favourites">
                {
                    [...favourites].reverse().map( (order) => (
                        <div id="orders">
                            <span><strong>Main:</strong> {order.main} </span>
                            <br></br>
                            <span><strong>Toppings:</strong> {order.toppings.join(', ')}</span>
                            <br></br>
                            <span><strong>Sauces:</strong> {order.sauces.join(', ')}</span>
                            <br></br>
                            <span><strong>Spiciness:</strong> {order.spiciness.name} - {order.spiciness.level}</span>
                            <br></br>
                        </div>
                    ))                   
                }
            </div>
        </div>
    );
}

export default Favourites;