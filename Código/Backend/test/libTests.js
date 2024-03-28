import assert from "node:assert"
import { sign , verify } from "../lib/JWT.js"
import { describe, it } from "node:test"

describe("JWT Tests", () => {
	it("should decode the token correctly", () => {
		const payload = {
			id: 1,
			type: "superadmin"
		}
		const token = sign(payload)
		const decoded = verify(token)
		assert.equal(decoded.id, payload.id)
	})
	it("should throw an error if no restaurant ID is provided", () => {
		const payload = {
			id: 1,
			type: "admin"
		}
		assert.throws(() => sign(payload), Error)
	})
})

