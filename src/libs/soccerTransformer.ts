
const roundToTwo = (num) => {
    const result = Number(Math.round(num + "e+2") + "e-2");

    if (!result) {
        return 0.5;
    }

    return result === Number.POSITIVE_INFINITY ? num : result;
};

const teamColor = (text, teamIndex) => {
    return `<span class="${teamIndex ? "text-red-500" : "text-blue-500"}">${text}</span>`;
};

const profitColor = (text) => {
    return `<span class="text-green-500">${text}</span>`;
};

export const toTableItems = (collection, model) => collection.map((record) => {
    const [dateString, timeString] = record.id.split(model);
    const date = dateString.replace("/", "");
    const timeParts = timeString.replace("/", "");
    let time = `${timeParts.slice(0, 2)}:${timeParts.slice(2, 4)}:${timeParts.slice(4, 6)}.${timeParts.slice(6, 9)}Z`;
    const datetimeString = `${date}T${time}`;
    const toDate = new Date(datetimeString).toDateString();

    let serieMap = {};
    const result = record.data
        .filter((item) => item.serie)
        .filter((item) => new Date(item.start).toDateString() === toDate)
        .map((item) => {
            const winMarketOutcomePrice = item.winMarketOutcomePrices.map(
                (price) => 1 / roundToTwo(price),
            )[0];
            const drawMarketOutcomePrice = item.drawMarketOutcomePrices.map(
                (price) => 1 / roundToTwo(price),
            )[0];
            const lossMarketOutcomePrice = item.lossMarketOutcomePrices.map(
                (price) => 1 / roundToTwo(price),
            )[0];

            let league = serieMap[item.serie] ? "" : item.serie;
            serieMap[item.serie] = true;
            const startDates = item.startDate.split("/");
            const startTimes = item.startTime.split(":");
            const leagues = league.split(" ");
            leagues.pop();

            const topIndex =
                winMarketOutcomePrice < lossMarketOutcomePrice ? 0 : 1;
            const botIndex = topIndex ? 0 : 1;
            const teams = item.sortTitle
                .split(" vs ")
                .map((team, index) =>
                    teamColor(team, index === topIndex ? 0 : 1),
                );

            const suggestTwoWinBot = roundToTwo(
                (100 * winMarketOutcomePrice) /
                (winMarketOutcomePrice + lossMarketOutcomePrice),
            );
            const suggestTwoWinTop = roundToTwo(100 - suggestTwoWinBot);
            const suggestTwoWinProfit = roundToTwo(
                suggestTwoWinTop * winMarketOutcomePrice,
            );

            const suggestWinDraw = roundToTwo(
                (100 * winMarketOutcomePrice) /
                (winMarketOutcomePrice + drawMarketOutcomePrice),
            );
            const suggestWinDrawTop = roundToTwo(100 - suggestWinDraw);
            const suggestWinDrawProfit = roundToTwo(
                suggestWinDrawTop * winMarketOutcomePrice,
            );

            return {
                league: leagues.join(" "),
                match: teams.join(" vs "),
                start: `${startTimes[0]}:${startTimes[1]}`,
                bet_100: `${teamColor(roundToTwo(winMarketOutcomePrice * 100), topIndex)}: ${teamColor(roundToTwo(lossMarketOutcomePrice * 100), botIndex)}`,
                win_win: `${teamColor(suggestTwoWinTop, topIndex)}: ${teamColor(suggestTwoWinBot, botIndex)} - ${profitColor(suggestTwoWinProfit)}`,
                win_draw: `${teamColor(suggestWinDrawTop, topIndex)}: ${suggestWinDraw} - ${profitColor(suggestWinDrawProfit)}`,
            };
        })
        .filter((i) => !i.bet_100.includes("NaN"));

    result.sort((a, b) => new Date(a.start) - new Date(b.start));

    return {
        created_at: datetimeString,
        date: date,
        data: result,
    };
});	