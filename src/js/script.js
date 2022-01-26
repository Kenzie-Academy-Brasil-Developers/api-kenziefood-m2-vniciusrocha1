import {VitrineControll}     from "./controllers/Vitrine.js";
import {CarrinhoControll}    from "./controllers/Carrinho.js";
import {KenzieFoodControll}  from "./controllers/KenzieFood.js";
import {produtos}            from "./mock/produtos.js";
VitrineControll.addEventFilter();
CarrinhoControll.criandoDOM();
document.querySelector(".filterContainer__btn--todos").click();
// console.log('get', await KenzieFoodControll.get())
// console.log('post', await KenzieFoodControll.makeAllPosts(produtos));
// console.log('patch', await KenzieFoodControll.patch())
// console.log('delete', await KenzieFoodControll.delete())