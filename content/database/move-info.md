---
weight: 2
title: "招式詳情"
---

<div id="ThePanel"></div>
<div id="TheList"></div>


{{< include-data >}}
<script>
  window.onload = renderMoveInfo;
  window.onhashchange = renderMoveInfo;

  function renderMoveInfo() {
    const hash = window.location.hash;
    const key = decodeURI(hash.substring(1));
    
    const panelElem = document.getElementById("ThePanel");
    const moveIdx = MOVES.findIndex(mObj => mObj.name === key);
    const moveObj = MOVES[moveIdx];
    if (!moveObj) {
      panelElem.innerHTML = "找不到對應的招式...";
    } else {
      panelElem.innerHTML = renderMove(moveObj, {isCollapsed:false});
      panelElem.innerHTML += "<hr>";
      panelElem.innerHTML += "<b>能夠學會這個招式的寶可夢：</b>";

      const pokemonList = POKEDEX.filter( pokemon => pokemon.moves && pokemon.moves.some(mt => mt.idx === moveIdx) );
      const listElem = document.getElementById("TheList");
      listElem.innerHTML = pokemonList.map( pokemon => pokemon.name ).join('<br>')
    }
  }
</script>


