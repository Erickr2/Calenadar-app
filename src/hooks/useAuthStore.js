//alternativa a los thunks: hacer peticiones asincronas 

import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";
import { clearErrorMessage, onCheking, onLogin, onLogout, onLogoutCalendar } from "../store";


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
          setTimeout(() => {
            dispatch( clearErrorMessage() )
          }, 10);
        }
    }


    
    const startRegister = async({email, password, name}) => {
      dispatch(onCheking());

      try {
        const {data} = await calendarApi.post('/auth/new', { email, password, name})
        localStorage.setItem('token', data.token);//guardo el token en localstorage
        localStorage.setItem('token-init-date', new Date().getTime());//guardo la hora en localstorage
        dispatch( onLogin({ name: data.name, uid: data.uid}));
      } catch (error) {
        console.log(error)
        console.log(error.response.data)
        dispatch( onLogout(error.response.data?.mssg || ''));
          setTimeout(() => {
            dispatch( clearErrorMessage() )
          }, 10);
      }
    }


    const  checkAuthToken = async() => {
      //obtengo token y verifico que exista, sino despacha logout
      const token = localStorage.getItem('token'); 
      if(!token) return dispatch( onLogout() );

      try {
        //consumo servicio y espero data 
        const {data} = await calendarApi.get('auth/renew')
        localStorage.setItem('token', data.token);//guardo el token en localstorage
        localStorage.setItem('token-init-date', new Date().getTime());//guardo la hora en localstorage
        dispatch( onLogin({ name: data.name, uid: data.uid})); //despacho login 
        
      } catch (error) {
        localStorage.clear();
        dispatch( onLogout() );
      }
    }

    //limpio el storage para borrar token y despacho logout
    const startLogout = () => {
      localStorage.clear();
      dispatch( onLogoutCalendar() );
      dispatch( onLogout() );
    }



  return {
    //propiedades
    status,
    user,
    errorMessage,

    //metodos
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout

  }
}
