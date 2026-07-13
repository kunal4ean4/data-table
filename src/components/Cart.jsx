import React from 'react'
import { FaCartShopping } from "react-icons/fa6";

const Cart = ({cart,handleIncreaseQuantity,handleDecreaseQuantity,totalPrice}) => {
  return (
    <div>
      <h3><FaCartShopping />
{cart.length}</h3>
      <table className="cartTable">
    <tbody>
      {cart.map((item) => (
        <tr key={item.id}>
          <td>{item.title}</td>
          <td>₹{item.price}</td>
          <td>
            <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
          </td>
          <td>{item.quantity}</td>
          <td>
            <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  <h3>Total Cart Price: $ {totalPrice}</h3>
    </div>
  )
}

export default Cart
