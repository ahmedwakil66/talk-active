
const getTime = (ms) => {
    const date = new Date(ms);
    const monthIndex = date.getMonth();
    const day = date.getDay();
    const year = date.getFullYear();
    const hourRaw = date.getHours();
    const minuteRaw = date.getMinutes();
    const secondRaw = date.getSeconds();

    const hour = hourRaw.toString().length === 1 ? ('0' + hourRaw) : hourRaw;
    const minute = minuteRaw.toString().length === 1 ? `0${minuteRaw}` : minuteRaw;
    const second = secondRaw.toString().length === 1 ? ('0' + secondRaw) : secondRaw;

    let month;
    switch(monthIndex){
        case 0: month = 'January'; break;
        case 1: month = 'February'; break;
        case 2: month = 'March'; break;
        case 3: month = 'April'; break;
        case 4: month = 'May'; break;
        case 5: month = 'June'; break;
        case 6: month = 'July'; break;
        case 7: month = 'August'; break;
        case 8: month = 'September'; break;
        case 9: month = 'October'; break;
        case 10: month = 'November'; break;
        case 11: month = 'December'; break;
    }

    return {month, day, year, monthIndex, hour, minute, second}

};

export default getTime;