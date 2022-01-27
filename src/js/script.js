import {VitrineControll}  from "./controllers/Vitrine.js";
import {CarrinhoControll} from "./controllers/Carrinho.js";
import {ExtraControll}    from "./controllers/Extra.js";
document.addEventListener('DOMContentLoaded', () => {
    ExtraControll   .addEvents();
    VitrineControll .addEvents();
    CarrinhoControll.montarCarrinho();
    document.querySelector(".filterContainer__btn--todos").click();
}, false);