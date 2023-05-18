import { addHours } from 'date-fns';
import { useCalendarStore, useUiStore } from '../../hooks'


export const FabAddNew = () => {
    //extraigo metodos de mis stores 
    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();
    //funcion para controlar mi click de nueva nota, abre el modal
    const handleClickNew = () => {
        //modifica el estado de mi nota a lo que tenga dentro
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#fafafa',
            user: {
                _id: '123',
                name: 'uriBB'
            }
        });
        openDateModal();
    };


    return (
        <button
            className="btn btn-primary fab"
            onClick={handleClickNew}
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
