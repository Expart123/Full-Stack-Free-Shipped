import React, { useState } from 'react';
import { FaPencilAlt } from "react-icons/fa";
import AdminEditProduct from './AdminEditProduct';
import displayAEDCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({ data,fetchData }) => {
    const [editProduct, setEditProduct] = useState(false);
    return (
        <div className='bg-pink-100 p-4 rounded'>
           <div className='w-40'>

<div className='w-32 h-32 flex justify-center items-center'>
<img src={data?.productImage[0]} className='mx-auto object-fill h-full' />
</div>
            <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>


<div>
<p className='font-semibold'>
    {
        displayAEDCurrency(data.sellingPrice)
    }
</p>

<div className='w-fit ml-auto p-2 bg-green-100 rounded-full hover:bg-green-600 hover:text-white rouded-fill cursor-pointer' onClick={() => setEditProduct(true)}>
                <FaPencilAlt />
            </div>
</div>


            
           </div>
            {editProduct && (
                <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchData={fetchData}/>
            )}
        </div>
    );
};

export default AdminProductCard;
