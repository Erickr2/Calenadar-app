//para configurar redux hay que instalar reduxtoolkit y react-redux

import {configureStore} from '@reduxjs/toolkit'
import { uiSlice, calendarSlice, authSlice } from './'



export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        calendar: calendarSlice.reducer,
        auth: authSlice.reducer
    },
    //para que no revise si las fechas se puede serializar
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})