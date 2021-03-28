import React from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { IconButton } from '@material-ui/core';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {theme} from './theme';

const SearchUsers = () => {
    const [isModalOpen_A, setModalState] = React.useState(false);

    const toggleModal_A = () => setModalState(!isModalOpen_A);
    return (
      <ThemeProvider theme={theme}>    
        <div className="search">
            <Autocomplete
              id="searchUsers"
              freeSolo
              options={usersList.map((option) => option.name)}
              renderInput={(params) => (
                  <TextField {...params} label="Cerca utente" variant="outlined" />
              )}
            />
        </div>
      </ThemeProvider>
    )
}

const usersList = [
    { name: 'Gino' },
    { name: 'Silvio' },
    { name: 'Abelarda' },
];

export default SearchUsers;
