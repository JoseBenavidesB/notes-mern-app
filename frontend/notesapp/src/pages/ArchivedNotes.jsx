import { useEffect } from "react";
import { Link } from "react-router-dom";
import { NotesContainer } from "../components/notescontainer/NotesContainer"
import { useNotesStore } from "../hooks";
import { FormModal } from "../components/modal/FormModal"
import { useAuthStore } from "../hooks/useAuthStore";
import { DropdownList } from "../components/dropdown/DropdownList";


export const ArchivedNotes = () => {
  
  //auth store
  const {startLogout} = useAuthStore();

  //Notes store
  const { startLoadingNotes, setEmptyFilter, filter, tags } = useNotesStore();

  useEffect(() => {
    startLoadingNotes()
  }, []);

  //Logout
  const onClickLogout = () => {
    startLogout();
    setEmptyFilter()
  }

  return (
    <>
      <div className="d-flex gap-5 justify-content-between">
        <div className="">
          <h1 className="mt-2">Archived Notes</h1>
          <Link
            to="/"
          >
            <i className="fa-solid fa-angle-left"></i>Go back to <strong>My Notes</strong>
          </Link>
          <div className="list-container mt-2">
            <p className="d-inline-block m-2">Category Filter</p>
            <DropdownList tags={tags} className=""/>
          </div>
        </div>
        <button onClick={onClickLogout} className="btn btn-outline-danger btn-sm m-5 btn-logout">
          LogOut
        </button>
      </div> <hr/>

      <NotesContainer active={false} filter={filter} />
      <FormModal />
    </>
  )
}
