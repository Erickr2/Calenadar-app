//alternativa a los thunks: hacer peticiones asincronas 

import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";
import { clearErrorMessage, onCheking, onLogin, onLogout } from "../store";


export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth)//obtengo el estado de mi autenticacion 
    const dispatch = useDispatch(); //despachador de acciones

    //funcion que recibe un obj y de ese obj desestructuro el { email y el pss}
    const startLogin = async({ email, password }) => { 
      dispatch( onCheking() );//pongo la app en un estado de carga 
      //desestrcuturo la dat que tenga de mi peticion { data }
        try {
          const { data } = await calendarApi.post('/auth', { email, password})//peticion axios, ya tiene configurado mi endpoitn y solo le paso el /aut que es al endopint especifico que apunta y sus args email y pass
          localStorage.setItem('token', data.token);//guardo el token en localstorage
          localStorage.setItem('token-init-date', new Date().getTime());//guardo la hora en localstorage
          dispatch( onLogin({ name: data.name, uid: data.uid}));//despacho mi accion para hacer login y le mando los args

        } catch (error) {
          //si hay un error despacho mi reducer onLogout
          dispatch( onLogout('Credenciales incorrectas'));
          //ejecuto un timeout para hcaer la limpieza del error, dentro despacho mi reducer clearErrorMessage
          /* setTimeout(() => {
            dispatch( clearErrorMessage() )
          }, 10); */
        }
    }

  return {
    //propiedades
    status,
    user,
    errorMessage,

    //metodos
    startLogin,
  }
}
