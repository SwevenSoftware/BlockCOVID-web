import React from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { IconButton, ListItemIcon, ListItem } from '@material-ui/core';

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
        <div className="search">
            <ListItem>
              <p className="counter">Account:</p>
              <ListItemIcon className="spacing"><PeopleIcon className="people"/><p className="number">34</p></ListItemIcon> 
              <ListItemIcon className="spacing"><SecurityIcon className="shield"/><p className="number">6</p> </ListItemIcon>
              <ListItemIcon className="spacing"><WorkIcon className="bag"/><p className="number">8</p> </ListItemIcon>
              <ListItemIcon className="spacing"><BathtubIcon className="cleaner"/><p className="number">10</p></ListItemIcon>
            </ListItem>
        </div>
      </ThemeProvider>
    )
}

export default SearchUsers;
