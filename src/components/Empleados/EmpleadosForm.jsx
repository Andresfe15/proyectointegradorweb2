import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import * as EmpleadosServer from './EmpleadosServer';

const EmpleadosForm = () => {
    const navigate = useNavigate();
    const params = useParams();
    const initialState = { id:0, name: '', email: '', phone: ''};
    const [empleado,  setEmpleado] = useState(initialState);
    const handleChange = (event) =>{
        setEmpleado({...empleado, [event.target.name]: event.target.value})
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            let res;
            if (!params.id) {
                res = await EmpleadosServer.registrarEmpleado(empleado);
                const data = await res.json();
                if (data.message === 'Succes'){
                    setEmpleado(initialState);
                }
            }else{
                res = await EmpleadosServer.actualizarEmpleado(params.id, empleado);
            }
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    const getEmpleado = async (empleadoId) =>{
        try {
            let res;
            res = await EmpleadosServer.getEmpleado(empleadoId);
            const data = await res.json();
            const { name, email, phone } = data;
            setEmpleado({ name, email, phone})
        } catch (error) {
            console.log(error);
        }
    }

    useEffect (() =>{
        if (params.id) {
            getEmpleado(params.id);
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className="col-md-3 mx-auto">
            <h2 className="mb-3 text-center">Empleado</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label className='form-label'>Nombre:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        minLength="2"
                        maxLength="50"
                        autoFocus
                        required
                        value={empleado.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Correo  electrónico:</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        maxLength="100"
                        required
                        value={empleado.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Teléfono:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="phone"
                        required
                        value={empleado.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className="d-grid gap-2">
                    {params.id ? (
                        <button type="submit" className='btn btn-dark btn-block'>
                            Actualizar
                        </button>
                    ) : (
                        <button type="submit" className="btn btn-danger btn-block">
                            Registrar
                        </button>
                    )} 
                </div>
            </form>
        </div>
    )
};

export default EmpleadosForm;