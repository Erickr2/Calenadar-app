//slice que tiene mis reducers NOTA: hay que configurar el snippet para crear un slice en mi cuenta de VSC
//como estoy trabajando con toolkit puedo hacer mutaciones en el estado 

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isDateModalOpen: false,
    events: [],
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        //toma la propiedad isDateModalOpen y la cambia a true
        onOpenDateModal: (state) => {
            state.isDateModalOpen = true; 
        },
        //toma la propiedad isDateModalOpen y la cambia a false
        onCloseDateModal: (state) => {
            state.isDateModalOpen = false; 
        }
    },
})

// Action creators are generated for each case reducer function
export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;