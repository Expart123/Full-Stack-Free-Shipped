import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SummeryApi from '../common'
import { FaStar } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import displayAEDCurrency from '../helpers/displayCurrency';
import CategoryWiseProductDisplay from '../components/categoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import { useAppContext } from '../context';

const ProductDetails = () => {

  const [data, setData ] = useState({
    productName : "",
    brandName: "",
    category: "",
    productImage:[],
    description: "",
    price: "",
    sellingPrice: "",
  })
const params = useParams()
const [loading,setLoading] = useState(true)
const productImageListLoading = new Array(4).fill(null)
const [activeImage, satActiveImage] = useState("")



const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
  x : 0,
  y : 0
})
const [zoomImage, setZoomImage]=useState(false)

const { fetchUserAddToCart } = useAppContext();

const navigate = useNavigate()

const fetchProductDetails = async()=>{
    setLoading(true)
    const response = await fetch( SummeryApi.productDetails.url,{
      method: SummeryApi.productDetails.method,
      headers : {
        "content-type" : "application/json"
      },
      body:JSON.stringify({
        productId : params?.id
      })
    })

    setLoading(false)
const dataResponse = await response.json()
setData(dataResponse?.data)
satActiveImage(dataResponse?.data?.productImage[0])
  }
console.log("data",data)

useEffect(()=>{
  fetchProductDetails()
},[params])

const handleMouseEnterProduct = (imageURL)=>{
  satActiveImage(imageURL)

}
const handleZoomImage = useCallback((e) => {
  setZoomImage( true)
const {left, top, width ,height} = e.target.getBoundingClientRect()
console.log("coordinate", left, top, width, height)

const x = (e.clientX -left) / width
const y = (e.clientY -top) / height

setZoomImageCoordinate({
  x,
  y
})

},[zoomImageCoordinate])

const handleLeaveImageZoom = ()=> {

  setZoomImage( false)
}

const handleAddToCart =async(e,id) =>{
  await addToCart(e,id)
  fetchUserAddToCart()
}

const handleBuyProduct = async(e,id)=>{
  await addToCart(e,id)
  fetchUserAddToCart()
  navigate("/cart")
}


  return (
    <div className='container mx-auto p-4'>
        <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/**product Image */}
   <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>

<div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
  <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom}/>

{/**product zoom */}
{
  zoomImage && (
    <div className='hidden lg:block absolute min-w-[500px] min-h-[400px] overflow-hidden bg-slate-200 p-1 -right-[510px] top-0 '>
<div 
className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150'
style={{
  backgroundImage : `url(${activeImage})`,
  backgroundRepeat : 'no-repeat',
  backgroundPosition :`${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}% ` 
}}
>

</div>

</div>
  )
}

</div>

   <div className='h-full'>
      {
        loading ? (
      <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
    {
        productImageListLoading.map((el,index) =>{
          return(
          <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage"+index}>
        </div>
       )
    })
}
    
   </div>
       
        ):(
          <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
          {
              data.productImage.map((imgURL,index) =>{
                return(
                <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imgURL}>
                  <img src={imgURL} className='w-full h-full cursor-pointer object-scale-down mix-blend-multiply' onMouseEnter={()=>handleMouseEnterProduct(imgURL)} onClick={()=>handleMouseEnterProduct(imgURL)}/>
              </div>
             )
          })
      }
          
         </div>
        )
      } 

</div>
   </div>
 {/**product details */}
{
  loading ? (
    <div className=' grid gap-1 w-full' > 
 <div className='flex flex-col gap-1'>
<p className='bg-slate-200 animate-pulse h-6 lg:h-8  w-full rounded-full inline-block '> </p>
<h2 className='text-2xl lg:text-4xl font-medium h-6 bg-slate-200 animate-pulse w-full'></h2>
<p className='capitalize text-slate-400 bg-slate-200 min-w-[200px] animate-pulse h-6 w-full'></p>

<div className='text-red-600 bg-slate-200 h-6 animate-pulse flex gap-1 items-center w-full'>

</div>

<div className='flex items-center gap-2 text-2xl lg:text-3xl h-6 animate-pulse font-medium my-1 w-full'>
<p className='text-red-600 bg-slate-200 w-full'></p>
 <p className='text-slate-400 line-through bg-slate-200 w-full'></p>

</div>
<div className='flex items-center gap-3 my-2 w-full'>
  <button className='h-6 bg-slate-200 rounded animate-pulse w-full'></button>
  <button className='h-6 bg-slate-200 rounded animate-pulse w-full'></button>
</div>

<div className='w-full'>
  <p className='text-slate-600 font-medium my-1 h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full'></p>
  <p className=' bg-slate-200 rounded animate-pulse h-10 w-full lg:h-12'></p>
</div>
        </div>
    </div>
  ):(
    <div className='flex flex-col gap-1'> 
 <div className='flex flex-col gap-1'>
<p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'> {data?.brandName}</p>
<h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
<p className='capitalize text-slate-400'>{data?.category}</p>

<div className='text-red-600 flex gap-1 items-center'>
<FaStar />
<FaStar />
<FaStar />
<FaStar />
<FaRegStarHalfStroke />
</div>

<div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
<p className='text-red-600'>{displayAEDCurrency(data.sellingPrice)}</p>
 <p className='text-slate-400 line-through'>{displayAEDCurrency(data.price)}</p>
 <button className='border-red-600 rounded px-3 py-1'>Buy</button>

</div>
<div className='flex items-center gap-3 my-2'>
  <button className=' rounded px-3 py-1 min-w-[120px] border-2 border-red-600  text-red font-medium hover:bg-red-700 hover:text-white' onClick={(e)=>handleBuyProduct(e,data?._id)}>Buy</button>
  <button className=' rounded px-3 py-1 min-w-[120px] border-2 border-red-600 bg-red-600 text-white font-medium hover:bg-white hover:text-red-600' onClick={(e)=>handleAddToCart(e,data?._id)}>Add to Cart</button>
</div>

<div>
  <p className='text-slate-600 font-medium my-1'>Description</p>
  <p>{data?.description}</p>
</div>
        </div>
    </div>
  )
}
      </div>
{
  data.category && (
    <CategoryWiseProductDisplay category={data?.category} heading={"Recommended Product"}/>

  )
}

      </div>
  )
}

export default ProductDetails

