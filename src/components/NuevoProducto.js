import React,{useState} from 'react';
import {crearNuevoProductoAction} from '../actions/productoActions';
import {useDispatch, useSelector} from 'react-redux';
import {mostrarAlerta, ocultarAlertaAction}from '../actions/alertaActions';

//Explicacion breve de como funciona redux
//Definimos los types que va a describir lo que pasa en la aplicacion, despues en el action vamos a tener una funcion que se tiene que utilizar
//en el componente, los datos de componente se pasan a esas acciones utilizando dispatch para ejecutar esas acciones y en el action es donde
// se hacen todas las incersiones a la BD o mandar a ejecutar el reducer para modificar el state


const NuevoProducto = ({history}) => {


//State del componente
//Como solo se va a quedar aqui y no se va a pasar a otros componentes
const [nombre,guardarNombre] = useState('');
const [precio,guardarPrecio] = useState(0);


//Utilizar useDispatch y te crea una funcion

const dispatch = useDispatch();

//UseSelecto es el hook que nos da react-redux para leer lo que tengamos en el state
//Acceder al state del store
const cargando = useSelector(state => state.productos.loading);
const error = useSelector(state => state.productos.error);
const alerta = useSelector(state => state.alerta.alerta);

//manda a llamar el action de productoAction
const agregarProducto = (producto) => dispatch(crearNuevoProductoAction(producto));

//cuando el usuario haga submit
const submitNuevoProducto = e => {
    e.preventDefault();

    //validar formulario
    if(nombre.trim() === '' || precio <= 0){
        const alerta = {
            msg:'Ambos campos son obligatorios',
            classes:'alert alert-danger text-center text-uppercase p3'
        }
        dispatch(mostrarAlerta(alerta));
        return;
    }
    //si no hay errores
    dispatch(ocultarAlertaAction());
    //crear el nuevo producto
    agregarProducto({
        nombre,
        precio
    });

    //Redireccionar a componente principal
    history.push('/');
}


    return( <div className='row justify-content-center'>
        <div className='col-md-8'>
            <div className='card'>
                <div className='card-body'>
                    <h2 className='text-center mb-4 font-weight-bold'>Agregar Nuevo Producto</h2>
                        {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}
                    <form
                    onSubmit={submitNuevoProducto}
                    >
                        <div className='form-group'>
                            <label>Nombre Producto</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Nombre Producto'
                                name='nombre'
                                value={nombre}
                                onChange={e => guardarNombre(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Precio Producto</label>
                            <input
                                type='number'
                                className='form-control'
                                placeholder='Precio Producto'
                                name='precio'
                                value={precio}
                                onChange={e => guardarPrecio(Number(e.target.value) )}
                            />
                        </div>
                        <button type='submit' className='btn btn-primary font-weight-bold text-uppercase d-block w-100'>Agregar</button>
                    </form>
                    {cargando ? <p>Cargando..</p>:null}
                    {error ? <p className='alert alert-danger p2 mt-4 text-center'>Hubo un error</p>:null}
                </div>
            </div>
        </div>
    </div>)
}

export default NuevoProducto;