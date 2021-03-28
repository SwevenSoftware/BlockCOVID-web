import React from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { IconButton, ListItemIcon, ListItem } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {theme} from './theme';
import PeopleIcon from '@material-ui/icons/People';
import SecurityIcon from '@material-ui/icons/Security';
import WorkIcon from '@material-ui/icons/Work';
import BathtubIcon from '@material-ui/icons/Bathtub';

const SearchUsers = () => {
    const [isModalOpen_A, setModalState] = React.useState(false);

    const toggleModal_A = () => setModalState(!isModalOpen_A);
    return (
      <ThemeProvider theme={theme}>    
        <div className="counter">
          <ListItem>
            <h3>Account:</h3>
            <ListItemIcon className="spacing"><PeopleIcon className="people"/><Typography className="number" >34</Typography></ListItemIcon> 
            <ListItemIcon className="spacing"><SecurityIcon className="shield"/><Typography className="number">6</Typography> </ListItemIcon>
            <ListItemIcon className="spacing"><WorkIcon className="bag"/><Typography className="number">8</Typography> </ListItemIcon>
            <ListItemIcon className="spacing"><BathtubIcon className="cleaner"/><Typography className="number">10</Typography></ListItemIcon>
          </ListItem>
        </div>
      </ThemeProvider>
    )
}

export default SearchUsers;
