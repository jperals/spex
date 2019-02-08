// Given two consecutive versions of a text, returns:
// start: in which position the two start to differ
// end: in which position of the new text the different block ends
// shiftAmount: by which amount the text block at the right of the end position was shifted to the right (can be negative)

export function smartDiff(oldText, newText) {
  if(oldText === newText) {
    return {
      shiftAmount: 0
    }
  }
  let fromTheStart = 0
  for(let i = 0; i < newText.length && i < oldText.length; i++) {
    if(newText[i] !== oldText[i]) {
      break
    }
    fromTheStart += 1
  }
  let fromTheEnd = 0
  for(let j = 0; j < newText.length - fromTheStart && j < oldText.length - fromTheStart; j++) {
    if(newText[newText.length - 1 - j] !== oldText[oldText.length - 1 - j]) {
      break
    }
    fromTheEnd += 1
  }
  const start = fromTheStart
  let end = newText.length - fromTheEnd
  // // Special case: the character on both sides of the break is the same.
  // // Separate start and end.
  // if(start !== end && newText[start] === newText[end]) {
  //   end += 1
  // }
  let shiftAmount
  if (end < start) {
    shiftAmount = end - start + Math.min(0, newText.length - oldText.length)
  }
  else {
    shiftAmount = newText.length - oldText.length
  }
  // console.log(oldText)
  // console.log(newText)
  // console.log(start, fromTheEnd, shiftAmount)
  end = Math.max(start, end)
  return {start, end, shiftAmount}
}
