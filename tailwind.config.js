module.exports = {
	mode: 'jit',
	purge: {
		content: [
			'./src/**/*.html',
			'./src/**/*.js',
			'./src/**/*.jsx',
			'./src/**/*.ts',
			'./src/**/*.tsx',
			'./public/index.html',
		],
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				violet: {
					DEFAULT: '#6969D1',
					light: '#B9B9ED',
					dark: '#5050BA',
				},
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
