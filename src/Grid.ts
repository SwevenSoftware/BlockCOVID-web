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
    public isFree(position : Pos2d): boolean {
        for (const pos of this.getOccupiedPositions()) {
            if(pos.x === position.x && pos.y === position.y)
                return false;
        }
        return true;
    }

    /**
     * Adds a desk, does nothing if the provided position is
     * already occupied
     * @param x - x position of the desk
     * @param y - y position of the desk
     */
    public addDesk(position : Pos2d): void {
        if(this.isFree(position))
            this.desks.set(position, new Desk(position.x, position.y))
    }

    /**
     * Removes the desk at given position, does nothing if said
     * position is free
     * @param position - desk position
     */
    public removeDesk(position: Pos2d): void {
        for (const pos of this.getOccupiedPositions()) {
            if(pos.x === position.x && pos.y === position.y)
                this.desks.delete(pos);
        }
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

    public getOccupiedPositions(): Array<Pos2d> {
        return Array.from(this.desks.keys())
    }

    public getDesk(position: Pos2d) : Desk | undefined {
        for (const pos of this.getOccupiedPositions()) {
            if(pos.x === position.x && pos.y === position.y)
                return this.desks.get(pos);
        }
    }

    public getAllDesks() : Array<Desk> {
        return Array.from(this.desks.values());
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
