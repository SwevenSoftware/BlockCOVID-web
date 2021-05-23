import React from "react"
import { Provider } from "react-redux"
import Enzyme, { mount, shallow } from "enzyme"
import CardGridComponent from "../../src/components/CardGridComponent"
import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { JSDOM } from "jsdom"
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"

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

describe("Card Grid Component", function () {
	const defaultState = {
		cardGrid: {
			state: {
				mode: "",
				data: {},
			},
		},
		login: {
			token: "adminToken",
			error: "",
		},
	}

	let store
	beforeEach(() => {
		store = mockStore(defaultState)
	})

	it("should render the component in modify mode", async function () {
		const wrapper = mount(
			<Provider store={store}>
				<CardGridComponent mode={"mod"} data={{}} />
			</Provider>
		)
		expect(wrapper.find(CardGridComponent).length).toEqual(1)
	})

	it("should render the component in deletion mode", async function () {
		const wrapper = mount(
			<Provider store={store}>
				<CardGridComponent mode={"del"} data={{}} />
			</Provider>
		)
		expect(wrapper.find(CardGridComponent).length).toEqual(1)
	})

	it("should render the component in not defined mode", async function () {
		const wrapper = mount(
			<Provider store={store}>
				<CardGridComponent mode={""} data={{}} />
			</Provider>
		)
		expect(wrapper.find(CardGridComponent).length).toEqual(1)
	})
})
