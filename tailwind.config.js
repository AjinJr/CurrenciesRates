module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing:{
        '128': '32rem',
        '616': '38.5rem',
      },
      minWidth:{
        '1/2': '50%'
      }
    },
  },
  plugins: [],
}
