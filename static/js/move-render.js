
function renderMove(elem, moveObj) {
  const layoutArr = [];

  layoutArr.push(`<div class="Header" >${ getHeaderBlock() }</div>`);
  layoutArr.push(`<div class="Body">${ [
    getTraitBlock(),
    getInfoBlock()
  ].join('') }</div>`);
  layoutArr.push(`<div class="Footer">${ getFooterBlock() }</div>`);

  elem.innerHTML = `<div class="MoveCard ${moveObj.type}">${layoutArr.join('')}</div>`;

  // =====================
  function getHeaderBlock() {
    const layoutArr = [];
    layoutArr.push(`<div class="Name">${moveObj.name}</div>`);
    layoutArr.push(`<div class="Power">威力：${moveObj.power}</div>`);
    layoutArr.push(`<div class="Category"><img class="${moveObj.category}"></img></div>`);
    return layoutArr.join('');
  }
  function getTraitBlock() {
    return `<div class="Traits"></div>`;
  }
  function getInfoBlock() {
    const entryArr = [];
    entryArr.push(`<div><b>屬性</b>：${moveObj.type}</div>`);
    entryArr.push(`<div><b>命中</b>：${moveObj.acc_roll}</div>`);
    entryArr.push(`<div><b>傷害</b>：${moveObj.dmg_roll}</div>`);
    return `<div class="Info">${ entryArr.join('') }</div>`;
  }
  function getFooterBlock() {
    return moveObj.desc;
  }
}