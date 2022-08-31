
import { useState } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap'
import { useNotesStore } from '../../hooks';

export const DropdownList = ( { tags = [] } ) => {
  
    const [dropdown, setDropdown] = useState(false);

    const { setFilterTag, filter } = useNotesStore()

    const openCloseDropdown = () => {
        setDropdown(!dropdown)
    };

    const testClick = (value) => {
        setFilterTag(value)
    };

    const onClickDefault = () => {
        setFilterTag(false)
    }

    return (
    <>
        <Dropdown isOpen={dropdown} toggle={openCloseDropdown} className="mb-1 d-inline-block">
            <DropdownToggle caret>
                {
                    (filter.length > 0) ? filter : 'Select category'
                }
            </DropdownToggle>

            <DropdownMenu>
                <DropdownItem onClick={onClickDefault}>Reset</DropdownItem>
                <DropdownItem divider/>
                    {
                        (tags.length > 0) ? tags.map( (tag, idx) => {
                            return <DropdownItem onClick={() => {testClick(tag)}} key={idx}>{tag}</DropdownItem>
                        }) : ''
                    }
            </DropdownMenu>
        </Dropdown>
    </>
  )
}
