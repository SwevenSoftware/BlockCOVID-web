import React from 'react';
import { Provider } from 'react-redux';
import Enzyme, { mount, shallow } from 'enzyme';
import ModifyAccountComponent from '../../src/components/ModifyAccountComponent'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { JSDOM } from 'jsdom'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { ERROR_AUTHORITIES_NOT_SELECTED, ERROR_LENGTH_PASSWORD, ERROR_UNKNOWN, ERROR_WRONG_CONFIRM_PASSWORD } from '../../src/types';

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

describe('Login Component', function() {
    const defaultState = {
        login: {
            token: 'adminToken',
            error: ""
        },
        accounts: {
            error: ""
        }
    }

    const data = {
        user: {
            username: "user",
            authorities: [
                "USER", "ADMIN", "CLEANER"
            ],
            _links: {
                modify_user: {
                    href: "modify_user"
                },
                delete_user: {
                    href: "modify_user"
                }
            }
        }
    }

    let store;
    beforeEach(() => {
        store = mockStore(defaultState);
    });

    it('should render the component by default', async function() {
        const wrapper = mount(<Provider store={store}><ModifyAccountComponent data={data} /></Provider>);
        expect(wrapper.find(ModifyAccountComponent).length).toEqual(1);
    });

    it('should render the component if password length error', async function() {
        const otherState = {
            ...defaultState,
            lengthPasswordError: true
        }
        store = mockStore(otherState)
        const wrapper = mount(<Provider store={store}><ModifyAccountComponent data={data} /></Provider>);
        expect(wrapper.find(ModifyAccountComponent).length).toEqual(1);
    });

    it('should render the component if wrong confirm password error', async function() {
        const otherState = {
            ...defaultState,
            confirmPasswordError: true
        }
        store = mockStore(otherState)
        const wrapper = mount(<Provider store={store}><ModifyAccountComponent data={data} /></Provider>);
        expect(wrapper.find(ModifyAccountComponent).length).toEqual(1);
    });

    it('should render the component if password length error', async function() {
        const otherState = {
            ...defaultState,
            authoritiesError: true
        }
        store = mockStore(otherState)
        const wrapper = mount(<Provider store={store}><ModifyAccountComponent data={data} /></Provider>);
        expect(wrapper.find(ModifyAccountComponent).length).toEqual(1);
    });
});
