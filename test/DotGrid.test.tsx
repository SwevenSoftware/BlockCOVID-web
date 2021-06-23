import CardGrid from "../src/CardGrid"
import { render } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import configureMockStore from "redux-mock-store"
import { Provider } from "react-redux"
import { JSDOM } from "jsdom"
import thunk from "redux-thunk"
import DotGrid from "../src/DotGrid"
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
global["document"] = window.document
// @ts-ignore
global["window"] = global.document.defaultView

const mockStore = configureMockStore([thunk])

describe("dot grid test", function () {
	const defaultState = {
		login: {
			token: "adminToken",
			error: "",
		},
	}

	const data = {
		desks: [
			{
				x: 1,
				y: 1,
				available: true,
				deskId: "1",
			},
		],
		width: 10,
		height: 10,
	}

	let store
	beforeEach(() => {
		store = mockStore(defaultState)
	})

	it("should render dotgrid correctly", function () {
		const cardGrid = render(
			<Provider store={store}>
				<DotGrid mode={"new grid"} data={data} />
			</Provider>
		)
		expect(cardGrid).toBeTruthy()
	})

	it("should render dotgrid correctly", function () {
		const cardGrid = render(
			<Provider store={store}>
				<DotGrid mode={"deleteGrid"} data={data} />
			</Provider>
		)
		expect(cardGrid).toBeTruthy()
	})

	it("should render dotgrid correctly", function () {
		const cardGrid = render(
			<Provider store={store}>
				<DotGrid mode={"modifyGrid"} data={data} />
			</Provider>
		)
		expect(cardGrid).toBeTruthy()
	})

	it("should render dotgrid correctly", function () {
		const cardGrid = render(
			<Provider store={store}>
				<DotGrid mode={"default"} data={data} />
			</Provider>
		)
		expect(cardGrid).toBeTruthy()
	})
})
