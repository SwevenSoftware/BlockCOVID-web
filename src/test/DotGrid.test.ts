import { describe } from 'mocha'
import { expect } from 'chai'
import DotGrid from '../DotGrid'

describe('checkDistance DotGrid', () => {
    const grid: DotGrid = new DotGrid({width: 500, height: 400});
    describe('check overlapping points', () => {
        expect(grid.checkDistance(200, 200, 10, 500)).to.equals(true);
    })
})
