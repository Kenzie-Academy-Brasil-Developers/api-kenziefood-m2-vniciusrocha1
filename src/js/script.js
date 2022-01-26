import {VitrineControll}    from "./controllers/Vitrine.js";
import {CarrinhoControll}   from "./controllers/Carrinho.js";
import {KenzieFoodControll}   from "./controllers/KenzieFood.js";
VitrineControll.addEventFilter();
CarrinhoControll.criandoDOM();
document.querySelector(".filterContainer__btn--todos").click();


// console.log('get', await KenzieFoodControll.get())
console.log('post', await KenzieFoodControll.post({
    "nome": "Bolinho",
    "preco": 5,
    "categoria":"Doce",
    "imagem": "https://picsum.photos/200/300"
}));
// console.log('patch', await KenzieFoodControll.patch())
// console.log('delete', await KenzieFoodControll.delete())