var fs = require('fs')

const printChain = (e) => {
  console.log(e)
  return e
}

const createMap = (str) => {
  const [from, to] = str.split(' = ')
  const [L, R] = to.replace(/[\(\)]/g, '').split(', ')
  // console.log(from, left, right)
  return { from, L, R }
}

function recursiveCheck(value, rulesObj ) {
  
}

try {
  const string = fs.readFileSync('input.txt', 'utf8')
  // const string = fs.readFileSync('inputSample.txt', 'utf8')
  // const string = fs.readFileSync('inputSample2.txt', 'utf8')

  const [directions, _, ...rules] = string
    .toString()
    .split('\n')
    .map((e) => e.trim())

  // console.log(directions)
  const rulesObj = rules.map(createMap).reduce((prev, curr) => {
    const { from, L, R } = curr
    prev[from] = { L: L, R: R }
    return prev
  }, {})
  // console.log(rulesObj)

  const dirs = directions.split('')
  console.log(dirs)
  let value = 'AAA'

  let count = 0
  while (value !== 'ZZZ' ) {
    // console.log(value, rulesObj)
    const obj = rulesObj[value]
     value = obj[dirs[count % dirs.length]]

    console.log(value, dirs[count % dirs.length], count)
    count++
  }

  console.log(count)
  // console.log(letterRank('K'))
  // console.log(letterRank('2'))
} catch (error) {
  console.log(error)
}
