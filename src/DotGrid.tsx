/* react */
import React, { Component, createRef, RefObject } from "react";
/* materia ui */
import DialogContentText from '@material-ui/core/DialogContentText'
import FormLabel from '@material-ui/core/DialogContentText'
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import DialogContent from '@material-ui/core/DialogContent'

/* other files */
import Grid from "./Grid";

interface Pos2d {
    x: number;
    y: number;
}

interface Settings {
    radius: number;
    width: number;
    height: number;
    mode: string;
    dim: number;
}

interface DotGridProps {
    mode: string;
    sizeH: number;
    sizeW: number;
    openingTime: string;
    closingTime: string;
    weekDays: string[];
}

class DotGrid extends Component<DotGridProps> {
    canvasRef: RefObject<HTMLCanvasElement>;
    gridSettings: Settings;
    mousePos: Pos2d;
    selection: {
        started: boolean;
        ended: boolean;
        posStart: Pos2d;
        posEnd: Pos2d;
    };
    grid: Grid;
    constructor(props) {
        super(props);
        this.canvasRef = createRef<HTMLCanvasElement>();
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.checkBox = this.checkBox.bind(this);

        this.mousePos = { x: -10, y: -10 };
        this.selection = {
            started: false,
            ended: false,
            posStart: { x: 0, y: 0 },
            posEnd: { x: 0, y: 0 }
        };
        this.gridSettings = {
            radius: 2,
            width: (props.sizeW + 1) * 30,
            height: (props.sizeH + 1) * 30,
            mode: props.mode,
            dim: 30
        };

        /* let dim
        if (this.props.sizeW < this.props.sizeH) {
            dim = this.props.sizeH
        } else {
            dim = this.props.sizeW
        } */

        this.grid = new Grid(2, 10);                //DEBUG
    }

    public setSize(width: number, height: number) {
        this.canvasRef.current?.setAttribute("width", width.toString());
        this.canvasRef.current?.setAttribute("height", width.toString());
    }

    componentDidMount() {
        setTimeout(() => this.updateCanvas(), 100);
    }

    handleMouseMove(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
        if (this.mousePos.x !== e.clientX || this.mousePos.y !== e.clientY) {
            this.mousePos = {
                x: e.clientX,
                y: e.clientY
            };
            this.updateCanvas();
        }
    }

    checkBox(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
        const boundRect: DOMRect | undefined = this.canvasRef.current?.getBoundingClientRect();
        if (!boundRect) return;
        const pointPos: Pos2d = {
            x:
                Math.floor((e.clientX - boundRect.x) / this.gridSettings.dim) *
                this.gridSettings.dim +
                this.gridSettings.dim / 2 +
                this.gridSettings.radius,
            y:
                Math.floor((e.clientY - boundRect.y) / this.gridSettings.dim) *
                this.gridSettings.dim +
                this.gridSettings.dim / 2 +
                this.gridSettings.radius
        };
        if (pointPos.x > this.gridSettings.width - this.gridSettings.dim || pointPos.y > this.gridSettings.height - this.gridSettings.dim) return;
        const id: number | null = this.grid.addDesk(pointPos.x, pointPos.y);
        //if (id && pointPos.x < 100 && pointPos.y < 100) this.grid.setInUse(id, true); // debug
        this.updateCanvas();
    }

    checkDistance(mouse: number, point: number, step: number, dim: number): boolean {
        if (mouse / dim >= 1 - step / dim || mouse < point)
            return false;
        return mouse - point < step;
    }

    private static drawDesk(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        radius: number,
        inUse: boolean
    ) {
        ctx.beginPath();
        ctx.arc(x, y, radius * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = "lightgrey";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        if (inUse) ctx.fillStyle = "orange";
        else ctx.fillStyle = "green";
        ctx.fill();
        ctx.closePath();
    }

    public resetView() {
        this.grid.clearDesks();
        this.updateCanvas();
    }

    updateCanvas() {
        const canvas: HTMLCanvasElement | null = this.canvasRef.current;
        if (!canvas) return;
        const canvasRect: DOMRect = canvas.getBoundingClientRect();
        const ctx: CanvasRenderingContext2D | undefined | null = this.canvasRef.current?.getContext(
            "2d"
        );
        if (!ctx) return;

        const dim: number = this.gridSettings.dim;

        const radius: number = this.gridSettings.radius;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var x: number = radius; x <= canvas.width - radius; x += dim) {
            for (var y: number = radius; y <= canvas.height - radius; y += dim) {
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, 2 * Math.PI);
                ctx.fillStyle = "grey";
                ctx.fill();
                ctx.closePath();

                if (
                    this.checkDistance(this.mousePos.x - canvasRect.x, x, dim, canvasRect.width) &&
                    this.checkDistance(this.mousePos.y - canvasRect.y, y, dim, canvasRect.height)
                ) {
                    ctx.beginPath();
                    ctx.fillStyle = "#f005";
                    ctx.fillRect(x, y, dim, dim);
                    ctx.closePath();
                }
            }
        }

