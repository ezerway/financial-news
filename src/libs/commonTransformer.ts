export const toTableItems = (collection, model) => collection.map((record) => {
    const [dateString, timeString] = record.id.split(model);
    const date = dateString.replace("/", "");
    const timeParts = timeString.replace("/", "");
    let time = `${timeParts.slice(0, 2)}:${timeParts.slice(2, 4)}:${timeParts.slice(4, 6)}.${timeParts.slice(6, 9)}Z`;

    return {
        created_at: `${date}T${time}`,
        date: date,
        data: record.data,
    };
});

export const filesToItems = (collection, model, type = "md") => collection.map((record) => {
    const [dateString, timeString] = record.file.split(model);
    const date = dateString.split("/").at(-2);
    const time = timeString.replace("/", "").replace(`.${type}`, "");

    return {
        created_at: `${date}T${time}`,
        date: date,
        data: record,
    };
});

export const toChart = (collection, keyField, valueField, pageSize = 30, ids = []) => {

    let series = {};
    let latest = collection.sort((a, b) => b.date - a.date).slice(collection.length > pageSize ? -pageSize : 0);
    latest.map((record) => {
        record.data.forEach((item) => {

            if (ids.length > 0 && !ids.includes(item[keyField])) {
                return;
            }

            if (!series[item[keyField]]) {
                series[item[keyField]] = [];
            }
            series[item[keyField]].push(item[valueField]);
        });
    })

    return {
        categories: latest.map((record) => (new Date(record.date).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric'
        }))),
        series: Object.keys(series).map((key) => {
            return {
                name: key,
                data: series[key],
            };
        })
    };
};