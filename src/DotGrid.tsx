/* react */
import React, { Component, createRef, RefObject } from "react"
/* material-ui */
import DialogContentText from '@material-ui/core/DialogContentText'
import FormLabel from '@material-ui/core/DialogContentText'
import Button from "@material-ui/core/Button"
import DialogContent from '@material-ui/core/DialogContent'
/* others */
import Grid, { Desk } from "./Grid"
import { DeskInformation } from "./Api/roomAPI"
import { posix } from "path"

interface Pos2d {
    x: number,
    y: number
}

interface Settings {
    radius: number,
    width: number,
    height: number,
    dim: number
}

interface DotGridProps {
    mode: string,
    data: {
        width: number,
        height: number,
        desks: {
            x: number,
            y: number,
            available: boolean,
            deskId: string
        }[] | null
    }
}

class DotGrid extends Component<DotGridProps> {
    canvasRef: RefObject<HTMLCanvasElement>
    gridSettings: Settings
    mousePos: Pos2d
    grid: Grid
    removedDesks: Array<Desk>

    constructor(props: DotGridProps) {
        super(props)
        this.canvasRef = createRef<HTMLCanvasElement>()
        const _dim: number = 30
        this.gridSettings = {
            radius: 2,
            width: (props.data.width + 1) * _dim,
            height: (props.data.height + 1) * _dim,
            dim: _dim
        }
        this.mousePos = {
            x: -10,
            y: -10
        }
        this.grid = new Grid(this.gridSettings.width, this.gridSettings.height) // new Grid(2, 10)
        this.removedDesks = new Array<Desk>()

        if (props.data?.desks)
            for (const desk of props.data.desks) {
                const pos: Pos2d = { x: desk.x, y: desk.y }
                this.grid.addDesk(pos, !desk.available, desk.deskId);
            }

        this.handleMouseMove = this.handleMouseMove.bind(this)
        this.checkBox = this.checkBox.bind(this)
    }

    public setSize(width: number, height: number): void {
        this.canvasRef.current?.setAttribute("width", ((width + 1) * this.gridSettings.dim).toString())
        this.canvasRef.current?.setAttribute("height", ((height + 1) * this.gridSettings.dim).toString())
    }

    handleMouseMove(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>): void {
        if (this.mousePos.x !== e.clientX || this.mousePos.y !== e.clientY) {
            this.mousePos = {
                x: e.clientX,
                y: e.clientY
            }
            this.updateCanvas()
        }
    }

    /**
     * Adds a desk in the position where the mouse clicked
     * @param e - mouse event which provides the position
     */
    checkBox(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>): void {
        const boundRect: DOMRect | undefined = this.canvasRef.current?.getBoundingClientRect()
        if (!boundRect) return
        const pointPos: Pos2d = {
            x: Math.floor((e.clientX - boundRect.x) / this.gridSettings.dim),
            y: Math.floor((e.clientY - boundRect.y) / this.gridSettings.dim)
        }

        if (pointPos.x > this.gridSettings.width - this.gridSettings.dim
            || pointPos.y > this.gridSettings.height - this.gridSettings.dim)
            return;

        if (this.grid.isFree(pointPos)) {
            let reinserted: boolean = false
            for (var i in this.removedDesks) {
                if (this.removedDesks[i].pos.x == pointPos.x &&
                    this.removedDesks[i].pos.y == pointPos.y) {
                    const deskReinsered = this.removedDesks[i]
                    delete this.removedDesks[i]
                    reinserted = true
                    this.grid.insertDesk(deskReinsered)
                }
            }
            if (!reinserted)
                this.grid.addDesk(pointPos)
        }
        else {
            const selectedDesk = this.grid.getDesk(pointPos)
            if (selectedDesk && !selectedDesk.inUse) {  // either false or undefined
                this.grid.removeDesk(pointPos);
                this.removedDesks.push(selectedDesk)
            }
        }

        this.updateCanvas()
    }

