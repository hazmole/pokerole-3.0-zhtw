function renderTrait(traitText) {
  const tagArr = traitText.split('|');
  const htmlContent = getTraitInner(tagArr);

  return `<div class="TraitIcon">${ htmlContent }</div>`;

  // =============
  function getTraitInner(tagArr) {
    switch(tagArr[0]) {
     case "target": return getTargetIcon(tagArr[1]);
     case "effect": return getEffectIcon(tagArr[1]);
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
}