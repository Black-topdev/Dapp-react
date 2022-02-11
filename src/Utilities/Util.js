// export const getAddress = (address) => {
//   const add1 = address.substring(0, 2)
//   const add2 = address.substring(address.length - 4)
//   const finalAdd = `${add1}....${add2}`
//   return finalAdd
// }

export const gasLimit = 1000000

export const numberFormate_2 = (number) => {
  return Number(number)?.toLocaleString(navigator.language, {
    minimumFractionDigits: 2,
  })
}
export const numberFormate = (number) => {
  return Number(number)?.toLocaleString(navigator.language, {
    minimumFractionDigits: 4,
  })
}
export const numberFormateWithoutDecimals = (number) => {
  return Number(number)?.toLocaleString(navigator.language, {
    minimumFractionDigits: 0,
  })
}

export const createBonus = (totalAmount, bonusRatio) => {
  const bonus = (Number(totalAmount) / 100) * bonusRatio
  const result = (Number(totalAmount) + bonus)?.toFixed(2)
  return result
}

export const formateDate = (milliSeconds) => {
  const newDate = new Date(milliSeconds * 1000)
  const [years, months, days, hours, minutes, seconds] = [
    newDate.getFullYear(),
    newDate.getMonth() + 1,
    newDate.getDate(),
    newDate.getHours(),
    newDate.getMinutes(),
    newDate.getSeconds(),
  ]
  return [years, months, days, hours, minutes, seconds]
}

export const calculatePercentage = (totalAmount, percentage) => {
  const percentageAmount = (Number(percentage) / 100) * Number(totalAmount)
  const result = Number(totalAmount) - percentageAmount
  return result
}

export const priceConversion = (type, formate, amount, web3) => {
  if (type === 'fromWei') {
    const price = web3.utils.fromWei(amount.toString(), formate)
    return price
  }
  if (type === 'toWei') {
    const price = web3.utils.toWei(amount.toString(), formate)
    return price
  }
}

export const gasPrice = async (web3) => {
  // const gasPrice = await web3.eth.getGasPrice()
  // if (number) {
  //   const newGasPrice = web3.utils.toHex(Number(gasPrice * number)?.toFixed(0))
  //   return newGasPrice
  // } else {
  //   const newGasPrice = web3.utils.toHex(Number(gasPrice * 1)?.toFixed(0))
  //   return newGasPrice

  let newGasPrice = 20000000000
  let gasPrice
  const gasFee2 = await fetch('https://gasstation-mainnet.matic.network')
  // const gasFee2 = await fetch('https://polygonscan.com/gastracker')
    .then((response) => response.json())
    .then((json) => {
      gasPrice = json['fast'] * 10 ** 9
      // if (gasPrice > newGasPrice) {
      //   gasPrice = newGasPrice
      // }
      newGasPrice = gasPrice
    })
    .catch((err) => console.error(err))
  return newGasPrice
}

export const getTheTimeDifference = (sec) => {
  const timeInSec = Number(sec) * 1000
  const currentTimeInSec = new Date().getTime()
  const difference = timeInSec - currentTimeInSec
  if (difference > 0) {
    return true
  } else {
    return false
  }
}
