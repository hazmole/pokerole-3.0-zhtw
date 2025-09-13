
function renderMove(moveObj, options) {
  const layoutArr = [];
  const isCollapsedMode = !!options.isCollapsed; 
  
  layoutArr.push(`<div class="Header ${isCollapsedMode? "clickable": ""}" ${isCollapsedMode? "onclick='toggleMove(this)'": ""} >${ getHeaderBlock() }</div>`);
  layoutArr.push(`<div class="Body ${isCollapsedMode? "hidden": ""}">${ [
    getTraitBlock(),
    getInfoBlock()
  ].join('') }</div>`);
  layoutArr.push(`<div class="Footer ${isCollapsedMode? "hidden": ""}">${ getFooterBlock() }</div>`);

  return `<div class="MoveCard ${moveObj.type}TypeBgColor">${layoutArr.join('')}</div>`;

  // =====================
  function getHeaderBlock() {
    const layoutArr = [];
    layoutArr.push(`<div class="Name">${moveObj.name} <span class="Alias">${moveObj.alias}</span></div>`);
    layoutArr.push(`<div class="Power">威力：${moveObj.power}</div>`);
    layoutArr.push(`<div class="Category"><img src="${ROOT_PATH}/images/icons/${ function() {
      switch(moveObj.category) {
        case "physical": return "move-category-physical.png";
        case "special": return "move-category-special.png";
        case "support": return "move-category-support.png";
        case "both": return "move-category-hybrid.png";
      }
    }()}"></img></div>`);
    return layoutArr.join('');
  }
  function getTraitBlock() {
    return `<div class="Traits">${ moveObj.traits.map( t => {
      const matchResult = t.match(/^\*+/);
      let ticket = t;
      let note = "";
      if (matchResult !== null) {
        note = matchResult[0];
        ticket = t.slice(note.length);
      }
      return `<div class="easyRow" style="gap:2px">${note}${renderTrait(ticket)}</div>`;
    }).join('') }</div>`;
  }
  function getInfoBlock() {
    const entryArr = [];
    entryArr.push(`<div><b>屬性</b>：${Utils.getPokeType(moveObj.type)}</div>`);
    entryArr.push(`<div><b>命中</b>：${moveObj.acc_roll}</div>`);
    entryArr.push(`<div><b>傷害</b>：${moveObj.dmg_roll}</div>`);
    if (moveObj.effect) {
      entryArr.push(`<div><b>額外效果</b>：</div>`);
      entryArr.push(`<div class="ExtraEffect">${moveObj.effect}</div>`);
    }
    return `<div class="Info">${ entryArr.join('') }</div>`;
  }
  function getFooterBlock() {
    return moveObj.desc;
  }
}