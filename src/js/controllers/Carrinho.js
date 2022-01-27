import { RotasControll } from "./Rotas.js";
class CarrinhoControll {
    static addEvents       = ()       => document.querySelectorAll('.cartContainer__trash').forEach(element => element.addEventListener('click', event => this.excluirCarrinho(event.target.closest('li').getAttribute('index'))));
    static getLocalStorage = ()       => JSON.parse(localStorage.getItem('carrinho'));
    static setLocalStorage = carrinho => localStorage.setItem('carrinho', JSON.stringify(carrinho));
    static montarCarrinho(){
        document.querySelector(".cartContainer__list").innerHTML = `
            <div class="aside__cartContainer--empty">
            <img class="cart__icon" src="/src/img/shopping-bag.png">
            <span class="list--span1">Ops!</span>
            <span class="list--span2">Por enquanto não temos produtos no carrinho</span>
            </div>`;
        let carrinho = this.getLocalStorage();
        if(carrinho !== null){
            carrinho.forEach((item, index) => {
                let {categoria=null, nome=null, preco=0, imagem=null, id=0} = item;
                let valorConvertido = preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
                let html = `
                    <li index="${index}">
                    <img src="${imagem}">
                    <div class="cartContainer__list--description">
                    <span class="product__title">${nome}</span>
                    <span class="product__category">${categoria}</span>
                    <span class="product__price">${valorConvertido}</span>
                    </div>
                    <button class="cartContainer__trash" ><i class="fas fa-trash"></i></button>
                </li>`;
                (index>0)? document.querySelector(".cartContainer__list").innerHTML += html: document.querySelector(".cartContainer__list").innerHTML = html;
            });
        }
        this.criarFooter({});
        this.addEvents();
    }
    static criarFooter({total=0}){
        this.getLocalStorage().forEach(item => total += Number(item.preco));
        let valor = total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        document.querySelector(".cartContainer__footer").innerHTML = `
            <div class="footer__quantity">
                <span>Quantidade</span>
                <span>${this.getLocalStorage().length}</span>
                </div>
                <div class="footer_total">
                <span>Total</span>
                <span>${valor}</span>
            </div>`;
    }
    static async addCarrinho({id=0,localData=this.getLocalStorage()}){
        let carrinho = (localData !== null) ? localData : [];
        this.setLocalStorage([...carrinho,await RotasControll.get({id})]);
        this.montarCarrinho();
    }
    static excluirCarrinho(index = -1){
        let carrinho = this.getLocalStorage();
        if (index >= 0) carrinho.splice(index, 1);
        this.setLocalStorage(carrinho);
        this.montarCarrinho();
    }
}
export {CarrinhoControll}