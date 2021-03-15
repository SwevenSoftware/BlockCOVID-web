import React from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { IconButton } from '@material-ui/core';

import {Add_Modal} from './Add_Modal'

const SearchUsers = () => {
    const [isModalOpen_A, setModalState] = React.useState(false);

    const toggleModal_A = () => setModalState(!isModalOpen_A);
    return (
        <div className="search">
            <Autocomplete
            id="searchUsers"
            freeSolo
            options={usersList.map((option) => option.name)}
            renderInput={(params) => (
                <TextField {...params} label="Cerca utente" variant="outlined" />
            )}
            />

            <div className='addAccountButton'>
                <IconButton onClick={toggleModal_A}>
                    <AddBoxIcon fontSize="large"/>
                </IconButton>

                <Add_Modal
                    title_A={"Crea uovo profilo"}
                    isOpen_A={isModalOpen_A}
                    onClose_A={toggleModal_A}
                    >
                    Da implementare
                </Add_Modal>
            </div>

        </div>

        
        )
}

const usersList = [
    { name: 'Gino' },
    { name: 'Silvio' },
    { name: 'Abelarda' },
  ];

export default SearchUsers;