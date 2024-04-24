import React, {useEffect, useState} from "react";

import * as EmpleadosServer from './EmpleadosServer';
import EmpleadosItem from './EmpleadosItem';

const EmpleadosLista = () =>{
    const [empleados, SetEmpleados] = useState([]);
    const listaEmpleados = async () =>{
        try {
            const res = await EmpleadosServer.listaEmpleados();
            const data = await res.json();
            console.log(data);
            SetEmpleados(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() =>{
        listaEmpleados();
    },[])

    return(
        <div className="row">
            {empleados.map((empleado) =>(
                <EmpleadosItem key = {empleado.id} empleado = {empleado} listaEmpleados={listaEmpleados} />
            ))}
        </div>
    )
};

export default EmpleadosLista;