    checkDistance(mouse: number, point: number, step: number, dim: number): boolean {
        if (mouse / dim >= 1 - step / dim || mouse < point)
            return false
        return mouse - point < step
    }

    private drawDesk(
        ctx: CanvasRenderingContext2D,
        desk: Desk,
        radius: number
    ) {
        const dim: number = this.gridSettings.dim
        const x: number = desk.pos.x * dim + dim / 2 + this.gridSettings.radius
        const y: number = desk.pos.y * dim + dim / 2 + this.gridSettings.radius
        ctx.beginPath()
        ctx.arc(x, y, radius * 1.2, 0, Math.PI * 2)
        ctx.fillStyle = "lightgrey"
        ctx.fill()
        ctx.closePath()
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        if (desk.inUse) {
            ctx.fillStyle = "orange"
        }
        else {
            ctx.fillStyle = "green"
        }
        ctx.fill()
        ctx.closePath()
    }

    public resetView(): void {
        this.removedDesks = this.removedDesks.concat(this.grid.getAllDesks())
        this.grid.clearDesks()
        this.updateCanvas()
    }

    updateCanvas(): void {
        const canvas: HTMLCanvasElement | null = this.canvasRef.current
        if (!canvas) return
        const canvasRect: DOMRect = canvas.getBoundingClientRect()
        const ctx: CanvasRenderingContext2D | undefined | null = this.canvasRef.current?.getContext(
            "2d"
        )
        if (!ctx) return

        const dim: number = this.gridSettings.dim

        const radius: number = this.gridSettings.radius
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        for (var x: number = radius; x <= canvas.width - radius; x += dim) {
            for (var y: number = radius; y <= canvas.height - radius; y += dim) {
                ctx.beginPath()
                ctx.arc(x, y, radius, 0, 2 * Math.PI)
                ctx.fillStyle = "grey"
                ctx.fill()
                ctx.closePath()

                if (
                    this.checkDistance(this.mousePos.x - canvasRect.x, x, dim, canvasRect.width) &&
                    this.checkDistance(this.mousePos.y - canvasRect.y, y, dim, canvasRect.height)
                ) {
                    ctx.beginPath()
                    ctx.fillStyle = "#f005"
                    ctx.fillRect(x, y, dim, dim)
                    ctx.closePath()
                }
            }
        }

        // desks
        const positions: Array<Pos2d> = this.grid.getOccupiedPositions()
        for (var pos of positions) {
            const desk: Desk | undefined = this.grid.getDesk(pos)
            if (desk != undefined)
                this.drawDesk(
                    ctx,
                    desk,
                    radius * 4
                )
        }
    }

    public getDesks(): Array<Desk> {
        return this.grid.getAllDesks()
    }

    public getRemovedDesks(): Array<Desk> {
        return this.removedDesks.filter((d) => d.serverId !== null)
    }

    public getNewDesks(): Array<Desk> {
        return this.getDesks().filter((d) => d.serverId === null)
    }

    componentDidMount() {
        setTimeout(() => this.updateCanvas(), 100)
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
                )
                break
            case 'deleteGrid':
                return (
                    <div>
                        <canvas
                            ref={this.canvasRef}
                            width={this.gridSettings.width}
                            height={this.gridSettings.height}
                        />
                    </div>
                )
                break
            case 'modifyGrid':
                return (
                    <div className= "centralModal">
                        {/* <Button
                            id="cleanGrid"
                            variant="outlined"
                            size="medium"
                            onClick={() => {
                                this.resetView()
                            }}>
                            Svuota stanza
                            </Button> */}
                        <canvas
                            ref={this.canvasRef}
                            onMouseMove={this.handleMouseMove}
                            onClick={this.checkBox}
                            width={this.gridSettings.width}
                            height={this.gridSettings.height}
                        />
                    </div>
                )
                break
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
                )
        }
    }
}

export default DotGrid
