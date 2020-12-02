const ID = id => document.getElementById(id);

const lang = {
    "en-US": {
        th: "Happy Birthday!",
        tdy: "Today",
        ybdy: "Your birthday",
        y: "year",
        ys: "years",
        m: "month",
        ms: "months",
        w: "week",
        ws: "weeks",
        d: "day",
        ds: "days",
        h: "hour",
        hs: "hours",
        mn: "minute",
        mns: "minutes",
        sc: "second",            
        scs: "seconds",
    },
    "fr-FR": {
        th: "Joyeux Anniversaire!",
        tdy: "Aujourd'hui",
        ybdy: "Ton anniversaire",
        y: "an",
        ys: "ans",
        m: "mois",
        ms: "mois",
        w: "semaine",
        ws: "semaines",
        d: "jour",
        ds: "jours",
        h: "heure",
        hs: "heures",
        mn: "minute",
        mns: "minutes",
        sc: "seconde",        
        scs: "secondes",
    },
    "pt-BR": {
        th: "Feliz Aniversário!",
        tdy: "Hoje",
        ybdy: "Seu aniversário",
        y: "ano",
        ys: "anos",
        m: "mês",
        ms: "meses",
        w: "semana",
        ws: "semanas",
        d: "dia",
        ds: "dias",
        h: "hora",
        hs: "horas",
        mn: "minuto",
        mns: "minutos",
        sc: "segundo",        
        scs: "segundos",
    },
};

var lg = "";

const setLanguage = (l) => {
    lg = l;
    ID("titleHead").innerHTML = lang[lg].th;
    ID("txtToday").innerHTML = lang[lg].tdy;
    ID("txtBirthday").innerHTML = lang[lg].ybdy;
    getAge();
}

const secMinute = 60;
const secHour = 60 * secMinute; // 3600
const secDay = 24 * secHour; // 86400
const secWeek = 7 * secDay; // 604800

//const secYear = 365 * secDay; // 31536000
//const secYearLeap = 366 * secDay; // 31622400
const leapYear = year => (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0 && year % 3200 !== 0 || year % 86400 === 0);

const fn = n => n < 10 ? "0" + n : n;

const m2s = date => Math.floor(date.getTime() / 1000);

const checkIfHasBirthday = (b, t) => {
    let hasBirthday = false;
    hasBirthday = (t.getMonth() > b.getMonth());
    if (!hasBirthday && t.getMonth() === b.getMonth()) {
        hasBirthday = (t.getDate() > b.getDate());
        if (!hasBirthday && t.getDate() === b.getDate()) {
            hasBirthday = (t.getHours() > b.getHours());
            if (!hasBirthday && t.getHours() === b.getHours()) {
                hasBirthday = (t.getMinutes() > b.getMinutes());
                if (!hasBirthday && t.getMinutes() === b.getMinutes()) {
                    hasBirthday = (t.getSeconds() >= b.getSeconds());
                }
            }
        }
    }
    return hasBirthday;
}

const checkIfHasMonthBirthday = (b, t) => {
    let hasMonthBirthday = false;
    hasMonthBirthday = (t.getDate() > b.getDate());
    if (!hasMonthBirthday && t.getDate() === b.getDate()) {
        hasMonthBirthday = (t.getHours() > b.getHours());
        if (!hasMonthBirthday && t.getHours() === b.getHours()) {
            hasMonthBirthday = (t.getMinutes() > b.getMinutes());
            if (!hasMonthBirthday && t.getMinutes() === b.getMinutes()) {
                hasMonthBirthday = (t.getSeconds() >= b.getSeconds());
            }
        }
    }
    return hasMonthBirthday;
}

const checkIfHasWeekBirthday = (b, t) => {
    let hasWeekBirthday = false;
    hasWeekBirthday = (t.getDay() > b.getDay());
    if (!hasWeekBirthday && t.getDay() === b.getDay()) {
        hasWeekBirthday = (t.getHours() > b.getHours());
        if (!hasWeekBirthday && t.getHours() === b.getHours()) {
            hasWeekBirthday = (t.getMinutes() > b.getMinutes());
            if (!hasWeekBirthday && t.getMinutes() === b.getMinutes()) {
                hasWeekBirthday = (t.getSeconds() >= b.getSeconds());
            }
        }
    }
    return hasWeekBirthday;
}

const mask = (i, t) => {
    const v = i.value;

    if (isNaN(v[v.length - 1])) {
        i.value = v.substring(0, v.length - 1);
        return;
    }

    if (t == "date") {
        i.setAttribute("maxlength", "10");
        if (v.length === 2 || v.length === 5) i.value += "/";
    }

    if (t == "time") {
        i.setAttribute("maxlength", "5");
        if (v.length === 2) i.value += ":";
    }
}

const getAge = () => {
    let birthday = new Date();
    const Bdate = ID('birthdate').value; const Btime = ID('birthtime').value;
    if (Bdate.length === 10 && Btime.length === 5 && (Bdate[2] === "/" && Bdate[5] === "/" && Btime[2] === ":")) {
        const date = Bdate.split("/"); const time = Btime.split(":");
        const day = parseInt(date[0]); const month = parseInt(date[1]); const year = parseInt(date[2]);
        const hour = parseInt(time[0]); const minute = parseInt(time[1]);
        const tDate = new Date(year, month-1, day, hour, minute);
        if (tDate.getDate() === day && tDate.getMonth() === (month-1) && tDate.getHours() === hour && tDate.getMinutes() === minute && tDate.getFullYear() === year) {
            birthday = tDate;
        }
    }
    const today = new Date(); ID('today').value = today.toLocaleString();
    const hasBirthday = checkIfHasBirthday(birthday, today);
    const hasMonthBirthday = checkIfHasMonthBirthday(birthday, today);
    const hasWeekBirthday = checkIfHasWeekBirthday(birthday, today);
    const ageSecs = m2s(today) - m2s(birthday) + (Math.abs(today.getTimezoneOffset() - birthday.getTimezoneOffset()) === 60 ? -secHour : 0); // Para desconsiderar horário de verão
    getYears(ageSecs, birthday, today, hasBirthday);
    getMonths(ageSecs, birthday, today, hasBirthday, hasMonthBirthday);
    getWeeks(ageSecs, birthday, today, hasWeekBirthday);
    ID('days').innerHTML = (ageSecs >= 0 ? getFormatDays(ageSecs) : 0 + " " + lang[lg].ds);
    ID('hours').innerHTML = (ageSecs >= 0 ? getFormatHours(ageSecs) : 0 + " " + lang[lg].hs);
    ID('minutes').innerHTML = (ageSecs >= 0 ? getFormatMinutes(ageSecs) : 0 + " " + lang[lg].mns);
    ID('seconds').innerHTML = (ageSecs >= 0 ? ageSecs.toLocaleString() : 0) + " " + (ageSecs === 1 ? lang[lg].sc : lang[lg].scs);
    setTimeout("getAge()", 1000);
}

const getYears = (as, b, t, hb) => {
    const ageYears = (as >= 0 ? (t.getFullYear() - b.getFullYear()) + (hb ? 0 : -1) : 0);
    const lastBirthday = new Date(new Date(b).setFullYear(t.getFullYear() + (hb ? 0 : -1)));
    let restSecs = (as >= 0 ? m2s(t) - m2s(lastBirthday) : 0);
    const formatDays = getFormatDays(restSecs);
    ID('years').innerHTML = ageYears + " " + (ageYears === 1 ? lang[lg].y : lang[lg].ys) + " " + formatDays;
}

const getMonths = (as, b, t, hb, hmb) => {
    const ageYears = (as >= 0 ? (t.getFullYear() - b.getFullYear()) + (hb ? 0 : -1) : 0);
    const tm = t.getMonth();
    const bm = b.getMonth();
    const adds = ((tm === bm) ? (hb ? 0 : 11) : (hb ? ((tm - bm) + (hmb ? 0 : -1)) : (12 - (bm - tm)) + (hmb ? 0 : -1)));
    const ageMonths = (as >= 0 ? ((ageYears * 12) + adds) : 0);
    const m = (t.getMonth() + (hmb ? 0 : -1));
    const bd = b.getDate();
    const lastMonthBirthday = new Date(t.getFullYear(), m, (bd - (m === 1 && bd > 28 ? bd % (leapYear(t.getFullYear()) ? 29 : 28) : 0)), b.getHours(), b.getMinutes(), b.getSeconds());
    let restSecs = (as >= 0 ? m2s(t) - m2s(lastMonthBirthday) : 0);
    const formatDays = getFormatDays(restSecs);
    ID('months').innerHTML = ageMonths.toLocaleString() + " " + (ageMonths === 1 ? lang[lg].m : lang[lg].ms) + " " + formatDays;
}

const getWeeks = (as, b, t, hwb) => {
    const tw = t.getDay();
    const bw = b.getDay();
    const diff = tw < bw ? 7 - (bw - tw) : (tw - bw) + (hwb ? 0 : 7);
    const ageWeeks = (as >= 0 ? Math.floor(as / secWeek) : 0);
    const lastWeekBirthday = new Date(t.getFullYear(), t.getMonth(), (t.getDate() - diff), b.getHours(), b.getMinutes(), b.getSeconds());
    let restSecs = (as >= 0 ? m2s(t) - m2s(lastWeekBirthday) : 0);
    const formatDays = getFormatDays(restSecs);
    ID('weeks').innerHTML = ageWeeks.toLocaleString() + " " + (ageWeeks === 1 ? lang[lg].w : lang[lg].ws) + " " + formatDays;
}

const getFormatDays = (restSecs) => {
    const ageDays = Math.floor(restSecs / secDay); restSecs = restSecs - (ageDays * secDay);
    const hours = Math.floor(restSecs / secHour); restSecs = restSecs - (hours * secHour);
    const minutes = Math.floor(restSecs / secMinute); restSecs = restSecs - (minutes * secMinute);
    const seconds = restSecs;
    return ageDays.toLocaleString() + " " + (ageDays === 1 ? lang[lg].d : lang[lg].ds) + " " + fn(hours) + ":" + fn(minutes) + ":" + fn(seconds);
}

const getFormatHours = (restSecs) => {
    const ageHours = Math.floor(restSecs / secHour); restSecs = restSecs - (ageHours * secHour);
    const minutes = Math.floor(restSecs / secMinute); restSecs = restSecs - (minutes * secMinute);
    const seconds = restSecs;
    return ageHours.toLocaleString() + " " + (ageHours === 1 ? lang[lg].h : lang[lg].hs) + " " + fn(minutes) + ":" + fn(seconds);
}

const getFormatMinutes = (restSecs) => {
    const ageMinutes = Math.floor(restSecs / secMinute); restSecs = restSecs - (ageMinutes * secMinute);
    const seconds = restSecs;
    return ageMinutes.toLocaleString() + " " + (ageMinutes === 1 ? lang[lg].mn : lang[lg].mns) + " " + fn(seconds);
}