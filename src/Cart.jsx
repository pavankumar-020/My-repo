import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrementQuant, incrementQuant, removeFromCart } from "./Store";
import { useState } from "react";

function Cart() {
  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [discount,setDiscount]=useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');

  const totalBeforeDiscount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountAmount = (totalBeforeDiscount * discount) / 100;
  const finalAmount = totalBeforeDiscount - discountAmount;

  const applyCoupon = () => {
    if (couponCode === 'ARA10') {
      setDiscount(10);
      setAppliedCoupon('10% discount applied!');
    } else if (couponCode === 'ARA20') {
      setDiscount(20);
      setAppliedCoupon('20% discount applied!');
    } else if (couponCode === 'ARA30') {
      setDiscount(30);
      setAppliedCoupon('30% discount applied!');
    } else {
      setAppliedCoupon('Invalid coupon code');
    }
  };



  const items = cartItems.map((product) => (
    <li key={`${product.name}-${product.price}`}> {/* Unique key using name and price */}
      {product.name} - ${product.price.toFixed(2)} *Quantity: {product.quantity}
      <button onClick={() => dispatch(incrementQuant(product))}>+</button>
      <button onClick={() => dispatch(decrementQuant(product))}>-</button>
      <button onClick={()=>dispatch(removeFromCart(product))}>Remove</button>
    </li>
  ));

  return (
    <>
      <h1>This is the Cart page</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ol>{items}</ol>
      )}
      <p>Total before discounts: ${totalBeforeDiscount.toFixed(2)}</p>
          <div>
            <button onClick={() => setDiscount(10)}>Apply 10% Discount</button>
            <button onClick={() => setDiscount(20)}>Apply 20% Discount</button>
            <button onClick={() => setDiscount(30)}>Apply 30% Discount</button>
          </div>
          <p>Discount Percentage Applied: {discount}%</p>
          <p>Discount Amount: ${discountAmount.toFixed(2)}</p>
          <p>Final Amount after Discount: ${finalAmount.toFixed(2)}</p>
          <div>
            <input
              type="text"
              placeholder="Enter Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button onClick={applyCoupon}>Apply Coupon</button>
          </div>
          <p>{appliedCoupon}</p>

    </>
  );
}

export default Cart;
