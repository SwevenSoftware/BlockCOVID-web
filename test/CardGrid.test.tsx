import CardGrid from "../src/CardGrid";
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import configureMockStore from "redux-mock-store"
import {Provider} from "react-redux";
import { JSDOM } from "jsdom"
import thunk from "redux-thunk";
declare global {
    namespace NodeJS {
        interface Global {
            document: Document
            window: Window
            navigator: Navigator
        }
    }
}

const { window } = new JSDOM("<!doctype html><html><body></body></html>");
global['document'] = window.document;
// @ts-ignore
global['window'] = global.document.defaultView;

const mockStore = configureMockStore([thunk]);

describe('card grid test', function () {
    const defaultState = {
        login: {
            token: "adminToken",
            error: "",
        },
        width: 10,
        height: 10
    }

    let store
    beforeEach(() => {
        store = mockStore(defaultState)
    })

    it('should render correctly cardgrid', function () {
        const cardGrid = render(<Provider store={store}><CardGrid></CardGrid></Provider>);
        expect(cardGrid).toBeTruthy();
    });
});