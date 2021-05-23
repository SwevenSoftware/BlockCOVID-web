import React from "react"
import { Provider } from "react-redux"
import Enzyme, { mount, shallow } from "enzyme"
import LoginComponent from "../../src/components/LoginComponent"
import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { JSDOM } from "jsdom"
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
import { ERROR_UNKNOWN } from "../../src/types"

Enzyme.configure({ adapter: new Adapter() })

declare global {
	namespace NodeJS {
		interface Global {
			document: Document
			window: Window
			navigator: Navigator
		}
	}
}

const { window } = new JSDOM("<!doctype html><html><body></body></html>")
global.document = window.document
// @ts-ignore
global.window = global.document.defaultView

const mockStore = configureMockStore([thunk])

describe("Login Component", function () {
	const defaultState = {
		login: {
			token: "adminToken",
			error: "",
		},
	}

	let store
	beforeEach(() => {
		store = mockStore(defaultState)
	})

	it("should render the component by default", async function () {
		const wrapper = mount(
			<Provider store={store}>
				<LoginComponent />
			</Provider>
		)
		expect(wrapper.find(LoginComponent).length).toEqual(1)
	})

	it("should render the component if error", async function () {
		const errorState = {
			login: {
				token: null,
				error: ERROR_UNKNOWN,
			},
		}
		store = mockStore(errorState)
		const wrapper = mount(
			<Provider store={store}>
				<LoginComponent />
			</Provider>
		)
		expect(wrapper.find(LoginComponent).length).toEqual(1)
	})
})
