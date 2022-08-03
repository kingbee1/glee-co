import React from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'

const NavBar = () => {
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'>Gleeco store</Link>
      </p>
      <button type='button' className='cart-item' onClick={''}>
        <AiOutlineShopping />
        <span className='cart-item-qty'>9</span>
      </button>
    </div>
  )
}

export default NavBar
