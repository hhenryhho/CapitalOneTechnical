export const rules = [
  {
    pointsAwarded: 500,
    minSpend: { sportcheck: 75, tim_hortons: 25, subway: 25 }
  },
  {
    pointsAwarded: 300,
    minSpend: { sportcheck: 75, tim_hortons: 25, subway: 0 }
  },
  {
    pointsAwarded: 200,
    minSpend: { sportcheck: 75, tim_hortons: 0, subway: 0 }
  },
  {
    pointsAwarded: 150,
    minSpend: { sportcheck: 25, tim_hortons: 10, subway: 10 }
  },
  {
    pointsAwarded: 75,
    minSpend: { sportcheck: 25, tim_hortons: 10, subway: 0 }
  },
  {
    pointsAwarded: 75,
    minSpend: { sportcheck: 20, tim_hortons: 0, subway: 0 }
  },
  {
    pointsAwarded: 1,
    minSpend: { sportcheck: 1, tim_hortons: 0, subway: 0 }
  },
  {
    pointsAwarded: 1,
    minSpend: { sportcheck: 0, tim_hortons: 1, subway: 0 }
  },
  {
    pointsAwarded: 1,
    minSpend: { sportcheck: 0, tim_hortons: 0, subway: 1 }
  }
]
