function renderTrait(traitText) {
  const tagArr = traitText.split('|');
  const htmlContent = getTraitInner(tagArr);

  return `<div class="TraitIcon" title="${traitText}">${ htmlContent }</div>`;

  // =============
  function getTraitInner(tagArr) {
    switch(tagArr[0]) {
     case "target":   return getSingleImageIcon(tagArr[1]);
     case "effect":   return getSingleImageIcon(tagArr[1]);
     case "weather":  return getSingleImageIcon(tagArr[1]);
     case "roll":     return getRollIcon(tagArr[1]);
     case "text":     return getTextIcon(tagArr.slice(1));
     case "duration": return getDurationIcon(tagArr[1]);
     case "category": return getCategoryIcon(tagArr[1]);
     case "frame":    return getFrameIcon(tagArr.slice(1));
    }
    return "";
  }

  function getSingleImageIcon(text) {
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

        case "sunny": return "weather-sunny.png";
        case "rain": return "weather-rain.png";
        case "sandstorm": return "weather-sandstorm.png";
        case "hail": return "weather-hail.png";
        case "snowy": return "weather-snowy.png";
      }
      console.error("Unknown Single-Image Icon!", text);
    }() }">`;
  }
  function getCategoryIcon(category) {
    return `<div class="CategoryOuter"><img class="Image" src="${ROOT_PATH}/images/icons/${
      function() {
        switch(category) {
          case "physical": return "move-category-physical.png";
          case "special": return "move-category-special.png";
          case "hybrid": return "move-category-hybrid.png";
        }
      }()
    }"></div>`;
  }
  function getTextIcon(params) {
    const bgClass = params[0][0].toUpperCase() + params[0].slice(1);
    const displayText = function(){
      switch(params[1]) {
        case "move": return `${Utils.getPokeType(params[0])}屬性<br>招式`;
        case "type": return `${Utils.getPokeType(params[0])}屬性`;
        case "add-type": return `追加<br>${Utils.getPokeType(params[0])}屬性`;
        case "immune": return `免疫<br>${Utils.getPokeType(params[0])}屬性`;
        case "change-type":     return "變更屬性";
        case "change-ability":  return "變更特性";
        case "disable-ability": return "無效特性";
        case "halve-weight":    return "重量減半";
      }
    }();
    return `<div class="TextOuter ${bgClass}TypeBgColor"><div class="value">${displayText}</div></div>`;
  }

  function getRollIcon(num) {
    return `<div class="RollOuter">${ [
      `<img class="Image" src="${ROOT_PATH}/images/icons/roll-dice.png">`,
      `<div class="Value">${num}</div>`
    ].join('') }</div>`;
  }
  function getHeartIcon(num) {
    return `<div class="HealOuter">${ [
      `<img class="Image" src="${ROOT_PATH}/images/icons/heart.svg">`,
      `<div class="Value">${num}</div>`
    ].join('') }</div>`;
  }
  function getDurationIcon(num) {
    if (num === "scene") { num = "↻"; }
    if (num === "forever") { num = "∞"; }
    return `<div class="DurationOuter">${ [
      `<img class="Image" src="${ROOT_PATH}/images/icons/icon-duration.png">`,
      `<div class="Value">${num}</div>`
    ].join('') }</div>`;
  }

  function getFrameIcon(params) {
    const fType = params[0];
    const fTitle   = getFrameTitle();
    const fContent = getFrameContent();
    
    return `<div class="FrameOuter ${fType}">${ [
      `<div class="FrameTitle">${ fTitle }</div>`,
      `<div class="FrameInner ${fType}">${ fContent }</div>`,
    ].join('') }</div>`;

    // ===============
    function isEasyFrameTicket() {
      switch(fType) {
        case "reaction":
        case "low-acc":
        case "ailment":
        case "confuse":
        case "flinch":
        case "poison":
        case "badpoison":
        case "paralysis":
        case "freeze":
        case "sleep":
        case "love":
        case "disabled":
        case "burn":
        case "burn1":
        case "burn2":
        case "burn3":
          return true;
      }
      return false;
    }
    function getFrameTitle() {
      switch(fType) {
        case "reaction": return "反應";
        case "low-acc":  return "命中";
        case "heal": {
          switch(params[1]) {
            case "ailment": return "治療狀態";
            case "hp":      return "治療";
          }
        }
        case "ailment":   return "異常狀態"
        case "confuse":   return "混亂";
        case "flinch":    return "畏縮";
        case "poison":    return "中毒";
        case "badpoison": return "劇毒";
        case "paralysis": return "麻痺";
        case "freeze":    return "冰凍";
        case "sleep":     return "睡眠";
        case "love":      return "著迷";
        case "disabled":  return "定身法";
        case "burn":      return "灼傷";
        case "burn1":     return "灼傷1級";
        case "burn2":     return "灼傷2級";
        case "burn3":     return "灼傷3級";
      }
      const titleKey = params[1];
      switch(titleKey) {
        case "power": return "威力";
        case "damage": return "傷害";
        case "all-attribute": return "全能力";
        case "rand": return "隨機能力";
      }
      if (Utils.getPokeAttribute(titleKey) !== "") {
        return Utils.getPokeAttribute(titleKey);
      }
      return titleKey;
    }
    function getFrameContent() {
      const ticketArr = isEasyFrameTicket()? params.slice(1): params.slice(2);
      const contentArr = [];
      for (let i=0; i<ticketArr.length; i++) {
        const ticket = ticketArr[i];
        switch(ticket) {
          case "+": contentArr.push(getPrefix("+")); break;
          case "-": contentArr.push(getPrefix("-")); break;
          case "up": contentArr.push(getPrefix("⬆", "arrow")); break;
          case "down": contentArr.push(getPrefix("⬇", "arrow")); break;
          case "roll": contentArr.push(getRollIcon(ticketArr[++i])); break;
          case "heart": contentArr.push(getHeartIcon(ticketArr[++i])); break;
          case "always": contentArr.push(getAlwaysIcon()); break;
          case "never":  contentArr.push(getNeverIcon()); break;
          default:
            contentArr.push(getValue(ticket)); break;
        }
      }
      return contentArr.join('');
      // ==========
      function getPrefix(text, className = "") { return `<div class="prefix ${className}">${text}</div>`; }
      function getValue(text) {  return `<div class="value">${text}</div>`; }
      function getAlwaysIcon() { return `<div class="AlwaysMark">✔</div>`; }
      function getNeverIcon() { return `<div class="NeverMark">✖</div>`; }
    }
  }
}