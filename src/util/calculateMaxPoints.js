const calculateMaxPoints = (transactions, rules) => {
  /* Get the aggregate sum of transactions per merchant ------------------------*/
  let sportcheck = 0
  let tim_hortons = 0
  let subway = 0

  for (const transaction in transactions) {
    if (transactions[transaction].merchant_code === 'sportcheck') {
      sportcheck += transactions[transaction].amount_cents
    } else if (transactions[transaction].merchant_code === 'tim_hortons') {
      tim_hortons += transactions[transaction].amount_cents
    } else if (transactions[transaction].merchant_code === 'subway') {
      subway += transactions[transaction].amount_cents
    }
  }

  sportcheck = Math.floor(sportcheck / 100)
  tim_hortons = Math.floor(tim_hortons / 100)
  subway = Math.floor(subway / 100)

  /* Get the max points per merchant ------------------------------------------*/

  // Create a 3D array full of -1 (which is the default value)
  let memo = Array(sportcheck + 1)
    .fill(null)
    .map(() =>
      Array(tim_hortons + 1)
        .fill(null)
        .map(() => Array(subway + 1).fill(-1))
    )

  // DP function to recursively go through all possible combinations of rules
  function helper(sc, th, sub, dp) {
    let totalPoints = 0

    // If we have already seen the max points for this combination, return it
    if (dp[sc][th][sub] != -1) {
      return dp[sc][th][sub]
    }

    // Go through each rule
    for (let i = 0; i < rules.length; i++) {
      // Check if the current rule is applicable, meaning the spend is less than the leftover amount
      if (
        sc >= rules[i]['minSpend']['sportcheck'] &&
        th >= rules[i]['minSpend']['tim_hortons'] &&
        sub >= rules[i]['minSpend']['subway']
      ) {
        // Recursively call the function with the leftover amount
        totalPoints = Math.max(
          totalPoints,
          rules[i]['pointsAwarded'] +
            helper(
              sc - rules[i]['minSpend']['sportcheck'],
              th - rules[i]['minSpend']['tim_hortons'],
              sub - rules[i]['minSpend']['subway'],
              dp
            )
        )
      }
    }

    // Record the total points for this combination
    dp[sc][th][sub] = totalPoints
    return totalPoints
  }
  return helper(sportcheck, tim_hortons, subway, memo)
}

export { calculateMaxPoints }
