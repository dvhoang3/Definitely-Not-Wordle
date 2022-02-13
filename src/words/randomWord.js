import { words } from "./possible_words"

export const getRandomWord = () => {
  return words[Math.floor(Math.random()*words.length)].toUpperCase()
}

export const isPossibleWord = (word) => {
  return words.includes(word.toLowerCase())
}