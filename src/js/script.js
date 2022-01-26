import { VitrineControll } from "./controllers/Vitrine.js";
import { CarrinhoControll } from "./controllers/Carrinho.js";
VitrineControll.addEventFilter();
CarrinhoControll.criandoDOM();
document.querySelector(".filterContainer__btn--todos").click();