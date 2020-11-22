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
    concord.add('You are welcome');
    concord.find('you');
    expect(concord.set.length).toEqual(3);
    concord.find('trans');
    expect(concord.set.length).toEqual(0);
  });

  test('Check the right context sort', () => {
    const concord = new Concord();
    concord.add('le chat joue a la pelote');
    concord.add('le Chat joue à la balle');
    concord.add('le chaton joue avec le stylo');
    concord.add('le chaton joue, avec le crayon');
    concord.find('joue');
    expect(concord.set.length).toEqual(4);
    concord.buildSortCd('fr');
    expect(concord.set[0].cd).toEqual(' à la balle');
    expect(concord.set[1].cd).toEqual(' a la pelote');
    expect(concord.set[2].cd).toEqual(', avec le crayon');
    expect(concord.set[3].cd).toEqual(' avec le stylo');
  });

  test('Check the left context sort', () => {
    const concord = new Concord();
    concord.add('le chat joue a la pelote');
    concord.add('le chien joue a la pelote');
    concord.add('la chatte joue avec un stylo');
    concord.add('la chienne joue les os');
    concord.find('joue');
    expect(concord.set.length).toEqual(4);
    concord.buildSortCg('fr');
    expect(concord.set[0].cg).toEqual('le chat ');
    expect(concord.set[1].cg).toEqual('la chatte ');
    expect(concord.set[2].cg).toEqual('le chien ');
    expect(concord.set[3].cg).toEqual('la chienne ');
  });

  test('Reverse the order to descent', () => {
    const concord = new Concord();
    concord.add('le chat joue a la pelote');
    concord.add('le chien joue a la pelote');
    concord.add('la chatte joue avec un stylo');
    concord.add('la chienne joue les os');
    concord.find('joue');
    expect(concord.set.length).toEqual(4);
    concord.buildSortCg('fr');
    concord.toggleSort();

    expect(concord.set[3].cg).toEqual('le chat ');
    expect(concord.set[2].cg).toEqual('la chatte ');
    expect(concord.set[1].cg).toEqual('le chien ');
    expect(concord.set[0].cg).toEqual('la chienne ');
  });

  test('Reverse the order 2 times', () => {
    const concord = new Concord();
    concord.add('le chat joue a la pelote');
    concord.add('le Chat joue à la balle');
    concord.add('le chaton joue avec le stylo');
    concord.add('le chaton joue, avec le crayon');
    concord.find('joue');
    concord.buildSortCd('fr');
    concord.toggleSort();
    concord.toggleSort();
    expect(concord.set[0].cd).toEqual(' à la balle');
    expect(concord.set[1].cd).toEqual(' a la pelote');
    expect(concord.set[2].cd).toEqual(', avec le crayon');
    expect(concord.set[3].cd).toEqual(' avec le stylo');
  });
});
