import React from "react"
import { Provider } from "react-redux"
import Enzyme, { mount, shallow } from "enzyme"
import CalendarViewComponent from "../../src/components/CalendarViewComponent"
import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { JSDOM } from "jsdom"
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
import {
	Scheduler,
	DateNavigator,
	TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui"

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

describe("Calendar Component", function () {
	const defaultState = {
		reservations: {
			reservations: {
				title: "ciao",
			},
			error: "",
			loading: false,
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

	let data = {
		user: {
			username: "utente1",
		},
	}

	it("should render the component", async function () {
		const wrapper = mount(
			<Provider store={store}>
				<CalendarViewComponent data={data} />
			</Provider>
		)
		expect(wrapper.find(CalendarViewComponent).length).toEqual(1)
	})

	it("should render the calendar", async function () {
		const wrapper = mount(
			<Provider store={store}>
				<CalendarViewComponent data={data} />
			</Provider>
		)
		expect(wrapper.find(CalendarViewComponent).find(Scheduler).length).toBe(
			0
		)
	})

	it("should render the today button", async function () {
		const wrapper = mount(
			<Provider store={store}>
				<CalendarViewComponent data={data} />
			</Provider>
		)
		expect(
			wrapper
				.find(CalendarViewComponent)
				.find(Scheduler)
				.find(TodayButton).length
		).toBe(0)
	})

	it("should render the date navigator", async function () {
		const wrapper = mount(
			<Provider store={store}>
				<CalendarViewComponent data={data} />
			</Provider>
		)
		expect(
			wrapper
				.find(CalendarViewComponent)
				.find(Scheduler)
				.find(DateNavigator).length
		).toBe(0)
	})
})
