import { useDispatch, useSelector } from "react-redux"
import { onCloseModal, onOpenModal } from "../store";
import { useNotesStore } from "./useNotesStore";


export const useUiStore = () => {
    
    const dispatch = useDispatch();

    const { isModalOpen } = useSelector( state => state.ui )

    const { setDisableNote } = useNotesStore()

    //Open modal
    const openModal = () => {
        dispatch( onOpenModal() )
    };

    //close modal
    const closeModal = () => {
        dispatch( onCloseModal() )
        setDisableNote();
    };


    return {
        //properties
        isModalOpen,

        //methods
        openModal,
        closeModal
    }
}
