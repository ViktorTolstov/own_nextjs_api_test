const processData = (records, settings) => {
    const recordsToProcess = settings.onContract ? records.filter(x => x.on_contract === true) : records;

    if (settings.department || settings.subDepartment) {
        const result = getSSSeparated(recordsToProcess, "department", settings.subDepartment)
        return result;
    }

    const result = getSS(recordsToProcess);
    return result;
}

const getSS = (records, key = 'salary') => {
    const min = records.reduce((prev, current) => {
        return (Number(prev[key]) < Number(current[key]) ? prev : current);
    }, {});

    const max = records.reduce((prev, current) => {
        return (Number(prev[key]) > Number(current[key]) ? prev : current);
    }, {});

    const sum = records.reduce((prev, current) => {
        return prev + (Number(current[key]) || 0);
    }, 0);

    return {
        min: Number(min[key]) || 0,
        max: Number(max[key]) || 0,
        mean: Math.round(sum / records.length) || 0
    }
}

const getSSSeparated = (records, key, isSubExist = false) => {
    const result = {};
    const values = getUniqValues(records, key);
    values.forEach(value => {
        const targetRecords = records.filter(x => x[key] === value);
        const ssResult = !isSubExist ? getSS(targetRecords) : getSSSeparated(targetRecords, "sub_department", false);
        result[value] = ssResult;
    });

    return result;
}

const getUniqValues = (records, key) => {
    const tmpArray = [];
    const uniqValues = records.filter((item) => {
        if (tmpArray.indexOf(item[key]) === -1) {
            tmpArray.push(item[key]);
            return true
        }
        return false;
    }).map((item) => item[key]);

    return uniqValues;
}

export default processData;