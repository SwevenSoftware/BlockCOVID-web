import React from "react"
import { Provider } from "react-redux"
import Enzyme, { mount, shallow } from "enzyme"
import AccountComponent from "../../src/components/AccountsComponent"
import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { JSDOM } from "jsdom"
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
import { Grid, ListItemIcon } from "@material-ui/core"
import PeopleIcon from "@material-ui/icons/People"
import SecurityIcon from "@material-ui/icons/Security"
import WorkIcon from "@material-ui/icons/Work"
import BathtubIcon from "@material-ui/icons/Bathtub"

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

describe("Account Component", function () {
	const defaultState = {
		accounts: {
			users: [
				{
					username: "user",
					authorities: ["USER"],
					_links: {
						modify_user: {
							href: "modify_user",
						},
						delete_user: {
							href: "modify_user",
						},
					},
				},
				{
					username: "admin",
					authorities: ["ADMIN"],
					_links: {
						modify_user: {
							href: "modify_admin",
						},
						delete_user: {
							href: "modify_user",
						},
					},
				},
			],
			counter: {
				accounts: 2,
				users: 1,
				admins: 1,
				cleaners: 0,
			},
		},
		reservations: {
			reservations: null,
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

	it("should render the component", async function () {
		const wrapper = mount(
			<Provider store={store}>
				<AccountComponent />
			</Provider>
		)
		expect(wrapper.find(AccountComponent).length).toEqual(1)
	})

	it("should render the proper amount of icons", async function () {
		const wrapper = mount(
			<Provider store={store}>
				<AccountComponent />
			</Provider>
		)
		expect(wrapper.find(AccountComponent).find(ListItemIcon).length).toBe(6)
	})

	it("should render the proper number of account icons", async function () {
		const wrapper = mount(
			<Provider store={store}>
				<AccountComponent />
			</Provider>
		)
		expect(
			wrapper.find(AccountComponent).find(ListItemIcon).find(PeopleIcon)
				.length
		).toBe(1)
	})

	it("should render the proper number of user icons", async function () {
		const wrapper = mount(
			<Provider store={store}>
				<AccountComponent />
			</Provider>
		)
		expect(
			wrapper.find(AccountComponent).find(ListItemIcon).find(WorkIcon)
				.length
		).toBe(1)
	})

	it("should render the proper number of admin icons", async function () {
		const wrapper = mount(
			<Provider store={store}>
				<AccountComponent />
			</Provider>
		)
		expect(
			wrapper.find(AccountComponent).find(ListItemIcon).find(SecurityIcon)
				.length
		).toBe(1)
	})

	it("should render the proper number of cleaner icons", async function () {
		const wrapper = mount(
			<Provider store={store}>
				<AccountComponent />
			</Provider>
		)
		expect(
			wrapper.find(AccountComponent).find(ListItemIcon).find(BathtubIcon)
				.length
		).toBe(1)
	})

	it("should render the proper number of users", async function () {
		const wrapper = mount(
			<Provider store={store}>
				<AccountComponent />
			</Provider>
		)
		expect(wrapper.find(AccountComponent).find(Grid).length).toBe(3)
	})
})
