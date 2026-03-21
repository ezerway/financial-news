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