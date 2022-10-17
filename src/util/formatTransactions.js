export const formatTransactions = transactions => {
  const formattedTransactions = {}
  transactions = transactions.sort((a, b) => a.date.localeCompare(b.date))
  for (let transaction = 0; transaction < transactions.length; transaction++) {
    formattedTransactions['T' + transaction] = {
      date: transactions[transaction].date,
      merchant_code: transactions[transaction].merchant,
      amount_cents: transactions[transaction].amount * 100,
      id: transactions[transaction].id
    }
  }
  return formattedTransactions
}
