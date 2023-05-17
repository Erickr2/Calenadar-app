
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
        }
    },
})
// Action creators are generated for each case reducer function
export const { onSetActiveEvent } = calendarSlice.actions;