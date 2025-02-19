import React, {useState} from 'react'
import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => {
  const [selectedPayment, setSelectedPayment] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handlePaymentChange = event => {
    setSelectedPayment(event.target.value)
  }

  const handleConfirmOrder = () => {
    setOrderPlaced(true)
    setTimeout(() => {
      setOrderPlaced(false)
    }, 3000)
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        let total = 0
        cartList.forEach(eachCartItem => {
          total += eachCartItem.price * eachCartItem.quantity
        })

        return (
          <div className="cart-summary-container">
            <h1 className="order-total-value">
              <span className="order-total-label">Order Total:</span> Rs {total}{' '}
              /-
            </h1>
            <p className="total-items">{cartList.length} Items in cart</p>

            <Popup
              trigger={
                <button type="button" className="Checkout-button">
                  Checkout
                </button>
              }
              modal
              closeOnDocumentClick
            >
              {close => (
                <div className="popup-container">
                  <h2>Payment Method</h2>

                  <div className="payment-options">
                    <label>
                      <input
                        type="radio"
                        value="card"
                        disabled
                        checked={selectedPayment === 'card'}
                        onChange={handlePaymentChange}
                      />
                      Card
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="netbanking"
                        disabled
                        checked={selectedPayment === 'netbanking'}
                        onChange={handlePaymentChange}
                      />
                      Net Banking
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="upi"
                        disabled
                        checked={selectedPayment === 'upi'}
                        onChange={handlePaymentChange}
                      />
                      UPI
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="wallet"
                        disabled
                        checked={selectedPayment === 'wallet'}
                        onChange={handlePaymentChange}
                      />
                      Wallet
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="cod"
                        checked={selectedPayment === 'cod'}
                        onChange={handlePaymentChange}
                      />
                      Cash on Delivery
                    </label>
                  </div>

                  <h3>Order Summary</h3>
                  <p>Total Items: {cartList.length}</p>
                  <p>Total Price: Rs {total} /-</p>

                  <button
                    className="confirm-order-button"
                    disabled={selectedPayment !== 'cod'}
                    onClick={handleConfirmOrder}
                  >
                    Confirm Order
                  </button>

                  {orderPlaced && (
                    <p className="success-message">
                      Your order has been placed successfully!
                    </p>
                  )}

                  <button className="close-button" onClick={close}>
                    Close
                  </button>
                </div>
              )}
            </Popup>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary
