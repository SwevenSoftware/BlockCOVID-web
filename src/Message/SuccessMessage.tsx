import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

interface State {
   open: boolean,
   message: string,
   severity: Severity,
}

class Message extends Component<{}, State>{

   constructor(props) {
      super(props)
      this.state = {open: false, message: "", severity: Severity.Info}
      this.handleClick = this.handleClick.bind(this);
      this.handleClose = this.handleClose.bind(this);
   }
   
   private handleClick () {
      this.setState({open: true});
   };

   private handleClose (event?: React.SyntheticEvent, reason?: string) {
       if (reason === 'clickaway') {
         return;
      }

      this.setState({open: false});
   };

   public setSeverity (severity: Severity) {
      this.setState({severity});
   }

   public setMessage (message: string) {
      this.setState({message});
   }

   render () {
      return (
         <div>
            <Button variant="outlined" onClick={this.handleClick}>
            Information
            </Button>
            <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
               <Alert onClose={this.handleClose} severity={this.state.severity}>
                  {this.state.message}
               </Alert>
            </Snackbar>
         </div>
      );
   }
}

/* interface Color {

} */

function Alert(props: AlertProps) {
   return <MuiAlert elevation={6} variant="filled" {...props} />;
 }

enum Severity {
   Info = "info",
   Error = "error",
   Warning = "warning",
   Success = "success",
}

export default Message;
export {Severity};