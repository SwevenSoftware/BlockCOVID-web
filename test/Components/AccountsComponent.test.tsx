import React from 'react';
import { Provider } from 'react-redux';
import Enzyme, { mount, shallow } from 'enzyme';
import AccountComponent from '../../src/components/AccountsComponent'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { JSDOM } from 'jsdom'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

Enzyme.configure({ adapter: new Adapter() })

declare global {
    namespace NodeJS {
        interface Global {
            document: Document;
            window: Window;
            navigator: Navigator;
        }
    }
}

const { window } = new JSDOM('<!doctype html><html><body></body></html>');
global.document = window.document;
// @ts-ignore
global.window = global.document.defaultView;

const mockStore = configureMockStore([thunk])

describe('Account Component', function() {
    const defaultState = {
        accounts: [
            {
                username: "user",
                authorities: [
                    "USER"
                ]
            },
            {
                username: "admin",
                authorities: [
                    "ADMIN"
                ]
            }
        ],
        login: {
            token: null,
            error: ""
        }
    }

    let store;
    beforeEach(() => {
        store = mockStore(defaultState);
    });

    it('should render users', function() {
        const wrapper = mount(<Provider store={store}><AccountComponent /></Provider>)
        expect(wrapper.find(AccountComponent).length).toEqual(1);
    });
});
