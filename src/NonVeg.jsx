import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "./Store"

function NonVeg()
{
  const nonvegProducts=useSelector(state=>state.products.NonVeg)
  const dispatch=useDispatch()

  const items=nonvegProducts.map((product,index)=>
                                   <li key={index}>{product.name}-${product.price.toFixed(2)}
                                   <button onClick={()=>dispatch(addToCart(product))}>Add to cart</button>
                                   </li>
                  )
    return(
        <>
          <h1>This is Nonveg item page</h1>
          <h4>{items}</h4>
        </>
      )
}
export default NonVeg