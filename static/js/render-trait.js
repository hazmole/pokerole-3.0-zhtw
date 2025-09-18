function renderTrait(traitText) {
  const tagArr = traitText.split('|');
  const labelText = getTraitLabelText(tagArr);
  const htmlContent = getTraitInner(tagArr);

  return `<div class="TraitIcon" title="${labelText}">${ htmlContent }</div>`;

  // =============
  function getTraitLabelText(tagArr) {
    const ticket = tagArr.join('|');
    switch(ticket) {
      case "target|one-foe": return "單體敵方目標";
      case "target|rand-foe": return "隨機敵方目標";
      case "target|aoe-foe": return "範圍內所有敵方目標";
      case "target|self": return "以自己為目標";
      case "target|one-ally": return "單體隊友目標";
      case "target|aoe-ally": return "以自己和範圍內所有隊友為目標";
      case "target|aoe-all": return "範圍內全體目標";
      case "target|field": return "以戰場為目標";
      case "target|ally-field": return "以己方戰場為目標";
      case "target|foe-field": return "以敵方戰場為目標";
      case "target|one-any": return "任意單體目標";
      case "effect|bite": return "啃咬類招式";
      case "effect|cutter": return "切割類招式";
      case "effect|fist": return "拳擊類招式";
      case "effect|projectile": return "投彈類招式";
      case "effect|wind": return "風類招式";
      case "effect|powder": return "粉末類招式";
      case "effect|sound": return "聲音類招式";
      case "effect|successive-2": return "雙重行動";
      case "effect|successive-3": return "三重行動";
      case "effect|successive-5": return "連續行動";
      case "effect|block": return "阻擋";
      case "effect|charge": return "蓄力";
      case "effect|entry-hazard": return "入場危害";
      case "effect|force-field": return "防護力場";
      case "effect|heal-basic": return "基礎治療";
      case "effect|heal-complete": return "強效治療";
      case "effect|high-crit": return "高要害率";
      case "effect|lethal": return "致命傷害";
      case "effect|recharge": return "重新充能";
      case "effect|must-hit": return "必中";
      case "effect|ongoing-dmg": return "持續傷害";
      case "effect|out-of-range": return "範圍外";
      case "effect|rampage": return "狂暴";
      case "effect|ranged": return "非接觸類招式";
      case "effect|recoil": return "反作用傷害";
      case "effect|shield": return "護盾類招式";
      case "effect|switch-self": return "使用者方替換招式";
      case "effect|switch-foe": return "敵方替換招式";
      case "effect|unique": return "專用招式";
      case "effect|vulnerable": return "脆弱";
      case "effect|copy": return "複製招式";
      case "weather|sunny": return "大晴天";
      case "weather|rain": return "下雨";
      case "weather|sandstorm": return "沙暴";
      case "weather|hail": return "冰雹";
      case "weather|snowy": return "下雪";
    }
    switch(tagArr[0]) {
      case "roll": return `機率骰 ${tagArr[1]}`;
      case "text": return getTextIconText(tagArr.slice(1)).replace('\n', '');
      case "duration": 
        switch(tagArr[1]) {
          case "scene": return '持續整個場景';
          case "forever": return '持續永久';
          default: return `持續 ${tagArr[1]} 輪`;
        }
      case "category": 
        switch(tagArr[1]) {
          case "physical": return "物理招式";
          case "special": return "特殊招式";
          case "hybrid": return "物理/特殊招式";
        }
      case "frame":
        const ticket2 = tagArr.slice(1, 3).join('|');
        const ticket3 = tagArr.slice(1, 4).join('|');
        const ticket4 = tagArr.slice(1, 5).join('|');

        if (ticket2=="low-acc|down")  return `低命中率-${tagArr[3]}`;
        if (ticket2=="reaction|up")   return `先制反應+${tagArr[3]}`;
        if (ticket2=="reaction|down") return `後制反應-${tagArr[3]}`;
        if (ticket2=="heal|ailment")  return `治療狀態`;
        if (ticket2=="heal|hp")       return `治療 ${tagArr[4]} 點 HP`;
        if (tagArr[1]=="foe" || tagArr[1]=="user") {
          const target = (tagArr[1]=="foe")? "目標": "自己";
          if (tagArr[3]=="up" || tagArr[3]=="down") {
            const effect = (tagArr[3]=="up")? "提升": "降低";
            return `${effect}${target} ${tagArr[4]} 階${Utils.getPokeAttribute(tagArr[2])}`;
          }
          if (ticket4=="user|damage|+|roll") return `增加 ${tagArr[5]} 顆傷害骰`;
          if (ticket4=="user|damage|-|roll") return `減少 ${tagArr[5]} 顆傷害骰`;
          if (ticket3=="user|damage|-")      return `受到傷害減輕 ${tagArr[4]} 點`;
          if (ticket2=="foe|damage")         return `造成 ${tagArr[3]} 點傷害`;
          if (ticket2=="foe|power")          return `威力歸0`;
        }
        if (Utils.getPokeAilment(tagArr[1])) {
          if (tagArr[2]=="roll")   return `骰 ${ tagArr[3] } 顆機率骰以造成${ Utils.getPokeAilment(tagArr[1]) }`;
          if (tagArr[2]=="never")  return `防止造成${ Utils.getPokeAilment(tagArr[1]) }`;
          if (tagArr[2]=="always") return `必定造成${ Utils.getPokeAilment(tagArr[1]) }`;
          return `造成${ Utils.getPokeAilment(tagArr[1]) }`;
        }
    }
    return ticket;
  }
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
    const displayText = getTextIconText(params).replace('\n', '<br>');
    return `<div class="TextOuter ${bgClass}TypeBgColor"><div class="value">${displayText}</div></div>`;
  }
  function getTextIconText(params) {
    switch(params[1]) {
      case "move": return `${Utils.getPokeType(params[0])}屬性\n招式`;
      case "type": return `${Utils.getPokeType(params[0])}屬性`;
      case "add-type": return `追加\n${Utils.getPokeType(params[0])}屬性`;
      case "immune": return `免疫\n${Utils.getPokeType(params[0])}屬性`;
      case "change-type":     return "變更屬性";
      case "change-ability":  return "變更特性";
      case "disable-ability": return "無效特性";
      case "halve-weight":    return "重量減半";
    }
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
      }
      if (Utils.getPokeAilment(fType)) {
        return Utils.getPokeAilment(fType);
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