const PageSize = 50;

class MySearcher {
  constructor(ID, dataArr, renderFunc, filterFunc) {
    this.ID = ID;
    this.dataArr = dataArr;
    this.renderFunc = renderFunc;
    this.filterFunc = filterFunc;
  }

  Search(idx) {
    const ID = this.ID;
    const dataArray = this.dataArr;
    const renderFunc = this.renderFunc;

    const text = document.getElementById(`SearchTextInput-${ID}`)?.value || "";
    const resultArray = dataArray.filter(data => this.filterFunc(data, text));

    renderPagination(resultArray.length, idx);
    renderEntries(resultArray.slice(idx*PageSize, (idx+1)*PageSize));
    
    // =========
    function renderEntries(dataArr) {
      const elem = document.getElementById(`DataList-${ID}`);
      elem.innerHTML = dataArr.map(data => renderFunc(data)).join('');
    }
    function renderPagination(totalNum, activeIdx) {
      const pageNum = Math.ceil(totalNum / PageSize);
      const elems = [
        document.getElementById(`PaginationTop-${ID}`),
        document.getElementById(`PaginationBottom-${ID}`)
      ]
      
      const pageElemArr = [];
      for (let i=0; i<pageNum; i++) {
        const isActive = (activeIdx === i);
        pageElemArr.push(`<div class="PageBtn ${isActive? "active": "clickable"}" ${isActive? "": `onClick="emitSearchEvent('${ ID }', ${i})"`}>${i+1}</div>`);
      }
      for (let elem of elems) {
        elem.innerHTML = pageElemArr.join('');
      }
    }
  }
}

function emitSearchEvent(ID, page) {
  const event = new CustomEvent(`${ID}-search`, {
    detail: {
      page: page,
    }
  });

  document.dispatchEvent(event);
}