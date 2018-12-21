const { Concord } = require('./index');

describe('Concord', () => {
  test('Concord is a constructor', () => {
    expect(typeof Concord.prototype.constructor).toEqual('function');
  });

  test('Add a sentence', () => {
    const concord = new Concord();
    concord.add('This is a test.');
    expect(concord.data.includes('This is a test.')).toBeTruthy();
  });

  test('Select sentences with a keyword', () => {
    const concord = new Concord();
    concord.add('Can you translate this for me?');
    concord.add("I don't want to bother you.");
    concord.add("I'm very busy. I don't have time now.");

    console.log(concord.find('you'));
    expect(concord.find('you').length).toEqual(2);
    expect(concord.find('trans').length).toEqual(0);
  });
});
