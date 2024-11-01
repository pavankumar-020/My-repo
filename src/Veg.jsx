import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "./Store"

function Veg()
{
  const vegProducts=useSelector(state=>state.products.Veg)
  const dispatch=useDispatch()

  const items=vegProducts.map((product,index)=>
                                   <li key={index}>{product.name}-${product.price.toFixed(2)}
                                   <button onClick={()=>dispatch(addToCart(product))}>Add to cart</button>
                                   </li>
                  )
    return(
        <>
          <h1>This is Veg items page</h1>
          <ul>{items}</ul>
        </>
      )
}
export default Veg