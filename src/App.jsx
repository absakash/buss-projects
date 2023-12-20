import { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './shared/router'
import { Toaster } from 'react-hot-toast'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
     <RouterProvider router={router}>

     </RouterProvider>
     <Toaster></Toaster>
    </>
  )
}

export default App
