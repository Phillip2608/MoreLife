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
        path:"/graphic",
        element:<Graphic />
      },
      {
        path:"/table",
        element:<Table />
      },
      {
        path:"/download",
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
