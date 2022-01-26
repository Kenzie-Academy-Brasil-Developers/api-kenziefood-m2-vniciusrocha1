import {VitrineControll}        from "./controllers/Vitrine.js";
import {CarrinhoControll}       from "./controllers/Carrinho.js";
VitrineControll.addEventFilter();
CarrinhoControll.criandoDOM();
document.querySelector(".filterContainer__btn--todos").click();
/*Testes dos extras
import {KenzieFoodControll}     from "./controllers/KenzieFood.js";
console.log('get',              await KenzieFoodControll.get());
                                await KenzieFoodControll.insertProducts();
console.log('patch',            await KenzieFoodControll.patch(2,{"nome":"teste"}));
                                await KenzieFoodControll.delete(1);
*/