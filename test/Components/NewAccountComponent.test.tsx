import React from 'react';
import { Provider } from 'react-redux';
import Enzyme, { mount, shallow } from 'enzyme';
import NewAccountComponent from '../../src/components/NewAccountComponent'
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

describe('New Account Component', function() {
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

    it('should render the component in modify mode', async function() {
        const wrapper = mount(<Provider store={store}><NewAccountComponent /></Provider>);
        expect(wrapper.find(NewAccountComponent).length).toEqual(1);
    });
});
