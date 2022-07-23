/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.tsx'],
    theme: {
        extend: {
            animation: {
                'slow-spin': 'spin 10s linear infinite'
            }
        }
    },
    plugins: []
};
