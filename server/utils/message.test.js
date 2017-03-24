const expect = require('expect');
const {generateMessage} = require('./message.js');

describe('generateMessage', () => {
  it('it should generate correct object', (done) => {
    const text = 'This text is irrelevant';
    const from = 'Madeleine';
    //store res in variable
    let actual = generateMessage(from,text);
    //assert from matches value passed in
    expect(actual.from).toBe(from,`Expect the from message to be ${from}`);
    //assert text match
    expect(actual.text).toBe(text,`Expect the text to be ${text}`);
    expect(actual).toInclude({
      from,
      text
    });
    //assert createdAt is number
    expect(actual.createdAt).toBeA('number');
    done();
  });
});
