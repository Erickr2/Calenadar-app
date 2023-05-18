import { useDispatch, useSelector } from "react-redux"
import {  onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";


export const useCalendarStore = () => {

    const dispatch = useDispatch();

    //extraigo los eventos de mi estado
    const { events, activeEvent } = useSelector( state => state.calendar);

    //funcion para activar una nota, recibo un parametro y despacho mi reducer onSetActiveEvent y le mando el parametro que recibo
    const setActiveEvent = ( calendarEvent ) => {
        dispatch(onSetActiveEvent( calendarEvent ));
    };
    //fucnion para inciar a guardar una nota
    const startSavingEvent = async( calendarEvent ) => {
        //TODO llegar al back

        //todo ok, si tengo un id en el ecento significa que estoy actualizando una nota
        if( calendarEvent._id ){
            //expando para asegurarme que se rompe la referencia y mando un nuevo objeto
            dispatch(onUpdateEvent({ ...calendarEvent }));
        } else {
            //si no tengo id significa que voy a crear una nueva, por lo que despacho la funcion onAddNewEvent de mi store y le mando un id fictisio; esto se quita cuando ya tenga back
            dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
        }
    }
    //despacho el reducer de mi slice
    const startdeletingEvent = () => {
        dispatch(onDeleteEvent())
    }
  
    //expongo mis propiedades y metodos a toda la app
    return {
        //propiedades 
        events, 
        activeEvent,
        hasEventSelected: !!activeEvent, //si es null regresa falso, si hay objeto true me ayuda a saber si hay una nota seleccionada

        //metodos
        setActiveEvent,
        startSavingEvent,
        startdeletingEvent,
    }
}
