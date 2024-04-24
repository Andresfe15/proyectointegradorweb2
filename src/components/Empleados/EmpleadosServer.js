

const API_URL = 'http://localhost/mi-proyecto/api.php/';

export const listaEmpleados = async () =>{
    return await fetch(API_URL);
};

export const getEmpleado = async (empleadoId) =>{
    return await fetch (`${API_URL}${empleadoId}`)
};

export const eliminarEmpleado = async (empleadoId) =>{
    return await fetch(`${API_URL}${empleadoId}`,{
        method: 'DELETE',
    })
};

export const registrarEmpleado = async (nuevoEmpleado) =>{
    return await fetch(API_URL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            name: String(nuevoEmpleado.name).trim(),
            email: String(nuevoEmpleado.email).trim(),
            phone: String(nuevoEmpleado.phone).trim(),
        }),
    });
};

export const actualizarEmpleado = async (empleadoId, actualizarEmpleado) =>{
    return await fetch(`${API_URL}${empleadoId}`, {
        method : 'PUT',
        headers : {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            name: String(actualizarEmpleado.name).trim(),
            email: String(actualizarEmpleado.email).trim(),
            phone: String(actualizarEmpleado.phone).trim(),
        }),
    });
};