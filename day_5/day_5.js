var fs = require('fs')

const printChain = (e) => {
  console.log('===')
  console.log(e)
  return e
}

const mapSetup = (lines) => {
  const [title, ...maps] = lines
  return maps.map((e) => {
    const [to, from, range] = e.trim().split(' ').map(Number)
    const fromRange = [from, from + range]
    const toRange = [to, to + range]
    return { fromRange, toRange }
  })
}

const extendRange = (min, range) => {
  const arr = []
  for (let index = min; index <= min + range; index++) {
    arr.push(index)
  }
  return arr
}

const trackHash = {

}
const trackMap = (entry, map) => {
  const found = map.find(({ fromRange }) => {
    const [start, end] = fromRange
    return start <= entry && entry <= end
  })
  if (found === undefined) return entry
  const mapped = found.toRange[0] + entry - found.fromRange[0]
  return mapped
}

try {
  var data = fs.readFileSync('input.txt', 'utf8')
  // var data = fs.readFileSync('inputSample.txt', 'utf8')
  const [seeds, ...maps] = data.toString().split('\n\n')

  const seedsValues = seeds.split(':')[1].trim().split(' ').map(Number)
  const createMaps = maps.map((e) => mapSetup(e.split('\n')))

  // const resultArr = seedsValues.map((seed) =>
  //   createMaps.reduce((prev, curr) => {
  //     return trackMap(prev, curr)
  //   }, seed)
  // )
  // console.log(Math.min.apply(Math, resultArr))
  // // Part 2
  console.log('===> Part 2')
  const seedsPairs = seedsValues.reduce((prev, curr, id, array) => {
    if (id % 2 === 0) prev.push(array.slice(id, id + 2))
    return prev
  }, [])
  // console.log(seedsPairs)
 const res= seedsPairs.map((e) => {
    const [min, range] = e
    let minFound = Number.MAX_SAFE_INTEGER
    for (let index = min; index <= min + range; index++) {
      if(index%100000===0)console.log(index)
      const mapped = createMaps.reduce((prev, curr) => {
        return trackMap(prev, curr)
      }, index)
      // console.log({ mapped })
      if (mapped < minFound) minFound = mapped
    }
    return minFound
    // console.log(minFound)
  })

  console.log(Math.min.apply(Math, res))
  // const seedsExtended = seedsPairs.map((e) => {
  //   const [min, range] = e
  //   return extendRange(min, range)
  // })
  // .reduce((prev, curr) => [...prev, ...curr], [])

  // // console.log(seedsExtended)
  // const resultPart2 = seedsExtended.map((seed) =>
  //   createMaps.reduce((prev, curr) => {
  //     return trackMap(prev, curr)
  //   }, seed)
  // )
  // console.log(Math.min.apply(Math, resultPart2))
} catch (e) {
  console.log('Error:', e.stack)
}

// // check reduce sum
