import * as actions from '../actions'
import * as constants from '../constants'

describe('UI actions', () => {

    it('should have an action to show global message', () => {

        const expectedAction = {
            type: constants.SHOW_MESSAGE,
            messageType: 'test',
            messageProps: {}
        };

        expect(actions.showMessage('test')).toEqual(expectedAction);
    });
    
    it('should have an action to hide global message', () => {

        const expectedAction = {
            type: constants.HIDE_MESSAGE
        }

        expect(actions.hideMessage()).toEqual(expectedAction);
    });
    
});