var fs = require('fs')

const printChain = (e) => {
  console.log(e)
  return e
}

function generateMatrix(rgx, string) {
  return string.split('\n').reduce((prev, line, y) => {
    const found = [...line.matchAll(rgx)].map((match) => {
      return {
        value: match[0],
        startX: match.index,
        endX: match.index + match[0].length - 1,
        y
      }
    })
    return [...prev, ...found]
  }, [])
}

function numberHash(numbersList) {
  return numbersList.reduce((prev, curr) => {
    for (let index = curr.startX; index <= curr.endX; index++) {
      prev[`${index}-${curr.y}`] = Number(curr.value)
    }
    return prev
  }, {})
}

function symbolHash(symbolsList) {
  return symbolsList.reduce((prev, curr) => {
    prev[`${curr.startX}-${curr.y}`] = 1
    return prev
  }, {})
}
function outterRim(startX, endX, y, hash) {
  for (let index = startX - 1; index <= endX + 1; index++) {
    if (hash[`${index}-${y - 1}`] === 1) return false
  }
  if (hash[`${endX + 1}-${y}`] === 1) return false
  for (let index = startX - 1; index <= endX + 1; index++) {
    if (hash[`${index}-${y + 1}`] === 1) return false
  }
  if (hash[`${startX - 1}-${y}`] === 1) return false
  return true
}

function gearCheckRimPairs(x, y, hash) {
  const nums = []
  if (hash[`${x - 1}-${y - 1}`] >= 0) nums.push(hash[`${x - 1}-${y - 1}`])
  if (hash[`${x}-${y - 1}`] >= 0) nums.push(hash[`${x}-${y - 1}`])
  if (hash[`${x + 1}-${y - 1}`] >= 0) nums.push(hash[`${x + 1}-${y - 1}`])

  if (hash[`${x + 1}-${y}`] >= 0) nums.push(hash[`${x + 1}-${y}`])
  if (hash[`${x - 1}-${y}`] >= 0) nums.push(hash[`${x - 1}-${y}`])

  if (hash[`${x - 1}-${y + 1}`] >= 0) nums.push(hash[`${x - 1}-${y + 1}`])
  if (hash[`${x}-${y + 1}`] >= 0) nums.push(hash[`${x}-${y + 1}`])
  if (hash[`${x + 1}-${y + 1}`] >= 0) nums.push(hash[`${x + 1}-${y + 1}`])
  // console.log(nums)
  // console.log([...new Set(nums).values()])
  return [...new Set(nums).values()]
}
try {
  var data = fs.readFileSync('input.txt', 'utf8')
  // console.log(data.toString())
  const str = data.toString()
  const numbers = generateMatrix(/(\d+)/g, str)
  const symbols = generateMatrix(/([^\d\.])/g, str)
  const hash = symbolHash(symbols)
  const sum = numbers
    .filter((curr) => {
      return !outterRim(curr.startX, curr.endX, curr.y, hash)
    })
    .map((elem) => elem.value)
    .map(Number)
    .reduce((prev, curr) => prev + curr, 0)
  console.log('Part 1',{ sum })
  // Part 2
  const numHash = numberHash(numbers)
  // console.log(numHash)
  const gearIcon = symbols.filter((e) => e.value === '*')
  console.table(gearIcon.slice(0, 10))
  const pairs = gearIcon
    .map((icon) => {
      return gearCheckRimPairs(icon.startX, icon.y, numHash)
    })
    .filter((e) => e.length === 2)
    // .map(printChain)
    .map((e) => e[0] * e[1])
    .reduce((a, b) => a + b)
  // .reduce((prev, curr) => {
  //   return prev + curr[0]*curr[1]
  // }, 0)
  console.log('PAIRS')
  console.log(pairs)
  // console.log(numHash)
} catch (e) {
  console.log('Error:', e.stack)
}
