// import sagaHelper from 'redux-saga-testing';
//
// import { take, put, call } from 'redux-saga/effects'
// import { getQuotes } from '../sagas'
// import * as constants from '../constants'
// import * as actions from '../actions'

const recommendedProducts = [
    {
        "id": 1,
        "name": "foo",
        "description": "foo bar biz baz.",
        "imageUrl": "http://www.clker.com/cliparts/O/v/c/b/i/6/generic-logo.svg",
        "price": 132.21,
        "isInCart": false,
    },
    {
        "id": 2,
        "name": "ASURION \nRenters Insurance",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "imageUrl": "http://www.clker.com/cliparts/O/v/c/b/i/6/generic-logo.svg",
        "price": 65,
        "isInCart": true,
    }
];

/**
 * TODO: Skipping because common-ui-aws isn't being transpiled in our tests. We
 * need to figure out a way to handle this and then include a solution in the
 * common-ui-operations module.
 */
describe.skip('getting quotes async', () => {
    const it = sagaHelper(getQuotes());

    it('should wait for GET_QUOTES_REQUEST', result => {
        expect(result).toEqual(take(constants.GET_QUOTES_REQUEST));
    });

    it('should call api to get quotes', result => {
        expect(result).toEqual(call(callApi, {path: '/products/recommended-products'}));
        return {
            status: 200, ok: true, json: () => {
            }
        }
    });

    it('should get response in json', result => {
        expect(result).toBeUndefined;
        return syncSchedule;
    });

    it('should put getSyncScheduleSuccess', result => {
        expect(result).toEqual(put(actions.getSyncScheduleSuccess(syncSchedule)));
    });

    it('should end', result => {
        expect(result).toBeUndefined;
    })
});
