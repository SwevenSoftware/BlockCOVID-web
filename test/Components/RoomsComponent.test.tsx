import React from "react"
import { Provider } from "react-redux"
import Enzyme, { mount, shallow } from "enzyme"
import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { JSDOM } from "jsdom"
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
import RoomsComponent from "../../src/components/RoomsComponent"
import { Grid } from "@material-ui/core"
import { ERROR_UNKNOWN } from "../../src/types"
import NewRoomComponent from "../../src/components/NewRoomComponent"

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

describe("Rooms Component", function () {
	const defaultState = {
		rooms: {
			rooms: [
				{
					room: {
						name: "Aula12",
						closed: false,
						roomStatus: "CLEAN",
						openingTime: "13:10",
						closingTime: "18:00",
						openingDays: ["WEDNESDAY", "THURSDAY", "FRIDAY"],
						width: 2,
						height: 2,
					},
					desks: [
						{
							deskId: "0",
							x: 1,
							y: 1,
						},
						{
							deskId: "1",
							x: 1,
							y: 2,
						},
					],
				},
				{
					room: {
						name: "Laboratorio",
						closed: false,
						roomStatus: "CLEAN",
						openingTime: "08:00",
						closingTime: "19:00",
						openingDays: ["MONDAY", "TUESDAY", "FRIDAY"],
						width: 10,
						height: 7,
					},
					desks: [
						{
							deskId: "0",
							x: 1,
							y: 1,
						},
						{
							deskId: "1",
							x: 1,
							y: 2,
						},
						{
							deskId: "2",
							x: 2,
							y: 1,
						},
						{
							deskId: "3",
							x: 2,
							y: 2,
						},
					],
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
				<RoomsComponent />
			</Provider>
		)
		expect(wrapper.find(RoomsComponent).length).toEqual(1)
	})

	it("should render the component if error", async function () {
		const errorState = {
			rooms: {
				rooms: null,
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
				<RoomsComponent />
			</Provider>
		)
		expect(wrapper.find(RoomsComponent).length).toEqual(1)
	})

	it("should render the new room component", async function () {
		const wrapper = mount(
			<Provider store={store}>
				<RoomsComponent />
			</Provider>
		)
		expect(
			wrapper.find(RoomsComponent).find(NewRoomComponent).length
		).toEqual(1)
	})

	it("should render the proper number of rooms", async function () {
		const wrapper = mount(
			<Provider store={store}>
				<RoomsComponent />
			</Provider>
		)
		expect(wrapper.find(RoomsComponent).find(Grid).length).toBe(3)
	})
})
