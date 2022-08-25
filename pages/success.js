import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { BsBagCheckFill } from 'react-icons/bs'
import { useStateContext } from '../context/StateContext'
import { runRealistic } from '../lib/utils'


const Success = () => {
    const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext()

    useEffect(() => {
        localStorage.clear();
        setCartItems([])
        setTotalPrice(0)
        setTotalQuantities(0)
        runRealistic()
    }, [])
    
  return (
    <div className='success-wrapper'>
        <div className='success'>
            <p className='icon'>
                <BsBagCheckFill />
            </p>
            <h2>Come back next time!</h2>
            <p className='email-msg'>Reciept sent to your email.</p>
            <p className='description'>
                Feel free to send an email for inquiries or complaints
                <a className='email' href='mailto:abiodunhodonu@gmail.com'>
                    Gleeco support
                </a>
            </p>
            <Link href='/'>
                <button type='button' width='300px' className='btn'>Continue Shopping</button>
            </Link>
        </div>
      
    </div>
  )
}

export default Success
