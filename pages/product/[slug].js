import React, {useState} from 'react'
import { AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from 'react-icons/ai';
import { client, Client, urlFor } from '../../lib/Client'
import { Product } from '../components';
import { useStateContext } from '../../context/StateContext';


const ProductDetails = ({ product, products }) => {
    const { image, name, details, price } = product;
    const [index, setIndex] = useState(0)

    const {qty, incQty, decQty, onAdd} = useStateContext();

  return (

    <div>
      <div className='product-detail-container'>
        <div>
            <div className= "image-container">
                <img src={urlFor(image && image[index])} className="product-detail-image" />
            </div>
            <div className='small-images-container'>
                {image?.map((item, i) => (
                    <img key={i.toString()} src={urlFor(item)} className={i === index ? 'small-image selected-image' : 'small-image'} onMouseEnter={()=> setIndex(i)} />
                ))}
            </div>
        </div>
                        
        <div className='product-detail-desc'>
            <h1>{name}</h1>
            <div className='reviews'>
                <div>
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiOutlineStar />
                </div>
                <p>(29)</p>
            </div>
            <h4>Details</h4>
            <p>{details}</p>
            <p className='price'>₦{price}</p>
            <div className='quantity'>
                <h3>Quantity:</h3>
                <p className='quantity-desc'>
                    <span className='minus' onClick={decQty}><AiOutlineMinus /></span>
                    <span className='num'>{qty}</span>
                    <span className='plus' onClick={incQty}><AiOutlinePlus /></span>
                </p>
            </div>
            <div className='buttons'>
                <button type='button' className='add-to-cart' onClick={() =>onAdd(product, qty)}>Add to Cart</button>
                <button type='button' className='buy-now' onClick={() => null}>Buy Now</button>
            </div>
        </div>
    </div>
    
    
    <div className='maylike-producs-wrapper'>
        <h2>Suggestions specially for you</h2>
        <div className='marquee'>
            <div className='maylike-products-container track'>{products.map((item, i) => (
                <Product key={`${item._id}${i}`} product={item} />
            ))}</div>
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
