//para configurar redux hay que instalar reduxtoolkit y react-redux

import {configureStore} from '@reduxjs/toolkit'
import { uiSlice, calendarSlice } from './'



export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        calendar: calendarSlice.reducer,
    }
})