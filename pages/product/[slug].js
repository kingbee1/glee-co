import React from 'react'
import { AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from 'react-icons/ai';
import { client, Client, urlFor } from '../../lib/Client'

const ProductDetails = ({ product, products }) => {
    const { image, name, details, price } = product;
  return (
    <div>
      <div className='product-detail-container'>
        <div>
            <div className= "image-container">
                <img src={urlFor(image && image[0])} className="product-detail-image" />
            </div>
            {/* <div className='small-images-container'>
                {image?.map((item, i) => (
                    <img src={urlFor(item)} className="" onMouseEnter={{}} />
                ))}
            </div> */}

            <div className='product-detail-desc'>
                <h1>{name}</h1>
                <div className='reviews'>
                    <div>
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiOutlineStar />

                        <AiOutlineMinus />
                        <AiOutlinePlus />
                    </div>
                    <p>(29)</p>
                </div>
                <h4>Details</h4>
                <p>{details}</p>
                <p className='price'>₦{price}</p>
                <div className='quantity'>
                    <h3>Quantity:</h3>
                    <p className='quantity-desc'>
                        <span className='minus' onClick={''}><AiOutlineMinus /></span>
                        <span className='num' onClick={''}>0</span>
                        <span className='minus' onClick={''}><AiOutlinePlus /></span>
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "product"]{
        slug {
            current
        }
    }
    `;

    const products = await client.fetch(query);

    const paths = products.map((product) =>({
        params: {
            slug: product.slug.current
        }
    }));

    return {
        paths,
        fallback: 'blocking'
    }

}


export const getStaticProps = async ({params: { slug }}) => {
    const query = `*[_type == "product" && slug.current == '${ slug }'][0]`;
    const productsQuery = '*[_type == "product" ]'

    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);

    const bannerQuery = '*[_type == "banner"]';
    const bannerData = await client.fetch(query);

    return {
        props: { products, product }
    }
}

export default ProductDetails
