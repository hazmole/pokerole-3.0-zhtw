/* Provide general functions for other library */

const Utils = {};
Utils.getPokeType = function(key) {
  switch(key.toLowerCase()) {
    case "bug": return "蟲";
    case "normal": return "一般";
    case "dark": return "惡";
    case "dragon": return "龍";
    case "electric": return "電";
    case "fairy": return "妖精";
    case "fighting": return "格鬥";
    case "fire": return "火";
    case "flying": return "飛行";
    case "ghost": return "幽靈";
    case "grass": return "草";
    case "ground": return "地面";
    case "ice": return "冰";
    case "poison": return "毒";
    case "psychic": return "超能";
    case "rock": return "岩";
    case "steel": return "鋼";
    case "water": return "水";
  }
  return "???";
}
Utils.getPokeAttribute = function(key) {
  switch(key.toLowerCase()) {
    case "str":  return "力量";
    case "dex":  return "靈巧";
    case "vit":  return "活力";
    case "def":  return "防禦";
    case "sdef": return "特防";
    case "spe":  return "特殊";
    case "acc":  return "命中";
    case "all-attribute":  return "全能力值";
    case "rand": return "隨機能力值";
  }
  return "";
}
Utils.getPokeAilment = function(key) {
  switch(key.toLowerCase()) {
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
  return "";
}
Utils.getRank = function(key) {
  switch(key.toLowerCase()) {
    case "starter":  return "啟程級";
    case "rookie":   return "新手級";
    case "standard": return "標準級";
    case "advanced": return "進階級";
    case "expert":   return "專家級";
    case "ace":      return "王牌級";
    case "master":   return "大師級";
    case "champion": return "冠軍級";
  }
  return "";
}
Utils.getMoveCategory = function(key) {
  switch(key.toLowerCase()) {
    case "physical":  return "物理";
    case "special":   return "特殊";
    case "support":   return "變化";
  }
  return "";
}

Utils.allPokeTypes = function() {
  return [ "bug", "dark", "dragon", "electric", "fairy", "fighting", "fire", "flying", "ghost", "grass", "ground", "ice", "normal", "poison", "psychic", "rock", "steel", "water" ];
}

function toggleMove(elem) {
  const bodyElem = (elem).nextSibling;
  const footerElem = (bodyElem).nextSibling;
  bodyElem.classList.toggle("hidden");
  footerElem.classList.toggle("hidden");
}
function toggleMoveList(elem) {
  const bodyElem = (elem).nextSibling;
  bodyElem.classList.toggle("hidden");
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}