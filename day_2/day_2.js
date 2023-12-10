var fs = require('fs')

const printChain = (e) => {
  console.log(e)
  return e
}

const isGamePossible = (bag, game) => {
  for (const key in game) {
    if (Object.hasOwnProperty.call(game, key)) {
      if (game[key] > bag[key]) return false
    }
  }
  return true
}

const bag = {
  red: 12,
  green: 13,
  blue: 14
}

try {
  // var data = fs.readFileSync('inputSample.txt', 'utf8')
  var data = fs.readFileSync('input.txt', 'utf8')

  const games = data
    .split('\n')
    // .slice(0, 1)
    .map((line) => {
      const [game, sets] = line.split(': ')
      // console.log({ sets })
      const setsObj = sets.split('; ').map((set) =>
        set
          .split(', ')
          .map((entry) => {
            const [num, color] = entry.split(' ')
            return { color, num: Number(num) }
          })
          .reduce((prev, curr) => {
            prev[curr.color] = curr.num
            return prev
          }, {})
      )
      return { game: Number(game.split(' ')[1]), setsObj }
    })
  // .map(printChain)

  // console.log(games)
  // Part 1
  const possibleGames = games.filter((game) => {
    const possibles = game.setsObj.filter((set) => {
      // console.log(game.game, isGamePossible(bag, set))
      return isGamePossible(bag, set)
    })
    // console.log({ possibles })
    return possibles.length === game.setsObj.length
  })

  // console.log(possibleGames)
  const solution = possibleGames.reduce((prev, curr) => prev + curr.game, 0)
  console.log({ solution })

  // Part 2
  const solutionPart2 = games
    .map((game) => {
      // find min of this game
      const powers = game.setsObj.reduce(
        (prev, set) => {
          return {
            blue: Math.max(prev.blue, set.blue || 0),
            red: Math.max(prev.red, set.red || 0),
            green: Math.max(prev.green, set.green || 0)
          }
        },
        { blue: 0, red: 0, green: 0 }
      )
      return Object.values(powers).reduce((a, b) => a * b)
    })
    // .map(printChain)
    .reduce((a, b) => a + b)
  console.log({ solutionPart2 })
} catch (error) {
  console.log('Error:', error.stack)
}
