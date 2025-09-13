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

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}