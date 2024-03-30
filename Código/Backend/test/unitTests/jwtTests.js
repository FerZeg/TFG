import assert from "node:assert"
import { sign , verify } from "../../lib/JWT.js"
import { describe, it } from "node:test"

describe("JWT Tests", () => {
	it("Debe decodificar el token con los datos correctos de un superadmin", () => {
		const payload = {
			id: 1,
			type: "superadmin"
		}
		const token = sign(payload)
		const decoded = verify(token)
		assert.equal(decoded.id, payload.id)
	})
	it("Debe decodificar el token con los datos correctos de un trabajador", () => {
		const payload = {
			id: 1,
			type: "normal",
			restauranteId: 1,
			role: "cocinero"
		}
		const token = sign(payload)
		const decoded = verify(token)
		assert.equal(decoded.id, payload.id)
		assert.equal(decoded.restauranteId, payload.restauranteId)
		assert.equal(decoded.role, payload.role)
	})
	it("Debe fallar si un trabajador no cuenta con el id del restaurante", () => {
		const payload = {
			id: 1,
			type: "admin"
		}
		assert.throws(() => sign(payload), Error)
	})
})

