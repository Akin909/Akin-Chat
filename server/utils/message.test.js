const expect = require('expect');
const { generateLocationMessage,generateMessage,mapsEndpoint } = require('./message.js');

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
    expect(actual.createdAt).toBeA('string');
    done();
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const lat = 'fakelat';
    const lon = 'fakelon';
    const user = 'FakeUser';
    const actual = generateLocationMessage(user,lat,lon);
    let expected = `${mapsEndpoint}${lat},${lon}`;

    expect(actual.url).toBe(expected);
    expect(actual).toInclude({
      from: user,
      url:expected
    });
  });


});
