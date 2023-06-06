import { Routes, Route, Navigate } from 'react-router-dom';

import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';


//rutas de mi app
export const AppRouter = () => {

    const authSatus = 'not-authenticated'
    
    return (
        <Routes>
            {/* ternario que revisa si el usuario esta autenticado y conbase en eso muestra las rutas que quiere mostrar */}
            {
                (authSatus === 'not-authenticated')
                    ? <Route path='/auth/*' element={<LoginPage />} />
                    : <Route path='/*' element={<CalendarPage />} /> //cualquier ruta que no sea el auth, muestra calendarApp    
            }

            <Route path='/*' element={<Navigate to="/auth/login" />} /> {/* cualquie ruta que no exista cae en la navegacion a login */}
        </Routes>
    )
}
