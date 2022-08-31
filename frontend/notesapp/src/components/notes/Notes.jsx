import { useEffect } from "react";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';
import { useNotesStore, useUiStore } from '../../hooks';
import { useAuthStore } from "../../hooks/useAuthStore";


import './notes.css'

export const Notes = ({note}) => {

    const { _id, title, lastEdited, active, content } = note;

    //use the store
    const { setActiveNote, startDeleteNote, setArchived, setUnArchived, setActiveTags} = useNotesStore();

    //use uiStore
    const { openModal } = useUiStore();

    //Active note
    const onClickEdit = () => {
      setActiveNote(note)
      setActiveTags(note.tags)
      openModal();

    };

    //Archived note
    const onClickArchived = (_id, title) => {
      setArchived(_id, title)
    };

    //delete note
    const onClickDelete = (_id) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
           startDeleteNote(_id);
        }
      })
    };

    // restore notes
    const onClickRestore = (_id, title) => {
        setUnArchived(_id, title)
    };

  return (
    <div key={_id} className="col-md-5 col-lg-4 col-xl-3 border m-1 p-1">
        <h4>{ title }</h4> <hr/>
        <div className="d-flex justify-content-between">
            <div className="content-p">
              <p className='col-9 d-block'><strong>Content</strong>: { content }</p>
              <p className='col-9 d-block'><strong>Last edited</strong>: { lastEdited }</p>
            </div>
            <div className="button-edit">
              {
                (active) ? (<h5 className='col-1 button' onClick={() => onClickArchived(_id, title)}><i className="fa-solid fa-box-archive"></i></h5>)
                  :<h5 className='col-1 button' onClick={() => onClickRestore(_id, title)}><i className="fa-solid fa-upload"></i></h5>
              }
              <h5 className='col-1 button' onClick={onClickEdit}><i className="fa-solid fa-pen"></i></h5>
              <h5 className='col-1 button' onClick={() => onClickDelete(_id)}><i className="fa-solid fa-trash-can"></i></h5>
            </div>
        </div>
    </div>
  )
}

