import React from "react"
import { Provider } from "react-redux"
import Enzyme, { mount, shallow } from "enzyme"
import NewRoomComponent from "../../src/components/NewRoomComponent"
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

describe("Delete Room Component", function () {
	const defaultState = {
		login: {
			token: "adminToken",
			error: "",
		},
		rooms: {
			error: "",
		},
	}

	const data = {
		room: {
			name: "room name",
			openingTime: "",
			closingTime: "",
			openingDays: ["MONDAY"],
			width: 10,
			height: 10,
		},
	}

	let store
	beforeEach(() => {
		store = mockStore(defaultState)
	})

	it("should render the component in modify mode", async function () {
		const wrapper = mount(
			<Provider store={store}>
				<NewRoomComponent />
			</Provider>
		)
		expect(wrapper.find(NewRoomComponent).length).toEqual(1)
	})
})
