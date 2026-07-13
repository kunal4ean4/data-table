import React from 'react'

const Cart = ({cart,handleIncreaseQuantity,handleDecreaseQuantity}) => {
  return (
    <div>
      <h3>Cart:{cart.length}</h3>
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
    </div>
  )
}

export default Cart
