// import {RouterProvider} from 'react-router-dom'
// import './App.css'
// import router from './router/Router'

// function App() {
//   return (
//     <RouterProvider router={router}/>
//   )
// }

// export default App

import { RouterProvider } from "react-router-dom";
import router from "./router/Router";
import { UserProvider } from "./UserContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </>
  );
}

export default App;
