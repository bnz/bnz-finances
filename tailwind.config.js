/** @type {import('tailwindcss').Config} */

import defaultTheme from "tailwindcss/defaultTheme"
import colors from "tailwindcss/colors"

export default {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                fadeIn: {
                    "0%": {opacity: 0},
                    "100%": {opacity: 1}
                },
                fadeOut: {
                    "0%": {opacity: 1},
                    "100%": {opacity: 0}
                },
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out forwards',
                'fade-out': 'fadeOut 0.5s ease-in-out forwards',
            }
        },
        colors: {
            ...defaultTheme.colors({colors}),
            main: "var(--background-color)",
            "main-alt": "var(--background-color-alt)",
            text: "var(--text-color)",
            "text-alt": "var(--text-alt)",
            backdrop: "var(--background-color-backdrop)",
        }
    },
    plugins: [],
}

