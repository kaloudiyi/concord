class Concord {
  constructor() {
    this.data = [];
  }

  add(sentence) {
    this.data.push(sentence);
  }

  find(keyword) {
    const res = [];
    const size = keyword.length;
    this.data.forEach(sentence => {
      const rech = RegExp('\\b' + keyword + '\\b', 'gi').exec(sentence);
      if (rech)
        res.push({
          cg: sentence.substr(0, rech.index),
          kw: sentence.substr(rech.index, size),
          cd: sentence.substr(rech.index + size)
        });
    });
    return res;
  }
}

module.exports = { Concord };
