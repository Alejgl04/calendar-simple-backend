const moment = require('moment');

const isDate = ( value ) => {
  
  if ( !value ) {
    return false;
  }

  const newDate = moment(value);
  if ( newDate.isValid() ) {
    return true;
  }
  else {
    return false;
  }


}

module.exports = {
  isDate
}