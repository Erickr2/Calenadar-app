import React from 'react';
import ReactDOM from 'react-dom/client';
import {CalendarApp} from './CalendarApp';
import './styles.css';

//punto maximo de la app, renderiza el calendarApp
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <CalendarApp />
 
);

