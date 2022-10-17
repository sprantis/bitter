// Code referenced from Module 14 - Mini Project

// Day.js documentation: https://day.js.org/en/
const dayjs = require('dayjs')

module.exports = {
    // Helper function to Format date as MM/DD/YYYY using day.js
    formatDate: (date) => {
        return `${dayjs(date).format("MM/DD/YYYY")}`
    },
    // Helper function to compare values - Not currently used
    ifEquals: function(arg1, arg2, options) {
        if (arg1 == arg2){ return options.fn(this); }
        return options.inverse(this);
    }
};
