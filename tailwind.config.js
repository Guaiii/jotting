const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
        listStyleType: {
            none: 'none',
            disc: 'disc',
            decimal: 'decimal',
            square: 'square',
            roman: 'upper-roman',
            circle:'circle',
            leading:'decimal-leading-zero',
            lowerRoman:'lower-roman',
            lowerGreek:'lower-greek'
        }
    },
    plugins: [
        plugin(function({ addVariant }) {
            addVariant('nth-n', '&:nth-child(n)')
        })
    ],
}