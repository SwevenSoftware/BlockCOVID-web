import React from 'react'
/* material-ui/core */
import { ListItemIcon, ListItem } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/core/styles';
/* material-ui/icons */
import PeopleIcon from '@material-ui/icons/People';
import SecurityIcon from '@material-ui/icons/Security';
import WorkIcon from '@material-ui/icons/Work';
import BathtubIcon from '@material-ui/icons/Bathtub';
/* other files */
import {theme} from './theme';

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
