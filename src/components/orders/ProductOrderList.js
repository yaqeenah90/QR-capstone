import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./orders.css"

export const ProductOrderList = () => {
    const [orders, setOrders] = useState([])
    const [filteredOrders, setFiltered] = useState([])
    const [removeItem, setRemove] = useState([false])
    const navigate = useNavigate()


    const localQRUser = localStorage.getItem("QueenRoots_user")
    const QueenRootsUserObject = JSON.parse(localQRUser)




    const localQROrder = localStorage.getItem("QueenRoots_order")
    const QueenRootsOrderObject = JSON.parse(localQROrder)



    useEffect(
        () => {
            fetch(`http://localhost:8088/orders?_expand=product&userId=${QueenRootsUserObject.id}`)
                .then(response => response.json())
                .then((orderArray) => {
                    setOrders(orderArray)
                })
        },
        [] // When this array is empty, you are observing initial component state
    )



    useEffect(
        () => {
            if (QueenRootsUserObject.registered) {
                //for registered users with order history
                const myOrders = orders.filter(order => order.userId === QueenRootsUserObject.id);
                setFiltered(myOrders)

            }

        },
        [orders]

    )


    const fetchedOrders = () => {
        fetch(`http://localhost:8088/orders?_expand=product&userId=${QueenRootsUserObject.id}`)
            .then(response => response.json())
            .then((orderArray) => {
                setOrders(orderArray)
            })
    }



    const deleteOrder = (order) => {
        fetch(`http://localhost:8088/orders/${order.id}`, {
            method: "DELETE"
        })
            .then(fetchedOrders)
    }


    const deleteButton = (order) => {
        return <button onClick={() => deleteOrder(order)} >Delete Order</button>
    }


    return <>

        <h2>Order History</h2>

        <article className="orders">
            {
                orders.map(

                    (order) => {
                        return <section className="order">


                             <header>{order.product?.name}</header> 
                            <p> {order.quantity} </p>
                            <footer>{order.product?.price} </footer>
                            {deleteButton(order)}

                        </section>


                    }
                )
            }


        </article>


    </>

}