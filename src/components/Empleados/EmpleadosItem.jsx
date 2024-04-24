import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

import * as EmpleadosServer from './EmpleadosServer';

const EmpleadosItem = ({ empleado, listaEmpleados }) => {
    const navigate = useNavigate();
    
    const handleDelete = async (empleadoId) => {
       const result = await Swal.fire({
        title: 'Eliminar Registro',
        text: 'Estás seguro de que deseas eliminar este registro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Borrar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#212529',
        reverseButtons: true,
       });

       if(result.isConfirmed){
        await EmpleadosServer.eliminarEmpleado(empleadoId);
        listaEmpleados();
        Swal.fire('Eliminado!','El registro ha sido eliminado.','success');
       }
    }

    return (
        <div className="col-md-4 mb-4">
            <div className="card card-body">
                <div className="row">
                    <div className="card-content">
                        <h3 className="card-title">
                            {empleado.name}
                            <p className="card-text photo-container">
                                <img 
                                    src={empleado.photo}
                                    alt="Empleado"
                                    className="photo"
                                />
                            </p>
                        </h3>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="card-content mb-4">
                        <p className="card-button">
                            <button
                                className="btn btn-sm btn-dark ms-2"
                                onClick={() => navigate(`/updateEmpleado/${empleado.id}`)}
                            >
                                Actualizar
                            </button>
                        </p>
                    </div>
                </div>
                <p className="card-text">
                    Telefóno: <strong>{empleado.phone}</strong>
                </p>
                <p className="card-text mb-4">
                    Correo: <strong>{empleado.email}</strong>
                </p>
                <Link
                    to={`mailto:${empleado.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-warning"
                >
                    Enviar Email
                </Link>
                <button
                    onClick={() => empleado.id && handleDelete(empleado.id)}
                    className="btn btn-danger my-2"
                >
                    Eliminar Registro
                </button>
            </div>
        </div>
    )
};

export default EmpleadosItem;
