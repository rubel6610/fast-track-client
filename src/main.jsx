
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './router/Router'


createRoot(document.getElementById('root')).render(
    <div className='urbanist-font bg-gray-200'>
         <RouterProvider router={router}></RouterProvider>
    </div>

)
