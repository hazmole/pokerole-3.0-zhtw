function renderPokemon(pokemonObj, options) {
  const mainType = pokemonObj.type[0];

  return `<div class="Card Pokemon ${mainType}TypeBgColor">${[
    `<div class="Header">${ getHeaderBlock() }</div>`,
    `<div class="Body">${   [
      getShapeInfoBlock(),
      getBasicDataBlock(),
      getAttributeBlock(),
      getEvolveBlock(),
    ].join('') }</div>`,
    getMovesBlock(),
    `<div class="Footer">${ getFooterBlock() }</div>`,
  ].join('')}</div>`;

  // =====================
  function getHeaderBlock() {
    const ID = pokemonObj.ID.split('-')[0];
    
    const layoutArr = [];
    layoutArr.push(`<div class="Name">#${ID} ${pokemonObj.name} <span class="Alias">${pokemonObj.alias}</span></div>`);
    pokemonObj.type.forEach((t) => {
      layoutArr.push(`<div class="Type ${t}TypeBgColor">${Utils.getPokeType(t)}</div>`);
    });

    return layoutArr.join('');
  }
  function getShapeInfoBlock() {
    const category = pokemonObj.misc.desc.split('\n')[0];
    const isNovice = (pokemonObj.rank == "starter") || (pokemonObj.rank == "rookie");
    return `<div class="ShapeInfo dataBlock">${[
      `<img class="image" src="${ROOT_PATH}/images/pokedex/${pokemonObj.ID}.png">`,
      (isNovice)? `<img class="novice-icon" src="${ROOT_PATH}/images/icons/novice.png">`: '',
      `<div class="category ${mainType}TypeBgColor"><div>${category}</div></div>`,
      `<div class="size">${pokemonObj.misc.h} / ${pokemonObj.misc.w}</div>`,
    ].join('')}</div>`;
  }
  function getBasicDataBlock() {
    return `<div class="BasicData dataBlock easyColumn">${[
      `<div class="title">建議階級</div><div class="label">${[
        `<img class="inline-rank" src="${ROOT_PATH}/images/icons/ball-${pokemonObj.rank}.png">`,
        Utils.getRank(pokemonObj.rank),
      ].join('')}</div>`,
      `<div class="title">基礎 HP</div><div class="label" style="font-size:1.2em;">${pokemonObj.baseHP}</div>`,
      `<div class="title">特性</div><div class="label">${pokemonObj.ability.join('<br>')}</div>`,
    ].map(c => `<div class="entry easyRow">${c}</div>`).join('')}</div>`;
  }
  function getAttributeBlock() {
    return `<div class="AttributeData dataBlock easyColumn">${[
      `<div class="title">力量</div><div class="label">${getAttributeValue('str')}</div>`,
      `<div class="title">靈巧</div><div class="label">${getAttributeValue('dex')}</div>`,
      `<div class="title">活力</div><div class="label">${getAttributeValue('vit')}</div>`,
      `<div class="title">特殊</div><div class="label">${getAttributeValue('spe')}</div>`,
      `<div class="title">洞察</div><div class="label">${getAttributeValue('ins')}</div>`,
    ].map(c => `<div class="entry easyRow">${c}</div>`).join('')}</div>`;
  }
  function getAttributeValue(key) {
    const curVal = pokemonObj.attributes[`${key}`];
    const maxVal = pokemonObj.attributes[`${key}-max`];
    let text = '';
    for(let i=0; i<maxVal; i++) {
      text += (i<curVal)? "●": "○";
    }
    return text;
  }
  function getEvolveBlock() {
    const contentArr = [];
    contentArr.push(`<div class="entry easyRow"><div class="title">進化階段</div><div class="label">${pokemonObj.evolve.stage}</div></div>`);
    if (pokemonObj.evolve.time)
      contentArr.push(`<div class="entry easyRow"><div class="title">進化速度</div><div class="label">${pokemonObj.evolve.time}</div></div>`);
    if (pokemonObj.evolve.with)
      contentArr.push(`<div>透過 ${pokemonObj.evolve.with} 進化</div>`);

    return `<div class="EvolveData dataBlock easyColumn">${ contentArr.join('') }</div>`;
  }
  function getMovesBlock() {
    return `<div class="MoveList">${[
      `<button onClick="toggleMoveList(this)">招式表</button>`,
      `<div class="MoveTable hidden">${pokemonObj.moves.map( moveTag => getMoveEntry(moveTag) ).join('')}</div>`,
    ].join('')}</div>`;
  }
  function getMoveEntry(moveTag) {
    const moveObj = MOVES[moveTag.idx];
    if (!moveObj) {
      console.error(pokemonObj.ID, moveTag);
      return '';
    }

    return `<div class="moveEntry easyRow">${[
      `<img class="rank-icon" src="${ROOT_PATH}/images/icons/ball-${moveTag.rank}.png">`,
      `<div class="move-type ${moveObj.type}TypeBgColor">${Utils.getPokeType(moveObj.type)}</div>`,
      `<div class="move-category ${moveObj.category}CategoryBgColor">${Utils.getMoveCategory(moveObj.category)}</div>`,
      `<div class="move-power">${moveObj.power}</div>`,
      `<div class="move-name">${    moveObj.name}</div>`,
      `<div class="move-popout"><a href="${ROOT_PATH}/database/move-info#${moveObj.name}" target="_blank"><img src="${ROOT_PATH}/images/icons/pop-out.svg"></a></div>`,
    ].join('')}</div>`;
  }
  function getFooterBlock() {
    return pokemonObj.misc.desc.split('\n').slice(1).join('');
  }
}