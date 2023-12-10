var fs = require('fs')
const printChain = (e) => {
  console.log(e)
  return e
}

// const rgx = /(\d+)/g
const regexList = [
  /(zero)/g,
  /(one)/g,
  /(two)/g,
  /(three)/g,
  /(four)/g,
  /(five)/g,
  /(six)/g,
  /(seven)/g,
  /(eight)/g,
  /(nine)/g,
  /(\d)/g
]

const str2Num = (str) => {
  let num = -1
  if (/\d/.test(str)) return `${str}`
  switch (str) {
    case 'one':
      num = 1
      break
    case 'two':
      num = 2
      break
    case 'three':
      num = 3
      break
    case 'four':
      num = 4
      break
    case 'five':
      num = 5
      break
    case 'six':
      num = 6
      break
    case 'seven':
      num = 7
      break
    case 'eight':
      num = 8
      break
    case 'nine':
      num = 9
      break
    case 'zero':
      num = 0
      break
    default:
      break
  }
  return `${num}`
}

try {
  // var data = fs.readFileSync('input_sample.txt', 'utf8')
  var data = fs.readFileSync('input.txt', 'utf8')
  // var data = fs.readFileSync('input_2_sample.txt', 'utf8')
  // console.log(data.toString())
  // Part 1
  const result = data
    .toString()
    .split('\n')
    .map((e) =>
      e
        .split('')
        .map(Number)
        .filter((e) => !isNaN(e))
    )
    .map((e) => Number(`${e[0]}${e[e.length - 1]}`))
    // .map(printChain)
    .reduce((prev, curr) => prev + curr)
  // console.log(result)

  // Part 2

  const part2 = data
    .toString()
    .split('\n')
    .map((line) => {
      const out = regexList
        .map((e) => {
          const found = [...line.matchAll(e)].map((match) => {
            return {
              valueTranslated: str2Num(match[0]),
              value: match[0],
              startX: match.index
            }
          })
          console.log(found)
          return found
        })
        .reduce((prev, curr) => [...prev, ...curr], [])

      out.sort((a, b) => a.startX - b.startX)
      const first = out[0].valueTranslated
      const last = out[out.length - 1].valueTranslated
      const result = `${first}${last}`
      console.log(result)
      return Number(result)
    }).reduce((a,b)=>a+b)
console.log(part2)
} catch (e) {
  console.log('Error:', e.stack)
}
const line = '1twone3sevenonetuff7'

// const found = [...line.matchAll(rgx)].map((match) => {
//   return {
//     value: match[0],
//     startX: match.index,
//     endX: match.index + match[0].length - 1,
//   }
// })
// console.log(found)
