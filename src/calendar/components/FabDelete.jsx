import { useCalendarStore, useUiStore } from '../../hooks'


export const FabDelete = () => {
    
    const { startdeletingEvent, hasEventSelected } = useCalendarStore();
    
    const handleDelete = () => {
        startdeletingEvent();
    };


    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={ handleDelete }
            //ternario para hacer toogle del boton dependiendo si hay una nota seleccionada
            style={{
                display: hasEventSelected ? '': 'none'
            }}
        >
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}
