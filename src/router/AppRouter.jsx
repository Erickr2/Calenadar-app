import { Routes, Route, Navigate } from "react-router-dom";

import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";

//rutas de mi app
export const AppRouter = () => {
  /* const authSatus = 'not-authenticated' */
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") {
    return <h3>Cargando...</h3>;
  }

  return (
    <Routes>
      {/* ternario que revisa si el usuario esta autenticado y conbase en eso muestra las rutas que quiere mostrar */}
      {
        status === "not-authenticated" ? (
          <>
            <Route path="/auth/*" element={<LoginPage />} />
            <Route path="/*" element={<Navigate to="/auth/login" />} />
          </>
        ) : (
            <>
          <Route path="/" element={<CalendarPage />} /> {/* cualquier ruta que no sea el auth, muestra calendarApp */}
          <Route path="/*" element={<Navigate to="/" />} />
            </>
        ) 
      }
    </Routes>
  );
};
