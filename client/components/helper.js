const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

function toDollars(priceInPennies) {
  let dollars = priceInPennies / 100
  return dollars.toFixed(2)
}

function displayDollars(priceInPennies) {
  return formatter.format(toDollars(priceInPennies))
}

export default displayDollars
