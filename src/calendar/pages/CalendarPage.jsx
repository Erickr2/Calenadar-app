import { useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "../"

import { getMessages, localizer } from '../../helpers';
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks';


//pagina del calendario, recibe mi componente navbar
export const CalendarPage = () => {

  const { openDateModal } = useUiStore(); //extraigo el metodo openDateModal
  const { events, setActiveEvent, startloadingEvents } = useCalendarStore(); //extraigo la propiedad events de mi calendar store
  const { user } = useAuthStore();

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week') //mi estado inicial es lo que hay en mi localstorage, si no hay nada el valor por defecto es week

  const eventStyleGetter = (event, start, end, isSelected) => {

    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid); 

    const style = {
      backgroundColor: isMyEvent ? '#F472DB' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  };

  const onDoubleClick = (event) => {
    openDateModal(); //funcion que abre el modal
  }

  const onSelect = (event) => {
    setActiveEvent( event ); //ejecuto mi funcion y le mando el evento que recibo
  }
  //cuando la vista cambia modifica el localstorage y cambia la prop lastview con la que recibe en el evento
  const onViewChange = (event) => {
    localStorage.setItem('lastView', event)
    setLastView(event)
  }

  //cuando carga la vista del calendar me traigo mis eventos con la funcion startloadingEvents
  useEffect(() => {
    startloadingEvents();
  }, [])
  

  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        localizer={localizer} //se creo un helper que me ayuda a definir la configuracion para no sobrcargar el componenete
        events={events} //paso como referencia los eventos de mi estado
        defaultView={lastView} //obtenemos lo que hay en el localstorage, que es la info de la ultima vista
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessages()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
      />

      <CalendarModal /> {/* componente de la ventana que se abre en mi calendario  */}
      <FabAddNew /> {/* componenete(boton) para agregar una nueva actividad */}
      <FabDelete />
    </>
  )
}
