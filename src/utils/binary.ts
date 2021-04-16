function formatBin(binString: string, size = 4) {
  let res = binString
  while (res.length < size) {
    res = `0${res}`
  }
  return res
}

export function hex2bin(hexString: string) {
  // remove all spacing
  const hex = hexString.replace(/\s/g, '')

  return hex
    .split('')
    .map((c) => formatBin(parseInt(c, 16).toString(2)))
    .join(' ')
}

/* JS ver */
// function formatBin(binString, size = 4) {
//   let res = binString
//   while (res.length < size) {
//     res = `0${res}`
//   }
//   return res
// }

// function hex2bin(hexString) {
//   // remove all spacing
//   const hex = hexString.replace(/\s/g, '')

//   return hex
//     .split('')
//     .map((c) => formatBin(parseInt(c, 16).toString(2)))
//     .join(' ')
// }
