import { useEffect } from "react"
import { Link } from "react-router-dom"
import { DropdownList } from "../components/dropdown/DropdownList"
import { FormModal } from "../components/modal/FormModal"
import { NotesContainer } from "../components/notescontainer/NotesContainer"
import { useNotesStore, useUiStore } from "../hooks"
import { useAuthStore } from "../hooks/useAuthStore"



export const MyNotes = () => {

  //auth
  const {startLogout}= useAuthStore();

  //ui store
  const { openModal } = useUiStore();

  //note store
  const { startLoadingNotes, tags, filter, setEmptyFilter } = useNotesStore();

  //set click to open modal
  const onClickOpenModal = (e) => {
      e.preventDefault();
      openModal();
  }

  useEffect(() => {
    startLoadingNotes()
  }, []);

  //Logout
  const onClickLogout = () => {
    startLogout();
    setEmptyFilter()
  }

  return <>
    <div className="d-flex gap-5 justify-content-between">
      <div className="">
        <h1>My Notes</h1>
        <button 
          onClick={onClickOpenModal}
          className="btn btn-outline-primary btn-create m-1">
            Create Note
        </button>
        <Link to="/archived" className="mx-md-5">
          Archived notes
        </Link> 
        <div className="list-container">
          <p className="d-inline-block m-2">Category Filter</p>
          <DropdownList tags={tags} />
        </div>
      </div>
        <button onClick={onClickLogout} className="btn btn-outline-danger btn-sm m-5 btn-logout">
          LogOut
        </button>
    </div>
    <NotesContainer active={true} filter={filter}/>
    <FormModal />
  </>
}
