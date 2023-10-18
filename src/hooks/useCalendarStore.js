import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
  const dispatch = useDispatch();

  //extraigo los eventos de mi estado
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth); //obtengo el user que esta guardado en mi estado

  //funcion para activar una nota, recibo un parametro y despacho mi reducer onSetActiveEvent y le mando el parametro que recibo
  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };
  //fucnion para inciar a guardar una nota
  const startSavingEvent = async (calendarEvent) => {
    try {
      //todo ok, si tengo un id en el evento significa que estoy actualizando una nota
      if (calendarEvent.id) {
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent); //servicio para actualizar, mando id y la data del evento
        //expando para asegurarme que se rompe la referencia y mando un nuevo objeto
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }
      //si no tengo id significa que voy a crear una nueva, por lo que despacho la funcion onAddNewEvent de mi store y le mando un id fictisio; esto se quita cuando ya tenga back
      const { data } = await calendarApi.post("/events", calendarEvent);
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user })); //le mando el evento, el id del evento y el usuario que creo la nota(usuario logeado)
    } catch (error) {
        console.log('error', error);
        Swal.fire('Error al guardar', 'No tienes privilegios para editar este evento', 'error');
    }
  };
  //despacho el reducer de mi slice
  const startdeletingEvent = async() => {
    try {
      const {data} = await calendarApi.delete(`events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
      Swal.fire('Evento eliminado', 'Se elimino correctamente el evento', 'success');
    } catch (error) {
      console.log('este es el error: ', error)
      Swal.fire('Error al eliminar', 'No tienes privilegios para eliminar este evento', 'error');

    }
  };

  const startloadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events"); //peticion
      const events = convertEventsToDateEvents(data.eventos); //convierto a fecha js
      dispatch(onLoadEvents(events)); //despacho funcion de crag de eventos y le mando los eventos ya con la fecha js
    } catch (error) {
      console.log("Error en carga de eventos", error);
    }
  };

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
    startloadingEvents,
  };
};
