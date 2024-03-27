function assignPermissionNumber(type) {
	let permissionNumber

	switch (type) {
	case "cocinero":
		permissionNumber = 1
		break
	case "admin":
		permissionNumber = 2
		break
	case "superadmin":
		permissionNumber = 3
		break
	default:
		permissionNumber = 0 // Default value for unknown types
		break
	}

	return permissionNumber
}
export { assignPermissionNumber }