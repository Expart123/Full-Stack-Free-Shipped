import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummeryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

const AllProduct = () => {
  const [openUploadProduct,setOpentUploadProduct]=useState(false)
 const [allProduct,setAllProduct] =useState([])

 const fetchAllProduct = async () => {
  try {
    const response = await fetch(SummeryApi.allProduct.url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const dataResponse = await response.json();
    console.log("product data", dataResponse);
    setAllProduct(dataResponse?.data || []);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};


useEffect(()=>{
  fetchAllProduct()
},[])

 
  return (
    <div>
      <div className=' py-2 bg-slate-300 px-4 flex justify-between items-center'>
      <h2 className='font-bold text-lg'>All Product</h2>
      <button className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full ' onClick={()=>setOpentUploadProduct(true)}>Upload Product</button>
    </div>


     {/** all prouduct */}
<div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100-190px)] overflow-y-scorll bg-slate-400'>
   {
    allProduct.map((product,index)=>{
      return(
        <AdminProductCard data ={product} key={index+"allProduct"} fetchData={fetchAllProduct}/>
        )
    })
   }
  </div>


{/**upload product */}
{
  openUploadProduct && (
    <UploadProduct onClose={()=>setOpentUploadProduct(false)} fetchData={fetchAllProduct}/>
  )
}

 
    </div>
  )
}

export default AllProduct
