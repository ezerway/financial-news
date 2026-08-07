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

export const attachComparison = (items: any[], keyField: string, compareFields: string[]) => {
    const sorted = [...items].sort((a, b) => (a.date > b.date ? 1 : a.date < b.date ? -1 : 0));

    for (let i = 0; i < sorted.length; i++) {
        const currentRecord = sorted[i];
        if (i === 0 || !sorted[i - 1]) {
            continue;
        }

        const prevRecord = sorted[i - 1];
        const prevMap = new Map<string, any>();
        if (Array.isArray(prevRecord.data)) {
            prevRecord.data.forEach((row: any) => {
                const keyVal = row[keyField];
                if (keyVal !== undefined) {
                    prevMap.set(String(keyVal), row);
                }
            });
        }

        if (Array.isArray(currentRecord.data)) {
            currentRecord.data = currentRecord.data.map((row: any) => {
                const keyVal = row[keyField];
                const prevRow = prevMap.get(String(keyVal));
                const updatedRow = { ...row };

                if (prevRow) {
                    compareFields.forEach((field) => {
                        const currVal = typeof updatedRow[field] === "number" ? updatedRow[field] : parseFloat(String(updatedRow[field] || "").replace(/,/g, ""));
                        const prevVal = typeof prevRow[field] === "number" ? prevRow[field] : parseFloat(String(prevRow[field] || "").replace(/,/g, ""));

                        if (!isNaN(currVal) && !isNaN(prevVal)) {
                            const diff = currVal - prevVal;
                            updatedRow[`${field}_diff`] = diff;
                            updatedRow[`${field}_percent`] = prevVal !== 0 ? (diff / prevVal) * 100 : 0;
                        }
                    });
                }
                return updatedRow;
            });
        }
    }

    return sorted;
};