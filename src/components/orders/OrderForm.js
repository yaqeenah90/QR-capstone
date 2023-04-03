import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"


export const OrderForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
   const [products, setProducts] = useState([])
    const [order, update] = useState({
        productId: "",
        quantity: "",
        
    })
    useEffect(
        () => {
            fetch(`http://localhost:8088/products`)
                .then(response => response.json())
                .then((productsArray) => {
                    setProducts(productsArray)
                })
        },
        [] // When this array is empty, you are observing initial component state
    )
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */

    const navigate = useNavigate()

    const localQRUser = localStorage.getItem("QueenRoots_user") 
    const QueenRootsUserObject = JSON.parse(localQRUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API


        // TODO: Perform the fetch() to POST the object to the API

        const orderToSendToAPI = {
            userId: QueenRootsUserObject.id,
            productId: order.productId,

        
        }
        return fetch(`http://localhost:8088/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
             navigate("/orders")
            

            })

    }

    return (
        <form className="orderForm">
            <h2 className="orderForm__title">Place a New Order</h2>
    
            <fieldset> 
            <div className="item__heading">Item:</div>
                 { products.map( (item) => {
                        return (
                            <div className="order__form" key={`itemType--${item.id}`}>
                        <input
                                required autoFocus
                                onChange={
                                    (changeEvent) => {
                                    const copy = { ...item }
                                    copy.productId = parseInt(changeEvent.target.value)
                                    update(copy);
                                }}
                                type="radio"
                                name="item"
                                value={item.id}
                            /> {" "}
                                {item.name}
                        </div>
                        )
                        })}
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Order
            </button>
        </form>
    )
}


