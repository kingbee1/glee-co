import React, {useRef} from 'react'
import Link from 'next/link'
import { AiOutlinePlus, AiOutlineMinus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
import { TiDeleteOutline }  from 'react-icons/ti'
import { toast } from 'react-hot-toast'
import { useStateContext } from '../../context/StateContext'
import { urlFor } from '../../lib/Client'

const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, totalQuantities, setShowCart, cartItems, toggleCartItemQuantity } = useStateContext();

  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button type='button' className='cart-heading'onClick={()=>setShowCart(false)}>
          <AiOutlineLeft />
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150} />
            <h3>Fill up your cart</h3>
            <Link href='/'>
              <button type='button' onClick={()=>setShowCart(false)} className='btn'>Keep shopping</button>
            </Link>
          </div>
        )}
        <div className='product-container'>
          {cartItems.length >= 1 && cartItems.map((item) =>(
            <div className='product' key={item._id}>
              <img src={urlFor(item?.image[0])} className="cart-product-image" />
              <div className='item-desc'>
                <div className='flex top'>
                  <h5>{item.name}</h5>
                  <h4>₦{item.price}</h4>
                </div>

                <div className='flex bottom'>
                  <div>
                    <p className='quantity-desc'>
                      <span className='minus' onClick={() => toggleCartItemQuantity(item._id, 'dec')}><AiOutlineMinus /></span>
                      <span className='num' onClick=''>{item.quantity}</span>
                      <span className='plus' onClick={() => toggleCartItemQuantity(item._id, 'inc')}><AiOutlinePlus /></span>
                    </p>
                  </div>

                  <button type='button' className='remove-item' onClick={''}>
                    <TiDeleteOutline />
                  </button>

                </div>

              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal</h3>
              <h3>₦{totalPrice}</h3> 
            </div>
            <div className='btn-container'>
              <button type='button' className='btn' onClick={''}>Pay with your card</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
