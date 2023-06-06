import {Provider} from 'react-redux'
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router";
import { store } from './store';


//contiene las rutas de mi app, que se encuentran en AppRouter

export const CalendarApp = () => {
  return (
    <Provider store={store}> {/* utilizo el store en el punto mas alto de mi app y le indico cual es mi store, de esta manera puedo acceder al estado global de mi app */}
    <BrowserRouter>
    <AppRouter />
    </BrowserRouter>
    </Provider>
  )
}

