import reducers from '../reducer'
import * as constants from '../constants'
const initialState = {
    isMessageVisible: false,
    messageType: null,
    messageProps: {}
};

describe('UI reducer', () => {

    it('should update state on showing message', () => {
    
        expect(
            reducers(initialState, {
                type: constants.SHOW_MESSAGE,
                messageType: 'test',
                messageProps: {}
            })
        ).toEqual({messageType: 'test', messageProps: {}, isMessageVisible: true})
    });
    
    it('should update state on hiding message', () => {
    
        expect(
            reducers({isMessageVisible: true}, {
                type: constants.HIDE_MESSAGE
            })
        ).toEqual(initialState)
    });
    
    it('should return default state on unknown action', () => {
    
        expect(
            reducers({isMessageVisible: true}, {
                type: 'fake action'
            })
        ).toEqual({isMessageVisible: true})
    });
});