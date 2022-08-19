import React from 'react'
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai'

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>&copy; 2022 All Rights Reserved.</p>
      <p className='icons'>
        <a href="https://instagram.com/beordo_" target="_blank"><AiFillInstagram /></a>
        <a href="https://twitter.com/real_kingbee" target="_blank"><AiOutlineTwitter /></a>
      </p>
    </div>
  )
}

export default Footer
