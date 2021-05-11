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
    dispatch: any,
    mode: string,
    data: any
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
        console.log(this.props.mode)
        switch (this.props.mode) {
            case 'mod':
                return (
                    <div>
                        <div className="gridInline">
                            <ThemeProvider theme={theme}>
                                <Card>
                                    <CardContent ref={this.dispGrid} className="dispGrid">
                                        <DotGrid ref={this.dotGrid} width={this.setGrid.width || 0} />
                                    </CardContent>
                                </Card>
                            </ThemeProvider>
                        </div>
                    </div>
                );
                break;
            case 'del':
                return (
                    <div>
                        <div className="gridInline">
                            <ThemeProvider theme={theme}>
                                <Card>
                                    <CardContent ref={this.dispGrid} className="dispGrid">
                                        <DotGrid ref={this.dotGrid} width={this.setGrid.width || 0} />
                                    </CardContent>
                                </Card>
                            </ThemeProvider>
                        </div>
                    </div>
                );
                break;
            default:
                return (
                    <div>
                        <div className="gridInline">
                            <ThemeProvider theme={theme}>
                                <Card>
                                    <CardContent ref={this.dispGrid} className="dispGrid">
                                        <DotGrid ref={this.dotGrid} width={this.setGrid.width || 0} />
                                    </CardContent>
                                </Card>
                            </ThemeProvider>
                        </div>
                    </div>
                );
        }

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