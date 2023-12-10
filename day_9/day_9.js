var fs = require('fs')

const printChain = (e) => {
  console.log(e)
  return e
}

const calculateSublists = (list) => {
  let nonZeroes = true
  const sublists = [list]
  let currentList = list
  let count = 0
  while (nonZeroes) {
    const tempList = []
    for (let index = 1; index < currentList.length; index++) {
      tempList.push(currentList[index] - currentList[index - 1])
    }
    currentList = tempList
    sublists.push(tempList)
    nonZeroes = !tempList.every((e) => e === 0)
    count++
  }
  sublists.reverse()
  let sum = 0
  for (let index = 0; index < sublists.length; index++) {
    const currList = sublists[index]
    sum += currList[currList.length - 1]
  }
  return sum
}

const calculateSublistsBack = (list) => {
  let nonZeroes = true
  const sublists = [list]
  let currentList = list
  let count = 0
  while (nonZeroes) {
    const tempList = []
    for (let index = 1; index < currentList.length; index++) {
      tempList.push(currentList[index] - currentList[index - 1])
    }
    currentList = tempList
    sublists.push(tempList)
    nonZeroes = !tempList.every((e) => e === 0)
    count++
  }
  sublists.reverse()
  let sum = 0
  for (let index = 0; index < sublists.length; index++) {
    const currList = sublists[index]
    sum =  currList[0] - sum
    // console.log(currList[0], sum)
  }
  return sum
}

try {
  const string = fs.readFileSync('input.txt', 'utf8')
  // const string = fs.readFileSync('inputSample.txt', 'utf8')
  // const string = fs.readFileSync('inputSample2.txt', 'utf8')
  const lines = string
    .toString()
    .split('\n')
    .map((e) => e.trim())
    .map((e) => e.split(' ').map(Number))

    // console.log(lines)
  // const part1 = lines.map(calculateSublists).reduce((a, b) => a + b)
  // console.log(part1)
  const part2 = lines.map(calculateSublistsBack).reduce((a, b) => a + b)
  console.log(part2)
} catch (error) {
  console.log(error)
}
