import js from "@eslint/js"

export default [
	js.configs.recommended,
	{
		rules: {
			"no-unused-vars": "warn",
			"no-undef": "warn",
			indent: [
				"error",
				"tab"
			],
			"linebreak-style": [
				"error",
				"windows"
			],
			quotes: [
				"error",
				"double"
			],
			semi: [
				"error",
				"never"
			]
		}
	},
	{
		env: {
			node: true
		}
	}
]