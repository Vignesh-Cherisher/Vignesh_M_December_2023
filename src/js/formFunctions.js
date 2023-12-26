export function padZeros(inputValue) {
  inputValue = inputValue.toString()
  let inputLength = inputValue.length;
  let outputValue = '';
  while (8 - inputLength > 0) {
    outputValue += '0'
    inputLength += 1
  }
  return outputValue + inputValue
}

export function getFirstName(inputValue) {
  if (!inputValue || typeof inputValue !== "string") throw new Error("Invalid Input");
  const indexOfSpace = inputValue.indexOf(' ')
  if (indexOfSpace === -1) return inputValue
  else return inputValue.slice(0, indexOfSpace)
}

export function getLastName(inputValue) {
  if (!inputValue || typeof inputValue !== "string") throw new Error("Invalid Input");
  const indexOfSpace = inputValue.indexOf(' ')
  if (indexOfSpace === -1) return inputValue
  else return inputValue.slice(indexOfSpace)
}