import { reducerFactory } from "../../src/reducers/reducerFactory"
import { red } from "@material-ui/core/colors"

describe("reducerFactory", () => {
	const handlers = {}
	const action = {
		type: "function",
	}
	handlers[action.type] = () => ({
		value: "value",
	})
	const initialState = {}

	const reducer = reducerFactory(initialState, handlers)

	it("non existent action returns state", () => {
		expect(reducer(initialState, "wow")).toEqual(initialState)
	})

	it("existing action returns right state", () => {
		expect(reducer(initialState, action)).toEqual({ value: "value" })
	})
})
