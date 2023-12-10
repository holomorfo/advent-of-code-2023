var fs = require('fs')

const printChain = (e) => {
  console.log(e)
  return e
}

const cardRankingArray = (cardString) => {
  const hashCard = cardString.split('').reduce((prev, curr) => {
    if (prev[curr] === undefined) prev[curr] = 1
    else prev[curr] = prev[curr] + 1
    return prev
  }, {})
  return Object.values(hashCard).sort().reverse()
}

const letterRank = (letter) => {
  let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
  return ranks.indexOf(letter) + 1
}

const assignRank = (arr) => {
  if (arr[0] === 5) return 7
  if (arr[0] === 4) return 6
  if (arr[0] === 3 && arr[1] === 2) return 5
  if (arr[0] === 3 && arr.length === 3) return 4
  if (arr[0] === 2 && arr[1] === 2 && arr.length === 3) return 3
  if (arr[0] === 2 && arr.length === 4) return 2
  if (arr.length === 5) return 1
  return 0
}

const sortCards = (card1, card2) => {
  const letters1 = card1.card.split('')
  const letters2 = card2.card.split('')
  const value = assignRank(card1.rankArr) - assignRank(card2.rankArr)
  if (value === 0) {
    for (let index = 0; index < letters1.length; index++) {
      const dif = letterRank(letters1[index]) - letterRank(letters2[index])
      if (dif !== 0) return dif
    }
  }
  return value
}

try {
  const string = fs.readFileSync('input.txt', 'utf8')
  // const string = fs.readFileSync('inputSample.txt', 'utf8')
  // const string = fs.readFileSync('ranks.txt', 'utf8')

  const cards = string
    .toString()
    .split('\n')
    .map((e) => e.trim())
    .map((e) => {
      const [card, bid] = e.split(' ')
      return {
        card,
        bid: Number(bid)
      }
    })
    .map((e) => ({ ...e, rankArr: cardRankingArray(e.card) }))
    .sort(sortCards)
    .map(printChain)
    .reduce((prev, curr, i) => prev + curr.bid * (i + 1), 0)

  console.log(cards)
  // console.log(letterRank('K'))
  // console.log(letterRank('2'))
} catch (error) {
  console.log(error)
}
