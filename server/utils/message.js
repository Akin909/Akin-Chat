const mapsEndpoint = 'https://www.google.co.uk/maps?q=';
let untidyDate = new Date().toISOString();
let cleanDate = tidyDate(untidyDate);

const time = ( function () {
  const date = Date.now();
  return function() { 
    return { timeSince:Date.now() - date, date:date };
  };
}());

console.log(time());

const generateLocationMessage = (from,lat,lon) => {
  return {
    from: from,
    url: `${ mapsEndpoint }${ lat },${ lon }`,
    createdAt:cleanDate
  };
};


const generateMessage = (from,text) => {
  return {
    from: from,
    text: text,
    createdAt:cleanDate
  };
};


/**
 * Takes a date string and formats it
 *
 * @param {String} dateString Current date to ISOString
 * @returns {String} Formatted date string
 */
function tidyDate(dateString) {
  const hourSecMins = dateString.split('T')[1].split('.')[0];
  const hourMins = hourSecMins.slice(0,hourSecMins.lastIndexOf(':'));
  const fullTime = dateString.split('T').join(' @ ').split('.')[0];
  if (Number(hourMins.slice(0,2)) > 12) {
    return hourMins.slice(0,2)  % 12 + hourMins.slice(2) + ' pm';
  }
  return hourMins + ' am';
}
module.exports = { generateMessage,generateLocationMessage,mapsEndpoint };
