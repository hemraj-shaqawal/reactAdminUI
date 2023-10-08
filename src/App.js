import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { lazy, Suspense, useState } from 'react';
import { Provider } from 'react-redux';
import Store from './Utils/Store';
import userContext from './Utils/UserContext';

// Lazy router
const Home = lazy(() => import("./components/Home"))
const About = lazy(() => import("./components/About"))

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Suspense fallback={<h1>Loading...</h1>}><Home/></Suspense>),
    children: []
  },
  { 
    path: '/about',
    element: <Suspense fallback={<h1>Loading...</h1>}><About/></Suspense>
  }
])

function App() {
  const [user,setUser] = useState({
      name: 'jack'
  })
  return (
    <userContext.Provider value={{
      user: user,
      setUser: setUser
    }}>
      <Provider store={Store}>
        <RouterProvider router={router} />
      </Provider>
    </userContext.Provider>   
  );
}

export default App;
