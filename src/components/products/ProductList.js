import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./products.css"


export const ProductList = () => {
    const [items, setItems] = useState([]) //products
    const navigate = useNavigate()



    const localQRUser = localStorage.getItem("QueenRoots_user")
    const QueenRootsUserObject = JSON.parse(localQRUser)



    useEffect(
        () => {
            fetch(`http://localhost:8088/products`)
                .then(response => response.json())
                .then((itemArray) => {
                    setItems(itemArray)
                })
        },
        [] // When this array is empty, you are observing initial component state
    )
    return <>



        <h2>List of Products</h2>

        <article className="items">
        <section> <button onClick={() => navigate("/order/create")}>Create Order</button> </section>

            {
                
                items.map(
                    (item) => {
                        return <section className="item">
                            <header>{item.name}</header>
                            <p> {item.description} </p>
                            <footer>{item.price} </footer>
                        </section>


                    }
                )

            }
        </article>

        
    </>
}

