import { useDispatch, useSelector } from "react-redux"
import { onSetActiveEvent } from "../store";


export const useCalendarStore = () => {

    const dispatch = useDispatch();

    //extraigo los eventos de mi estado
    const { events, activeEvent } = useSelector( state => state.calendar);

    //funcion para activar una nota, recibo un parametro y despacho mi reducer onSetActiveEvent y le mando el parametro que recibo
    const setActiveEvent = ( calendarEvent ) => {
        dispatch(onSetActiveEvent( calendarEvent ));
    };
  
    //expongo mis propiedades y metodos a toda la app
    return {
        //propiedades 
        events, 
        activeEvent,

        //metodos
        setActiveEvent,
    }
}
