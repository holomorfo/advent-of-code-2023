var fs = require('fs')

const printChain = (e) => {
  console.log(e)
  return e
}
const hashing = (prev, curr) => {
  if (prev[curr] === undefined) prev[curr] = curr
  return prev
}

try {
  var data = fs.readFileSync('input.txt', 'utf8')
  const solution = data
    .toString()
    // Spllit by lines
    .split('\n')
    // .slice(0, 10)
    // Split each line by ID | Winning numbers (hash) | Test numbers (list)
    .map((e) => {
      const [id, entry] = e.split(':')
      const [winning, test] = entry.split('|')
      // console.log(winning)
      // console.log(test)
      // console.log(test.trim().split(' '))
      const winHash = winning
        .trim()
        .split(' ')
        .filter((e) => e !== '' && e!==' ')
        .map((e) => Number(e))
        .reduce(hashing, {})
      const testList = test
        .trim()
        .split(' ')
        .filter((e) => e !== '' && e!==' ')
        .map(Number)
        .reduce(hashing, {})
      return { id, winStr: winning, testStr: test, winHash, testList: Object.values(testList) }
    })
    // .map(printChain)
    .map((e) => {
      const filtered = e.testList.filter((num) => {
        return e.winHash[`${num}`] !== undefined
      })
      return { ...e, filtered }
    })
    .map((e) => {
      const points = e.filtered.length === 0 ? 0 :
        e.filtered.length === 1 ? 1 :
        Math.pow(2, e.filtered.length-1)
      return { ...e, points }
    })
    .map(printChain)
    .reduce((prev, curr) => prev + curr.points, 0)
  console.log({ solution })
  // Calulate score of each card
  // Sum all scores
} catch (e) {
  console.log('Error:', e.stack)
}

// check reduce sum
