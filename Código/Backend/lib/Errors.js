class NotFoundError extends Error {
	constructor(message) {
		super(message)
		this.name = "NotFoundError"
	}
}
class ValidationError extends Error {
	constructor(message, errors) {
		super(message)
		this.name = "ValidationError"
		this.errors = errors
	}
	addError(key, error) {
		this.errors[key] = error
	}
}
class UnauthorizedError extends Error {
	constructor(message) {
		super(message)
		this.name = "UnauthorizedError"
	}
}

export { NotFoundError, ValidationError, UnauthorizedError }