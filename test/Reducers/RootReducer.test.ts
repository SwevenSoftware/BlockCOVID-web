import rootReducer from '../../src/reducers/rootReducer'

describe('reducer is correctly formed', function() {
    it('should be correctly built', function() {
        expect(rootReducer).toBeTruthy()
    });
});