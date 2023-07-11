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

const router = createBrowserRouter([
  {
    path:"/",
    element:<App />,
    errorElement:<ErrorPage />,
    children:[
      {
        path:"/",
        element:<Home />
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
