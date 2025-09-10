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