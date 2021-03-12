import React from 'react'
import { Button } from "@material-ui/core"
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {saveAs} from 'file-saver'
import Token from './Token'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
        margin: `1em auto 1em auto`
    }
  })
);

const SearchUsers = () => {
    const classes = useStyles();

    {/* const generateReport = () => {
        const token : string | undefined = Token.get()?.toString()
        if(token)
            fetch('/api/admin/report', {
                method: 'POST',
                headers: { 'Authorization': token }
            }).then((res) => {
                if (res.ok) { 
                    return res.blob().then(blob => {
                        const name = 'Report.pdf';
                        saveAs(blob, name);
                    });
                }
            })
    } */}

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