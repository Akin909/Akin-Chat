const generateMessage = (from,text) => {
let untidyDate = new Date().toISOString();
let cleanDate = tidyDate(untidyDate);
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
module.exports = {generateMessage};
