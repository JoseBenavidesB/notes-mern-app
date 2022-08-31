import { useNotesStore } from '../../hooks';
import './tag.css'


export const Tag = ({tag, idx}) => {

  const { setDeleteTag } = useNotesStore();

  const handleClick = () => {
    setDeleteTag(tag)
  }
  return (
    <p key={idx} className="mx-2"><i className="fa-solid fa-tag"></i>{tag} <span onClick={handleClick}><i className="fa-solid fa-xmark btn-del"></i></span></p>
  )
}
