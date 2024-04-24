import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import NavBar from './components/NavBar/NavBar';
import EmpleadosLista from './components/Empleados/EmpleadosLista';
import EmpleadosForm from './components/Empleados/EmpleadosForm';

import * as EmpleadosServer from './components/Empleados/EmpleadosServer'; // Importa las funciones del servidor de empleados

import 'bootstrap/dist/css/bootstrap.min.css';
import 'sweetalert2/dist/sweetalert2.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <NavBar />
    <div className='container my-4'>
      <Routes>
        <Route path="/" element={<EmpleadosLista />} />
        <Route path="/EmpleadosForm" element={<EmpleadosForm />} />
        <Route path="/updateEmpleado/:id" element={<EmpleadosForm />} />
      </Routes>
    </div>
  </BrowserRouter>
);

// Lista los empleados al cargar la página principal
EmpleadosServer.listaEmpleados().then(data => {
  console.log(data);
}).catch(error => {
  console.error('Error al obtener la lista de empleados:', error);
});

reportWebVitals();

