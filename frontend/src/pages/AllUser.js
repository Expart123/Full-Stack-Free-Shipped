import React, { useEffect, useState } from 'react'
import SummeryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment/moment'
import { MdEdit } from "react-icons/md";
import ChangeUserRole from '../components/changeUserRole';

const AllUser = () => {
  const [allUser, setAllUsers]=useState([])
  const [openUpdateRole, setOpenUpdateRole] = useState(false)
  const [updateUserdetails,setUpdateUserDetails]= useState({
    email: "",
    name: "",
    role:"",
    _id:""
  })
const fetchAllUsers = async() =>{
  const fetchData = await fetch(SummeryApi.allUser.url,{
    method: SummeryApi.allUser.method,
    credentials: 'include'
  })

  const dataResponse = await fetchData.json()
if(dataResponse.success){
  setAllUsers(dataResponse.data)
}
if(dataResponse.error){
toast.error(dataResponse.message)
}
}
  useEffect(()=>{
    fetchAllUsers()
  },[])
  return (
    <div  className='bg-white pb-4'>
      <table className='w-full userTable'>
      <thead>
      <tr className='bg-black text-white'>
      <th>Sr.</th>
      <th>Name</th>
      <th>Email</th>
      <th>ROLE</th>
      <th>Created Date</th>
      <th>Edit</th>

      </tr>
      </thead>
   
      <tbody className=''>
  {
    allUser.map((el, index) => {
      return (
        <tr key={el._id}>
          <td>{index + 1}</td>
          <td>{el?.name}</td>
          <td>{el?.email}</td>
          <td>{el?.role}</td>
          <td>{moment(el?.createdAt).format("LL")}</td>
          <td>
            <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 
            hover:text-white' onClick={() => {
              setUpdateUserDetails(el)
              setOpenUpdateRole(true)
            }}>
              <MdEdit />
            </button>
          </td>
        </tr>
      )
    })
  }
</tbody>

      </table>
{
  openUpdateRole && (
    <ChangeUserRole 
    onClose={()=>setOpenUpdateRole(false)}
     name={updateUserdetails.name} 
     email={updateUserdetails.email} 
     role={updateUserdetails.role} 
     userId={updateUserdetails._id}
     callFunc={fetchAllUsers}

     />

  )
}
    </div>
  )
}

export default AllUser
