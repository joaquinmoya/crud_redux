import{
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_ERROR,
    DESCARGA_PRODUCTOS_EXITO,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_ERROR,
    PRODUCTO_ELIMINADO_EXITO,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR

} from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';


//Crear nuevo producto 
export function crearNuevoProductoAction(producto){
    return async (dispatch)=>{
        dispatch(agregarProducto());

        try {
            //Insertar en la api
            await clienteAxios.post('/productos',producto);

            //Si todo sale bien, actualizar el state
            dispatch(agregarProdutoExito(producto));

            //Alerta
            Swal.fire('Correcto','El producto se agrego correctamente','success');
        } catch (error) {
            //Si hay un error, cambiar el state
            dispatch(agregarProductoError(true));
            //Alerta de error
            Swal.fire({
                icon:'error',
                title:'Hubo un error',
                text:'Hubo un error, intente de nuevo'
            })
        }
    }

}
//El dispatch siempre manda a ejecutar las acciones

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload:true
    //Payload seria lo que modifica los datos

})

//Si el producto se guarda en la BD
const agregarProdutoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})
//Si hubo un error
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
});

//funcion que descarga los productos de la bd

export function obtenerProductosAction(){
    return async (dispatch) => {
        dispatch(descargarProductos());

        try {
            const respuesta = await clienteAxios.get('/productos');
            dispatch(descargaProductosExitosa(respuesta.data))
        } catch (error) {
            dispatch(descargaProductoError())
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload:true
});

const descargaProductosExitosa= (productos) => ({
    type:DESCARGA_PRODUCTOS_EXITO,
    payload: productos
});

const descargaProductoError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
});

export function borrarProductoAction(id){
    return async(dispatch) => {
        dispatch(obtenerProductoEliminar(id));

        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch(eliminarProductoExito());
            //Si se elimina con exito, mostrar alerta    
            Swal.fire(
                'Eliminado!',
                'Tu producto fue eliminado',
                'success'
              )
        } catch (error) {
            console.log(error);
            dispatch(eliminarProductoError());
        }
    }
}
const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});

const eliminarProductoExito  = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
});

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload:true
});

//Obtener producto a editar
export function obtenerProductoEditar(producto){
    return(dispatch) => {
        dispatch(obtenerProductoAction(producto))
    }
}

const obtenerProductoAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

//EDITA UN REGISTRO EN LA API Y STATE
export function editarProductoAction(producto){
    return async (dispatch) => {
        dispatch(editarProducto())

        try {
            await clienteAxios.put(`/productos/${producto.id}`,producto);
            dispatch(editarProductoExito(producto));
            
        } catch (error) {
            dispatch(editarProductoError());
        }
    }
}

const editarProducto = () => ({
    type:COMENZAR_EDICION_PRODUCTO
})

const editarProductoExito = producto => ({
    type:PRODUCTO_EDITADO_EXITO,
    payload:producto
})

const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR
});