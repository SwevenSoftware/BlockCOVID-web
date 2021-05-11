/* react */
import React, { Component, createRef, RefObject } from "react";

/* redux */
import { connect } from 'react-redux'

/* material-ui/core */
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { ThemeProvider } from "@material-ui/styles";
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';

/* other files */
import DotGrid from "../DotGrid";
import { theme } from '../theme';

interface CardGridProps {
    state: any,
    dispatch: any
}

interface CardGridState {
   width: number | null;
   height: number | null;
}

class CardGridComponent extends Component<CardGridProps, CardGridState> {
   dispGrid: RefObject<HTMLDivElement>;
   dotGrid: RefObject<DotGrid>;
   setGrid: CardGridState;
   constructor(props) {
       super(props);
       this.dispGrid = createRef<HTMLDivElement>();
       this.dotGrid = createRef<DotGrid>();
       this.setGrid = {
           width: null,
           height: null
       };
       this.resetGrid = this.resetGrid.bind(this)
   }

   render() {
      return (
          <div>
              <div className="gridInline">
                  <ThemeProvider theme={theme}>
                      <Card>
                          {/* <CardHeader className="headerCard" title="New room"/> */}
                          <CardContent ref={this.dispGrid} className="dispGrid">
                              <DotGrid ref={this.dotGrid} width={this.setGrid.width || 0} />
                          </CardContent>
                      </Card>
                  </ThemeProvider>
              </div>
              <div className="buttonInline">
                  <DialogContentText>
                      <Typography>Seleziona un posto</Typography>
                      <Typography>Premi su "Salva" per prenotarlo</Typography>
                      <Typography>Premi su "Annulla" per rimuovere la selezione</Typography>
                  </DialogContentText>
                  <div className="buttonGrid">
                      <Button id="confirm" variant="outlined" size="medium">
                          Salva
          </Button>
                  </div>
                  <div className="buttonGrid">
                      <Button id="decline" variant="outlined" size="medium" onClick={this.resetGrid}>
                          Annulla
          </Button>
                  </div>
              </div>
          </div>
      );
   }

   componentDidMount() {
      if (this.dispGrid.current && this.dotGrid.current) {
          this.dotGrid.current.setSize(
              this.dispGrid.current.clientWidth,
              this.dispGrid.current.clientHeight
          );
      }
   }

   private resetGrid() {
      this.dotGrid.current?.resetView();
   }

}

const mapStateToProps = (state) => {
    return {
        state: {
            cardGrid: state.cardGrid
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: {
            cardGrid: (data) => {
                //dispatch(cardGrid(data));
            }
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardGridComponent)