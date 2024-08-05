// Just functions we need
const { randomBytes } = require("node:crypto");
const moment = require("moment");

function randomString(length) {
    if (length % 2 !== 0) {
        length++;
    }

    return randomBytes(length / 2).toString("hex");
}

function todayDate() {
    return moment().format('YYYY-MM-DD');
}

module.exports = { randomString, todayDate };
