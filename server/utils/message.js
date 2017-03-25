const mapsEndpoint = 'https://www.google.co.uk/maps?q=';
let untidyDate = new Date().toISOString();
let cleanDate = tidyDate(untidyDate);


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

  return dateString.split('T').join(' @ ').split('.')[0];
}
module.exports = { generateMessage,generateLocationMessage,mapsEndpoint };
