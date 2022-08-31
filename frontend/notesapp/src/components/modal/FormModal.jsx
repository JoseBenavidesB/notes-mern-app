import { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import { useNotesStore, useUiStore } from "../../hooks";
import { Tag } from "../tags/Tag";
import './formmodal.css'

//custom style to modal
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

Modal.setAppElement('#root');

export const FormModal = () => {


    //get active modal from store
    const {isModalOpen, closeModal } = useUiStore();

    //to know active note
    const { activeNote, startSavingNote, activeTags, notes, setNoteTags, setActiveTags, setEmptyActiveTags} = useNotesStore();

    //manage input tags 
    const [inputTag, setInputTag] = useState([])

    //form state to set values to sent backend
    const [formValues, setFormValues] = useState({ ...activeNote });

    //effect when active note
    useEffect(() => {
      if ( activeNote !== null) {
        setFormValues({...activeNote})
      }
    }, [activeNote]);

    //effect notes change
    useEffect(() => {
        setNoteTags(notes)
    }, [notes])

    //set values from form
    const onInputChange = ({ target }) =>{
        setFormValues({
            ...formValues,
            [target.name]: target.value,
            tags: activeTags
        })
    };


    //handle input change to get the tag input 
    const handleTapInputChange = ({target}) =>{
        setInputTag(target.value)
    };


    //handle click to add inputTag to store.activeTags
    const handleClick = () => {
            setActiveTags(inputTag)
            
            setFormValues({
                ...formValues,
                tags: activeTags
            });
            setInputTag('')
        
    };
    
    //close modal ouside
    const onCloseModal = () => {
        closeModal();
        setFormValues({}); //clear form values
        setEmptyActiveTags();

    };  

    //close modal click button
    const onClickCloseModal = (e) => {
        e.preventDefault();
        closeModal();
        setFormValues({}); //clear form values
        setEmptyActiveTags();

    };

    //manage form submit
    const onSubmitForm = async(e) => {
        e.preventDefault();
        setFormValues({
            ...formValues,
            tags: activeTags
        })

        //send to backend using hook
        await startSavingNote(formValues);

        //console.log(formValues, 'form values');
        closeModal();
        setFormValues({});
        setEmptyActiveTags();

    };
    
  return (
    <Modal 
        isOpen= { isModalOpen }
        onRequestClose={ onCloseModal }
        style={ customStyles }
        className= "modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={ 200 }
    >
        <div className="modal-container">

        <h1>Create/Edit Note</h1>

<form className="container" onSubmit={onSubmitForm}>
        <div className="form-group row">
            <label className="form-label col-sm-2">Title</label>
            <input 
                type="text"
                className="form control col-sm-10"
                placeholder="Write the title"
                name="title"
                autoComplete="off"
                onChange={onInputChange}
                value={ formValues.title }
            />
        </div>

        <div className="form-group row mb-2 mb-sm-5">
            <label className="form-label col-sm-2">Content</label>
            <textarea
                type="input"
                className="form control col-sm-10 row-10 mt-2"
                placeholder="Write the content"
                name="content"
                autoComplete="off"
                onChange={onInputChange}
                value={ formValues.content }
            ></textarea>
        </div>

        <div className="form-2">
                <div className="form-group row mb-2 mb-sm-5">
                    <label className="form-label col-sm-2">Categories</label>
                    <div className="tags-container d-flex flex-wrap ">
                        {
                            (activeTags.length > 0) ? activeTags.map( (tagN, idx) => { return <Tag tag={tagN} idx={idx}/>} ) : ''
                        }
                    </div>

                    <label className="form-label col-sm-2"></label>
                        <div className="d-flex justify-content-end gap-2">
                            <input  
                                    type="text"
                                    className="col-sm-7"
                                    placeholder="write category name"
                                    name="tags"
                                    value = { inputTag }
                                    autoComplete="off"
                                    onChange={ handleTapInputChange }
                                />

                            <p onClick={ handleClick } className="btn btn-success col-sm-3 mb-0">Add</p>
                        </div>
                </div>  
        </div>

        <div className=" d-flex gap-2 flex-row-reverse">
            <button 
                className="btn btn-outline-danger"
                onClick={onClickCloseModal}
            >
                Cancel
            </button>

            <button 
                type="submit"
                className="btn btn-primary"
            >
                Save
            </button>
        </div>

    </form>

        </div>
    </Modal>
  )
}
