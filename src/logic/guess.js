import { GREEN, YELLOW, DARKGRAY } from "../colors"

export const guess = (word, answer) => {
  let answer_char_count = {}
  for (let i = 0; i < answer.length; i++) {
    if (answer[i] in answer_char_count) {
      answer_char_count[answer[i]] += 1
    } else {
      answer_char_count[answer[i]] = 1
    }
  }

  let res = []
  for (let i = 0; i < word.length; i++) {
    if (answer.includes(word[i])) {
      if (word[i] === answer[i]) {
        res.push(GREEN)
        answer_char_count[word[i]] -= 1
      } else {
        res.push(YELLOW)
      }
    } else {
      res.push(DARKGRAY)
    }
  }

  for (let i = 0; i < res.length; i++) {
    if (res[i] === YELLOW) {
      if (answer_char_count[word[i]] > 0) {
        answer_char_count[word[i]] -= 1
      } else {
        res[i] = DARKGRAY
      }
    }
  }

  return res
}