import math

transactions = {
    "T01": {"date": "2021-05-01", "merchant_code": "sportcheck", "amount_cents": 21000},
    "T02": {"date": "2021-05-02", "merchant_code": "sportcheck", "amount_cents": 8700},
    "T03": {"date": "2021-05-03", "merchant_code": "tim_hortons", "amount_cents": 323},
    "T04": {"date": "2021-05-04", "merchant_code": "tim_hortons", "amount_cents": 1267},
    "T05": {"date": "2021-05-05", "merchant_code": "tim_hortons", "amount_cents": 2116},
    "T06": {"date": "2021-05-06", "merchant_code": "tim_hortons", "amount_cents": 2211},
    "T07": {"date": "2021-05-07", "merchant_code": "subway", "amount_cents": 1853},
    "T08": {"date": "2021-05-08", "merchant_code": "subway", "amount_cents": 2153},
    "T09": {"date": "2021-05-09", "merchant_code": "sportcheck", "amount_cents": 7326},
    "T10": {"date": "2021-05-10", "merchant_code": "tim_hortons", "amount_cents": 1321},
}

rules = [
    {
        "pointsAwarded": 500,
        "minSpend": {"sportcheck": 75, "tim_hortons": 25, "subway": 25},
    },
    {
        "pointsAwarded": 300,
        "minSpend": {"sportcheck": 75, "tim_hortons": 25, "subway": 0},
    },
    {
        "pointsAwarded": 200,
        "minSpend": {"sportcheck": 75, "tim_hortons": 0, "subway": 0},
    },
    {
        "pointsAwarded": 150,
        "minSpend": {"sportcheck": 25, "tim_hortons": 10, "subway": 10},
    },
    {
        "pointsAwarded": 75,
        "minSpend": {"sportcheck": 25, "tim_hortons": 10, "subway": 0},
    },
    {
        "pointsAwarded": 75,
        "minSpend": {"sportcheck": 20, "tim_hortons": 0, "subway": 0},
    },
]


def calculate_transactions(transactions):
    sportcheck = 0
    tim_hortons = 0
    subway = 0

    for transaction in transactions.values():
        # Sum up the total amount spent at each merchant
        if transaction["merchant_code"] == "sportcheck":
            sportcheck += transaction["amount_cents"]
        elif transaction["merchant_code"] == "tim_hortons":
            tim_hortons += transaction["amount_cents"]
        elif transaction["merchant_code"] == "subway":
            subway += transaction["amount_cents"]

    return (
        math.floor(sportcheck / 100),
        math.floor(tim_hortons / 100),
        math.floor(subway / 100),
    )


def calculate_points(sportcheck, tim_hortons, subway, dp):
    totalPoints = 0
    if dp[sportcheck][tim_hortons][subway] != -1:
        return dp[sportcheck][tim_hortons][subway]
    for i in range(len(rules)):
        currentRule = rules[i]
        if (
            sportcheck >= currentRule["minSpend"]["sportcheck"]
            and tim_hortons >= currentRule["minSpend"]["tim_hortons"]
            and subway >= currentRule["minSpend"]["subway"]
        ):
            totalPoints = max(
                totalPoints,
                currentRule["pointsAwarded"]
                + calculate_points(
                    sportcheck - currentRule["minSpend"]["sportcheck"],
                    tim_hortons - currentRule["minSpend"]["tim_hortons"],
                    subway - currentRule["minSpend"]["subway"],
                    dp,
                ),
            )
    dp[sportcheck][tim_hortons][subway] = totalPoints
    return sportcheck + tim_hortons + subway if totalPoints == 0 else totalPoints


sc, th, sub = calculate_transactions(transactions)
dp = [[[-1 for _ in range(sub + 1)] for _ in range(th + 1)] for _ in range(sc + 1)]
print(calculate_points(sc, th, sub, dp))
