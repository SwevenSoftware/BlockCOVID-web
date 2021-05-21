interface Pos2d {
    x: number
    y: number
}

class Desk {
    pos: Pos2d
    inUse: boolean
    constructor(x: number, y: number) {
        this.pos = {
            x: x,
            y: y
        }
        this.inUse = false
    }
}

class Room {
    private desks: Map<Pos2d, Desk>
    public cells: Pos2d
    constructor(cellsX: number, cellsY: number) {
        this.desks = new Map<Pos2d, Desk>()
        this.cells = { x: cellsX, y: cellsY }
    }

    /**
     * Return true iff the given position is not occupied by a desk
     * @param x - x position of the desk
     * @param y - y position of the desk
     */
    public isFree(x: number, y: number): boolean {
        return !this.desks.has({x, y})
    }

    /**
     * Adds a desk, does nothing if the provided position is
     * already occupied
     * @param x - x position of the desk
     * @param y - y position of the desk
     */
    public addDesk(x: number, y: number): void {
        if(this.isFree(x, y))
            this.desks.set({x, y}, new Desk(x, y))
    }

    /**
     * Removes the desk at given position, does nothing if said
     * position is free
     * @param position - desk position
     */
    public removeDesk(position: Pos2d): void {
        this.desks.delete(position);
    }

    /**
     * Set the 'inUse' attribute of the desk at the given position, 
     * does nothing if said position is free
     * @param position - desk position
     * @param isUser - boolena value to set
     */
    public setInUse(position: Pos2d, inUse: boolean = true): void {
        let getter: Desk | undefined = this.desks.get(position)
        if (getter) {
            getter.inUse = inUse
        }
    }

    /**
     * Provides information on the use state of the desk
     * @param position - desk position
     */
    public isInUse(position: Pos2d): boolean | undefined {
        /*if (this.desks.has(id)) {
            return this.desks.get(id)?.inUse
        }
        else {
            return null
        }*/
        return this.desks.get(position)?.inUse;
    }

    public getOccupiedPositions(): Array<Pos2d> {
        return Array.from(this.desks.keys())
    }

    /**
     * Remove all desks from the grid
     */
    public clearDesks(): void {
        this.desks.clear()
    }
}

export default Room
export { Desk }
