import {VitrineControll}        from "./controllers/Vitrine.js";
import {CarrinhoControll}       from "./controllers/Carrinho.js";
document.addEventListener('DOMContentLoaded', () => {
    VitrineControll.addEventFilter();
    CarrinhoControll.criandoDOM();
    document.querySelector(".filterContainer__btn--todos").click();
}, false);