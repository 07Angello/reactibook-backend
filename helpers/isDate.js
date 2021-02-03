const moment = require('moment');

const isDate = ( value ) => {
    
    if ( !value ) {
        return false;
    }

    const incomingDate = moment( value );
    if ( incomingDate.isValid() ) {
        return true
    } else {
        return false;
    }

}

module.exports = {
    isDate
}
