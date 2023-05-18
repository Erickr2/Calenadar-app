
import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';


const tempEvent = {
    _id: new Date().getTime(),
    title: 'cumple del jefe',
    notes: 'hay que comprar el pastel',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'uriBB'
    }
}

const initialState = {
    events: [
        tempEvent
    ],
    activeEvent: null,
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        //de mi action, desestrcuturo el payload
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload; //modifico lo que hay en activeEvent por lo que venga en mi payload
        },
        onAddNewEvent: ( state, {payload} ) => {
            //inserto en mis events lo que reciba en el payload
            state.events.push( payload );
            //desactivo la nota ya que voy a esperar otra
            state.activeEvent = null
        },
        onUpdateEvent: ( state, { payload}) => {
            //modifico mis eventos; recorro los eventos que tengo  
            state.events = state.events.map( event => {
                //si el id de uno de mis eventos es igual al de mi payload
                if( event._id === payload._id){
                    //retorno lo que hay en el payload que es la actualizacion de mi nota
                    return payload
                }
                //caso contrario regreso mis eventos; event ya que es lo que tomo como arg en mi map
                return event //el return es un nuevo estado
            })
        },
        onDeleteEvent: ( state ) => {
            //si hay una nota activa, con este if controlo el boton para no disparar la accion
            if( state.activeEvent){
                //trae todos los eventos que sean diferentes al de la nota activa
                state.events = state.events.filter( event => event._id !== state.activeEvent._id);
                //ponemos el activeEvent en null ya que no tenemos ninuga nota activa 
                state.activeEvent = null;
            }
        }
    },
})
// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;