const {format} = require('date-fns');

function formatDate (date) {
    return format(new Date(date), 'MM/dd/yyyy h:mm' )
}

module.exports = {formatDate};