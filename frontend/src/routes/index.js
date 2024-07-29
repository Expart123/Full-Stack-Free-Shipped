import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/login'
import ForgotPassword from '../pages/ForgotPassword'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/AdminPanel'
import AllUser from '../pages/AllUser'
import AllProduct from '../pages/AllProduct'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
import Success from '../pages/success'
import Cancel from '../pages/Cancel'
import OrderPage from '../pages/OrderPage'


const router = createBrowserRouter([
    {
        path: '/',
        element : <App />,
        children:[
       {
        path: "",
        element:<Home />
       },
       {
        path: "login",
        element:<Login />
       },
       {
        path: "forgot-password",
        element:<ForgotPassword />
       },
       {
        path: "sign-up",
        element:<SignUp />
       },
       {
        path: "product-category",
        element:<CategoryProduct />
       },
      {
      path : "product/:id",
      element: <ProductDetails />
      },
    //   {
    //     path : "/product-category/product/:id",
    //     element: <ProductDetails />
    //     },
      {
      path:'cart',
      element:<Cart />
      },
      {
       path : "success",
       element : <Success />
      },
      {
        path: 'cancel',
        element: <Cancel />
      },

      {
        path : "search",
        element : <SearchProduct />
      },

      {
        path : "order",
        element : <OrderPage />
      },

       {
        path: "admin-panel",
        element:<AdminPanel />,
        children:[
            {
                path: "all-users",
                element: <AllUser />
            },
            {
                path: "all-products",
                element: <AllProduct />
            },
            
        ]
       },
    ]
    }
])

export default router