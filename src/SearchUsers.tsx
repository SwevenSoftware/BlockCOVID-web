import React from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const SearchUsers = () => {
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
        </div>
        )
}

const usersList = [
    { name: 'Gino' },
    { name: 'Silvio' },
    { name: 'Abelarda' },
  ];

export default SearchUsers;