import { words } from "./possible_words"
import { possible_guesses } from "./possible_guesses"

export const getRandomWord = () => {
  return words[Math.floor(Math.random()*words.length)].toUpperCase()
}

export const isPossibleWord = (word) => {
  return possible_guesses.includes(word.toLowerCase())
}