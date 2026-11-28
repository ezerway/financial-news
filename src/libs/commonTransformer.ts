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

    const DEFAULT_ALIASES: Record<string, string[]> = {
        "Xăng RON 95-V": ["Xăng E10 RON 95 Mức 5", "Xăng E10 RON 95-V", "Xăng RON 95-V"],
        "Xăng RON 95-III": ["Xăng E10 RON 95 Mức 3", "Xăng E10 RON 95-III", "Xăng RON 95-III"],
        "Xăng E5 RON 92": ["Xăng E5 RON 92", "Xăng E5 RON 92 Mức 2", "Xăng E5 RON 92-II"],
        "Xăng E5 RON 92-II": ["Xăng E5 RON 92", "Xăng E5 RON 92 Mức 2", "Xăng E5 RON 92-II"],
        "Xăng E10 RON 95-III": ["Xăng E10 RON 95 Mức 3", "Xăng E10 RON 95-III", "Xăng RON 95-III"],
        "DO 0,05S-II": ["DO 0,05S Mức 2", "DO 0,05S-II"],
        "DO 0,001S-V": ["DO 0,001S Mức 5", "DO 0,001S-V"],
    };

            export const toChart = (
                collection: any[],
                keyField: string,
                valueField: string,
                pageSize = 30,
                ids: (string | { name: string; aliases?: string[] })[] = []
            ) => {
                const sorted = [...collection]
                    .filter((r) => r.data && Array.isArray(r.data) && r.data.length > 0)
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

                const latest = sorted.slice(sorted.length > pageSize ? -pageSize : 0);

                    const categories = latest.map((record) =>
                        new Date(record.date).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                        })
                    );

                    let targetConfigs: { name: string; aliases: string[] }[] = [];
                    if (ids.length > 0) {
                        targetConfigs = ids.map((id) => {
                            if (typeof id === "object" && id !== null && id.name) {
                                return {
                                    name: id.name,
                                    aliases: id.aliases || [id.name],
                                };
                            }
                            const nameStr = String(id);
                            return {
                                name: nameStr,
                                aliases: DEFAULT_ALIASES[nameStr] || [nameStr],
                            };
                        });
    } else {
        const lastRecord = latest[latest.length - 1];
        if(lastRecord) {
            targetConfigs = lastRecord.data.map((item: any) => ({
                name: item[keyField],
                aliases: [item[keyField]],
            }));
        }
    }

    const series = targetConfigs.map((cfg) => {
        const data = latest.map((record) => {
            const item = record.data.find(
                (i: any) =>
                    i[keyField] === cfg.name ||
                    (cfg.aliases && cfg.aliases.includes(i[keyField]))
            );
            return item ? Number(item[valueField]) : null;
        });
        return {
            name: cfg.name,
            data,
        };
    });

    return {
        categories,
        series,
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