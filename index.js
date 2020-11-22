class Concord {
  constructor() {
    this.data = []; // data
    this.set = []; // set searched
    this.sf = ''; // sort field
    this.asc = true; // sort order
  }

  add(sentence) {
    this.data.push(sentence);
  }

  find(keyword) {
    const size = keyword.length;
    this.set = [];
    this.data.forEach(sentence => {
      const rech = RegExp('\\b' + keyword + '\\b', 'gi').exec(sentence);
      if (rech)
        this.set.push({
          cg: sentence.substr(0, rech.index),
          kw: sentence.substr(rech.index, size),
          cd: sentence.substr(rech.index + size)
        });
    });
  }

  buildSortCd(lng = undefined) {
    this.sf = 'cd';
    this.asc = true;
    this.set = this.set
      .map(item => {
        return {
          sort: item.cd.split(/[ ,;:.?!]+/).join(' '),
          ...item
        };
      })
      .sort((a, b) => a.sort.localeCompare(b.sort));
  }

  buildSortCg(lng = undefined) {
    this.sf = 'cg';
    this.asc = true;
    this.set = this.set
      .map(item => {
        return {
          sort: item.cg
            .split(/[ ,;:.?!]+/)
            .reverse()
            .join(' '),
          ...item
        };
      })
      .sort((a, b) => a.sort.localeCompare(b.sort));
  }

  toggleSort() {
    this.asc = !this.asc;
    this.set = this.set.sort((a, b) =>
      this.asc ? a.sort.localeCompare(b.sort) : -a.sort.localeCompare(b.sort)
    );
  }
}

module.exports = { Concord };
