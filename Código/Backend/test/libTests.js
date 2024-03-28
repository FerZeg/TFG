import assert from "node:assert"
import { sign , verify } from "../lib/JWT.js"
import { describe, it } from "node:test"

describe("JWT Tests", () => {
	it("should decode the token correctly", () => {
		const payload = {
			id: 1,
			type: "admin"
		}
		const token = sign(payload)
		const decoded = verify(token)
		assert.equal(decoded.id, payload.id)
	})
})

