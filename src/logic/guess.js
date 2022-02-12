export const guess = (word, answer) => {   // String, String -> Array[String]
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
        res.push('#6aaa64')
        answer_char_count[word[i]] -= 1
      } else {
        res.push('#c9b458')
      }
    } else {
      res.push('#787c7e')
    }
  }

  for (let i = 0; i < res.length; i++) {
    if (res[i] === 'yellow') {
      if (answer_char_count[word[i]] > 0) {
        answer_char_count[word[i]] -= 1
      } else {
        res[i] = '#787c7e'
      }
    }
  }

  return res
}