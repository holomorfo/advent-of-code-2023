var fs = require('fs')

const printChain = (e) => {
  console.log('===')
  console.log(e)
  return e
}
const sampleInput = [
  { duration: 7, distance: 9 },
  { duration: 15, distance: 40 },
  { duration: 30, distance: 200 }
]
const input = [
  { duration: 53, distance: 333 },
  { duration: 83, distance: 1635 },
  { duration: 72, distance: 1289 },
  { duration: 88, distance: 1532 }
]

const part2sample = [
  { duration: 71530, distance: 940200 },
]

const part2input = [
  { duration: 53837288, distance: 333163512891532},
]
function main(values) {
  const opts=  values.map((e) => {
    const options = []
    for (let velocity = 0; velocity < e.duration; velocity++) {
      const temp = velocity * (e.duration - velocity)
      if (e.distance < temp) options.push(temp)
    }
    // console.log(options)
    return options.length
  }).reduce((a,b)=>a*b)
  console.log(opts)
// console.log(Math.min.apply(Math,opts))

}

// main(sampleInput)
// main(input)
// main(part2sample)
main(part2input)
