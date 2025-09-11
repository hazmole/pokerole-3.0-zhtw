function renderTrait(traitText) {
  const tagArr = traitText.split('|');
  const htmlContent = getTraitInner(tagArr);

  return `<div class="TraitIcon" title="${traitText}">${ htmlContent }</div>`;

  // =============
  function getTraitInner(tagArr) {
    switch(tagArr[0]) {
     case "target": return getTargetIcon(tagArr[1]);
     case "effect": return getEffectIcon(tagArr[1]);
     case "roll":  return getRollIcon(tagArr[1]);
     case "duration": return getDurationIcon(tagArr[1]);
     case "frame": return getFrameIcon(tagArr.slice(1));
    }
    return "";
  }

  function getTargetIcon(text) {
    return `<img src="${ROOT_PATH}/images/icons/${ function() {
      switch(text) {
        case "one-foe": return "target-foe-one.png";
        case "rand-foe": return "target-foe-rand.png";
        case "aoe-foe": return "target-foe-all.png";
        case "self": return "target-ally-self.png";
        case "one-ally": return "target-ally-one.png";
        case "aoe-ally": return "target-ally-all.png";
        case "aoe-all": return "target-aoe-all.png";
        case "field": return "target-field.png";
        case "ally-field": return "target-field-ally.png";
        case "foe-field": return "target-field-foe.png";
        case "one-any": return "target-any-one.png";
      }
      console.error("Unknown Target-icon!");
    }() }">`;
  }
  function getEffectIcon(text) {
    return `<img src="${ROOT_PATH}/images/icons/${ function() {
      switch(text) {
        case "bite": return "effect-bite.png";
        case "cutter": return "effect-cutter.png";
        case "fist": return "effect-fist.png";
        case "projectile": return "effect-projectile.png";
        case "wind": return "effect-wind.png";
        case "powder": return "effect-powder.png";
        case "sound": return "effect-sound.png";
        case "successive-2": return "effect-successive-2.png";
        case "successive-3": return "effect-successive-3.png";
        case "successive-5": return "effect-successive-5.png";
        case "block": return "effect-block.png";
        case "charge": return "effect-charge.png";
        case "entry-hazard": return "effect-entry-hazard.png";
        case "force-field": return "effect-force-filed.png";
        case "heal-basic": return "effect-heal-basic.png";
        case "heal-complete": return "effect-heal-complete.png";
        case "high-crit": return "effect-high-crit.png";
        case "lethal": return "effect-lethal.png";
        case "recharge": return "effect-recharge.png";
        case "must-hit": return "effect-never-miss.png";
        case "ongoing-dmg": return "effect-ongoing.png";
        case "out-of-range": return "effect-out-of-range.png";
        case "rampage": return "effect-rampage.png";
        case "ranged": return "effect-ranged.png";
        case "recoil": return "effect-recoil.png";
        case "shield": return "effect-shield.png";
        case "switch-self": return "effect-switcher-self.png";
        case "switch-foe": return "effect-switcher-foe.png";
        case "unique": return "effect-unique.png";
        case "vulnerable": return "effect-vulnerable.png";
        case "copy": return "effect-copy.png";
      }
      console.error("Unknown Target-icon!");
    }() }">`;
  }
  function getRollIcon(param) {
    return `<div class="RollOuter">${ [
      `<img class="Image" src="${ROOT_PATH}/images/icons/roll-dice.png">`,
      `<div class="Value">${param}</div>`
    ].join('') }</div>`;
  }
  function getHealIcon(param) {
    return `<div class="HealOuter">${ [
      `<img class="Image" src="${ROOT_PATH}/images/icons/heart.svg">`,
      `<div class="Value">${param}</div>`
    ].join('') }</div>`;
  }
  function getDurationIcon(param) {
    if (param === "scene") { param = "↻"; } 
    return `<div class="DurationOuter">${ [
      `<img class="Image" src="${ROOT_PATH}/images/icons/duration.png">`,
      `<div class="Value">${param}</div>`
    ].join('') }</div>`;
  }
  function getFrameIcon(params) {
    const frameType = params[0];
    const frameTitle = getFrameTitle(params[0], params[1]);
    return `<div class="FrameOuter ${frameType}">${ [
      `<div class="FrameTitle">${ frameTitle }</div>`,
      `<div class="FrameInner ${frameType}">${ getFrameContent() }</div>`,
    ].join('') }</div>`;
    // ===============
    function getFrameTitle(fType, fName) {
      switch(fType) {
        case "reaction": return "反應";
        case "low-acc":  return "命中";
        case "heal":     return "治療";
        // condition
        case "confuse":   return "混亂";
        case "flinch":    return "畏縮";
        case "poison":    return "中毒";
        case "paralysis": return "麻痺";
        case "freeze":    return "冰凍";
        case "sleep":     return "睡眠";
        case "burn1":     return "灼傷1級";
        case "burn2":     return "灼傷2級";
        case "burn3":     return "灼傷3級";
      }
      if (Utils.getPokeAttribute(fName) !== "") {
        return Utils.getPokeAttribute(fName);
      }
      return fName;
    }
    function getFrameContent() {
      switch(frameType) {
        case "buff":   return [ getPrefix("↑"), getValue(params[2]) ].join('');
        case "debuff": return [ getPrefix("↓"), getValue(params[2]) ].join('');
        case "low-acc": return [ getPrefix("↓"), getValue(params[1]) ].join('');
        case "reaction": 
          switch(params[1]) {
            case "up": return [ getPrefix("↑"), getValue(params[2]) ].join('');
            case "down": return [ getPrefix("↓"), getValue(params[2]) ].join('');
          }
          break;
        case "heal": return getHealIcon(params[1]);
      }
      switch(params[1]) {
        case "roll": return getRollIcon(params[2]);
      }
      return "?";
      // ==========
      function getPrefix(text) { return `<div class="arrow">${text}</div>`; }
      function getValue(text) {  return `<div class="value">${text}</div>`; }
    }
  }
}