        // desks
        const ids: Array<number> = this.grid.getIds();
        for (var i in ids) {
            const pos: Pos2d | null | undefined = this.grid.getPosition(ids[i]);
            const inUse: boolean | null | undefined = this.grid.isInUse(ids[i]);
            if (pos && inUse != undefined && inUse != null)
                DotGrid.drawDesk(
                    ctx,
                    pos.x,
                    pos.y,
                    radius * 4,
                    inUse,
                );
        }
    }

    render() {
        switch (this.props.mode) {
            case 'newGrid':
                console.log('new grid')
                return (
                    <canvas
                        ref={this.canvasRef}
                        onMouseMove={this.handleMouseMove}
                        onClick={this.checkBox}
                        width={this.gridSettings.width}
                        height={this.gridSettings.height}
                    />
                );
                break;
            case 'newInformation':
                console.log('delete info')
                return (
                    <div>
                        <DialogContentText color="primary">
                            Dimensioni stanza:
                        </DialogContentText>
                        <FormLabel>{this.props.sizeH}x{this.props.sizeW}</FormLabel>

                        <DialogContentText color="primary">
                            Orario di apertura:
                        </DialogContentText>
                        <FormLabel>{this.props.openingTime} - {this.props.closingTime}</FormLabel>

                        <DialogContentText color="primary">
                            Giorni di apertura:
                        </DialogContentText>
                        <FormLabel>{this.props.weekDays}</FormLabel>
                    </div>
                );
            case 'deleteGrid':
                return (
                    <div>
                        <canvas
                            ref={this.canvasRef}
                            width={this.gridSettings.width}
                            height={this.gridSettings.height}
                        />
                    </div>
                );
                break;
            case 'deleteInformation':
                return (
                    <div>
                        <DialogContent>
                            <DialogContentText color="primary">
                                Dimensioni stanza:
                        </DialogContentText>
                            <FormLabel>{this.props.sizeH}x{this.props.sizeW}</FormLabel>

                            <DialogContentText color="primary">
                                Orario di apertura:
                        </DialogContentText>
                            <FormLabel>{this.props.openingTime} - {this.props.closingTime}</FormLabel>

                            <DialogContentText color="primary">
                                Giorni di apertura:
                        </DialogContentText>
                            <FormLabel>
                                {this.props.weekDays.map(day => day + " ")}
                            </FormLabel>
                        </DialogContent>
                    </div>
                );
            case 'modifyGrid':
                return (
                    <div>
                        <Button
                            id="cleanGrid"
                            variant="outlined"
                            size="medium"
                            onClick={() => {
                                this.resetView()
                            }}>
                            Svuota stanza
                            </Button>
                        <canvas
                            ref={this.canvasRef}
                            onMouseMove={this.handleMouseMove}
                            onClick={this.checkBox}
                            width={this.gridSettings.width}
                            height={this.gridSettings.height}
                        />
                    </div>
                );
                break;
            case 'modifyInformation':
                return (
                    <div>
                        {/* <div className="switchInline">
                            <div className="switchMarginDx">
                                <Typography>Chiusa</Typography>
                            </div>
                        </div>
                        <div className="switchInline">
                            <label className="switch">
                                <input type="checkbox"></input>
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <div className="switchInline">
                            <div className="switchMarginSx">
                                <Typography>Aperta</Typography>
                            </div>
                        </div> */}
                        {/* <DialogContentText color="primary">
                            Dimensioni stanza:
                        </DialogContentText>
                        <FormLabel>{this.props.sizeH}x{this.props.sizeW}</FormLabel> */}
                        {/* <TextField
                        required
                        id="outlined-search"
                        label={this.props.sizeH}
                        variant="outlined"
                        />
                        x
                        <TextField
                        required
                        id="outlined-search"
                        label={this.props.sizeW}
                        variant="outlined"
                        /> */}

                        {/* <DialogContentText color="primary">
                            Orario:
                        </DialogContentText>
                        <FormLabel>{this.props.openingTime} - {this.props.closingTime}</FormLabel> */}
                        {/* <TextField
                        required
                        id="outlined-search"
                        label="Apertura"
                        variant="outlined"
                        />
                        -
                        <TextField
                        required
                        id="outlined-search"
                        label="Chiusura"
                        variant="outlined"
                        /> */}

                        {/* <DialogContentText color="primary">
                            Giorni di apertura:
                        </DialogContentText>
                        <FormLabel>{this.props.weekDays}</FormLabel> */}
                    </div>
                );
            default:
                return (
                    <div>
                        <canvas
                            ref={this.canvasRef}
                            onMouseMove={this.handleMouseMove}
                            onClick={this.checkBox}
                            width={this.gridSettings.width}
                            height={this.gridSettings.height}
                        />
                    </div>
                );
        }
    }
}

export default DotGrid;
