/* react */
import React, {Component} from 'react';
/* redux */
import { connect } from "react-redux"
/* material-ui */
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
/* devexpress */
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
/* styles */
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from '../theme'
import { CalendarProps } from '@material-ui/pickers/views/Calendar/Calendar';

interface CalendarViewProps {
   state: any
   dispatch: any
   data: any
}

interface CalendarViewStates {
   data: any
   currentDate: Date,
   isModalOpen: boolean
}

class CalendarViewComponent extends Component<CalendarViewProps, CalendarViewStates> {
   constructor(props) {
      super(props)
      this.state = {
         data: Appointments,
         currentDate: new Date('2021-01-01T08:00'),
         isModalOpen: false
      }
      this.handleClickOpen = this.handleClickOpen.bind(this)
		this.handleClose = this.handleClose.bind(this)
   }


   render() {
      const { data, currentDate } = this.state;
      return (
         <div>
            <Button
               className = "calendar"
               onClick = {() => this.handleClickOpen()}
            >
               {this.props.data.user.username}
            </Button>
            <Paper>
               <Scheduler
                  data={data}
                  height={660}
               >
                  <ViewState
                     currentDate={currentDate}
                     onCurrentDateChange={this.currentDateChange}
                  />
                  <WeekView
                     startDayHour={9}
                     endDayHour={19}
                  />
                  <Toolbar />
                  <DateNavigator />
                  <TodayButton />
                  <Appointments />
               </Scheduler>
            </Paper>
         </div>
      );
   }

   private currentDateChange(): void {
      this.setState({currentDate: new Date()})
   }

   private handleClickOpen(): void {
		this.setState({ isModalOpen: true })
	}

   private handleClose(): void {
		this.setState({ isModalOpen: false })
	}
}

const mapStateToProps = (state: any) => {
   return {
      state: {
         //ToCheck
         //error: state.calendar.error
      }
   }
}

const mapDispatchToProps = (dispatch: Function) => {
   return {
      dispatch: {
         
      }
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarViewComponent)