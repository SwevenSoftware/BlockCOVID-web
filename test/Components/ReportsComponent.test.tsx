/* react */
import React from "react"
/* redux */
import { Provider } from "react-redux"
import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
/* material-ui */
import { Grid, ListItemIcon } from "@material-ui/core"
import NoteAddIcon from "@material-ui/icons/NoteAdd"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
/* others */
import Enzyme, { mount, shallow } from "enzyme"
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
import { JSDOM } from "jsdom"
import { ERROR_UNKNOWN } from "../../src/types"
import ReportsComponent from "../../src/components/ReportsComponent"

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

describe("Reports component", function () {
	const defaultState = {
		reports: {
			reports: [
				{
					name: "Registered_Report_usage_20210523_000000.pdf",
					creationDate: "2021-05-23T00:00:00.028264417",
					registrationDate: "2021-05-23T00:00:00.028264417",
				},
				{
					name: "Registered_Report_usage_20210524_000000.pdf",
					creationDate: "2021-05-24T00:00:00.028264417",
					registrationDate: "2021-05-24T00:00:00.028264417",
				},
			],
			error: "",
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

	it("should render the component", async function () {
		const wrapper = mount(
			<Provider store={store}>
				<ReportsComponent />
			</Provider>
		)
		expect(wrapper.find(ReportsComponent).length).toEqual(1)
	})

	it("should render the component if error occurs", async function () {
		const errorState = {
			reports: {
				reports: null,
				error: ERROR_UNKNOWN,
			},
			login: {
				token: null,
				error: ERROR_UNKNOWN,
			},
		}
		store = mockStore(errorState)
		const wrapper = mount(
			<Provider store={store}>
				<ReportsComponent />
			</Provider>
		)
		expect(wrapper.find(ReportsComponent).length).toEqual(1)
	})

	it("should render the proper amount of icons", async function () {
		const wrapper = mount(
			<Provider store={store}>
				<ReportsComponent />
			</Provider>
		)
		expect(wrapper.find(ReportsComponent).find(ListItemIcon).length).toBe(4)
	})

	it("should render the two NoteAdd icons", async function () {
		const wrapper = mount(
			<Provider store={store}>
				<ReportsComponent />
			</Provider>
		)
		expect(
			wrapper.find(ReportsComponent).find(ListItemIcon).find(NoteAddIcon)
				.length
		).toBe(2)
	})

	it("should render the selection to sort reports", async function () {
		const wrapper = mount(
			<Provider store={store}>
				<ReportsComponent />
			</Provider>
		)
		expect(
			wrapper.find(ReportsComponent).find(FormControl).find(Select).length
		).toBe(1)
	})

	it("should render the proper number of reports", async function () {
		const wrapper = mount(
			<Provider store={store}>
				<ReportsComponent />
			</Provider>
		)
		expect(wrapper.find(ReportsComponent).find(Grid).length).toBe(3)
	})
})
