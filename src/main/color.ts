import colors from 'tailwindcss/colors';

const gameColors = [
  { "red": colors.red[500] },
  { "orange": colors.orange[500] },
  { "amber": colors.amber[500] },
  { "yellow": colors.yellow[500] },
  { "lime": colors.lime[500] },
  { "green": colors.green[500] },
  { "emerald": colors.emerald[500] },
  { "teal": colors.teal[500] },
  { "cyan": colors.cyan[500] },
  { "sky": colors.sky[500] },
  { "blue": colors.blue[500] },
  { "indigo": colors.indigo[500] },
  { "violet": colors.violet[500] },
  { "purple": colors.purple[500] },
  { "pink": colors.pink[500] },
  { "rose": colors.rose[500] },
] as { [key: string]: string }[];

// A functin which accepts an object with a single key and value
// and returns a string with the key and value in a Tailwind CSS class
const convertToTailWind = (input: { [key: string]: string}) => {
  return `bg-${Object.keys(input)[0]}-500`
}

export { gameColors, convertToTailWind };