import React, { useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayAEDCurrency from '../helpers/displayCurrency';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import { useAppContext } from '../context';
import scrollTop from '../helpers/scrollTop';

const CategoryWiseProductDisplay = ({ category = 'defaultCategory', heading = 'Default Heading' }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(13).fill(null);

    const { fetchUserAddToCart } = useAppContext(); // Use the custom hook
const handleAddToCart = async(e,id)=> {
   await addToCart(e,id)
   await fetchUserAddToCart()
}

    const fetchData = async () => {
        setLoading(true);
        try {
            const categoryProduct = await fetchCategoryWiseProduct(category);
            console.log("Fetched Data:", categoryProduct); // Log the fetched data
            setData(categoryProduct?.data || []);
            console.log("horizontal data", categoryProduct.data);

        } catch (error) {
            console.error("Error fetching data:", error);
            setData([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [category]);

  

    return (
        <div className='container mx-auto px-4 my-6 relative'>
            <h2 className='text-2xl bg-white font-semibold py-4'>{heading}</h2>


            <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-6 overflow-x-scroll scrollbar-none transition-all'>
      

                {loading ? (
                    loadingList.map((_, index) => (
                        <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-gray-300 rounded-sm'>
                            <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                                {/* Add your loading placeholder here */}
                            </div>
                            <div className='p-4 grid gap-3'>
                                <div className='h-4 bg-gray-400 rounded'></div>
                                <div className='h-4 bg-gray-400 rounded w-3/4'></div>
                                <div className='h-4 bg-gray-400 rounded w-1/2'></div>
                                <div className='h-4 bg-gray-400 rounded w-1/3'></div>
                            </div>
                        </div>
                    ))
                ) : (
                    // to={"product/"+product?._id}
                    
                    data.map((product, index) => (
                        <Link to={`/product/${product._id}`} key={index} className='w-full min-w-[280px] md:min-w-[340px] max-w-[280px] md:max-w-[340px] bg-white rounded-sm shadow' onClick={scrollTop}>
                            <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                                {product.productImage && product.productImage.length > 0 ? (
                                    <img src={product.productImage[0]} alt={product.name} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' />
                                ) : (
                                    <span>No Image Available</span>
                                )}
                            </div>
                            <div className='p-4 grid gap-3'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black rounded-full'>{product?.productName}</h2>
                                <p className='capitalize text-slate-500'>{product?.category}</p>
                                <div className='flex gap-1'>
                                    <p className='text-red-600 font-medium'>{displayAEDCurrency(product?.sellingPrice)}</p>
                                    <p className='text-slate-500 line-through'>{displayAEDCurrency(product?.price)}</p>
                                </div>
                                <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full' onClick={(e)=>handleAddToCart(e,product?._id)}>
                                    Add to Cart
                                </button>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default CategoryWiseProductDisplay;


