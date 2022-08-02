import React from 'react'
import { Footer, HeroBanner, Cart, Layout, NavBar, FooterBanner, Product } from './components'
import { client } from '../lib/Client'

const Home = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0] } />
      
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Available in various colours</p>
      </div>

      <div className='products-container'>
        {products?.map((product) => <Product key={product._id} product={product} />)}
      </div>

      <Footer />
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]'
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }

}
export default Home
