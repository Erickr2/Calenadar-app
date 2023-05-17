//en esta custom hook tengo todo lo necesario para despachar mis acciones y obtener la data de mi selector, dee sta manera me evito hacer tanas importaciones, llamar dispathcs, etc

import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store";

export const useUiStore = () => {

    const dispatch = useDispatch();

    //obtengo el isDateModalOpen de mi estado 
    const { isDateModalOpen } = useSelector( state => state.ui);
   
    //funcion que despacha mi reducer onOpenDateModal que cambia el estado a true que provoca que abra el modal
    const openDateModal = () => {
        dispatch( onOpenDateModal() )
    }

    //funcion que despacha mi reducer onCloseDateModal que cambia el estado a flase que provoca que cierra el modal
    const closeDateModal = () => {
        dispatch( onCloseDateModal() )
    }

    const toggleDateModal = () => {
        (isDateModalOpen)
        ? onOpenDateModal()
        : onCloseDateModal();
    }

    //retorno la propiedades y mis metodos
    return {
        //propiedades
        isDateModalOpen,

        // metodos
        openDateModal,
        closeDateModal,
        toggleDateModal,

    }
}
