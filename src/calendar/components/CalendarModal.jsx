import { useEffect, useMemo, useState } from "react";
import { addHours, differenceInSeconds } from "date-fns";

import Swal from 'sweetalert2'; //libreria para crear alertas bonitas
import'sweetalert2/dist/sweetalert2.min.css';

import Modal from "react-modal";
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import { useCalendarStore, useUiStore } from "../../hooks";

//idioma
registerLocale('es',es)

//estilos para centrar mi modal
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root'); //me ayuda a sobreponer el modal en toda la pp

export const CalendarModal = () => {

    //extraigo mi metodo para cerrar el modal
    const { closeDateModal } = useUiStore();
    const { activeEvent } = useCalendarStore();

    const { isDateModalOpen } =  useUiStore();//propiedad para saber si mi modal esta abierto o no
    //estado que me sirve para saber si mi form ya fue ejecutado
    const [formSubmitted, setFormSubmitted] = useState(false)

    //estado para controlar el estado de mi formulario
    const [formValues, setFormValues] = useState({
        title: 'Ercik',
        notes: 'Rodriguez',
        start: new Date(),
        end: addHours(new Date(), 2)
    })

    const titleClass = useMemo(() => {
        if( !formSubmitted ) return ''; //si no se ha mandado mi formulario retorna un string vacio
        //si ya se mando el formulario y el tamaño de mi titulo es mayor a 0 agrega la clase valid, caso contrario invalid
        return( formValues.title.length > 0)
        ? 'is-valid'
        :'is-invalid'

    }, [ formValues.title, formSubmitted]) //memporiza los valores si cambian mis dependencias

    //se va ejecutar cada que cambie el estado de una nota
    useEffect(() => {
        //si mi setActiveEvent es diferente de null, es decir esta activa; modifica los valores y expando los valores de mi setActiveEvent
      if( activeEvent !== null){
        setFormValues({ ...activeEvent})
      }
    
    }, [ activeEvent ])
    

    //funcion oara controlar el cambio de estado de, input, recibo mi evento objetivo modifico los valores y expando lo que ya habia para no sobreescribir y con ayuda de las propiedades computadas recibo llave y valor es este caso, name : valor
    const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDateChanged = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    //funcion para cerra el modal, solo cambia el estado a falso
    const onCloseModal = () => {
        closeDateModal(); //ejecuto mi funcion para cerrar el modal
    }

    //funcion para controlar el submit del form
    const onSubmit = ( event ) => {
        event.preventDefault();
        setFormSubmitted(true);

        const difference = differenceInSeconds(formValues.end, formValues.start); //fuardamos el resultado de la diferencia entre horas que hay en mi fecha inicio y mi fecha fin; la primera es la que evaluamos
        if( isNaN( difference) || difference <= 0 ){ //si mi valor no es numero o es menor a 0 tira error
            Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error')
            return; 
        }

        if(formValues.title.length <= 0) return; //si mi nota esta vacia no hagas nada

        console.log(formValues)
    }

    return (
        <Modal
            isOpen={ isDateModalOpen } //abre mi modal con ayuda de mi funcion
            onRequestClose={ onCloseModal } //cierra el modal con mi funcion de cerrar
            style={ customStyles } //estilos de mi modal
            className="modal" //estilo
            overlayClassName="modal-fondo"
            closeTimeoutMS={ 200 } //teimpo para cerrar
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={ onSubmit }> {/* agregamos el onSubmit que hace referencia a mi funcion onSubmit */}

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker 
                    selected ={ formValues.start} //fecha de inicio
                    onChange={ (event) => onDateChanged(event, 'start')} //control del cambio de estado, manda el evento y el tipo de evento
                    className="form-control"
                    dateFormat="Pp"//agrega la hora a la fecha
                    showTimeSelect //agrega un selector de hora
                    locale="es" //idioma
                    timeCaption="Hora"
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker 
                    minDate={ formValues.start }
                    selected ={ formValues.end }
                    onChange={ (event) => onDateChanged(event, 'end')}
                    className="form-control"
                    dateFormat="Pp"
                    showTimeSelect
                    locale="es"
                    timeCaption="Hora"
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${ titleClass }`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ formValues.title }
                        onChange={ onInputChanged } //funcion que controla mi cambio de estado
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ formValues.notes }
                        onChange={ onInputChanged }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
