import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//Importando react-routers
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//Import routes
import Home from './routes/home';
import ErrorPage from './routes/errorPage';
import Graphic from './routes/graphic';
import Table from './routes/table';
import Download from './routes/download';
import Dashboard from './routes/dashboard';
import Login from './routes/login'
import Register from './routes/register'

const username = localStorage.getItem("name")

const router = createBrowserRouter([
  {
    path:"/",
    element:<App />,
    errorElement:<ErrorPage />,
    children:[
      {
        path:"/",
        element:<Home />
      },
      {
        path:"/login",
        element:<Login />
      },
      {
        path:"/register",
        element:<Register />
      }
    ]
  },
  {
    path:`/dashboard/${username !== '' && username}`,
    element:<Dashboard />,
    children:[
      {
        path:`/dashboard/${username !== '' && username}/graphic`,
        element:<Graphic />
      },
      {
        path:`/dashboard/${username !== '' && username}/table`,
        element:<Table />
      },
      {
        path:`/dashboard/${username !== '' && username}/download`,
        element:<Download />
      }
    ]
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

reportWebVitals();
