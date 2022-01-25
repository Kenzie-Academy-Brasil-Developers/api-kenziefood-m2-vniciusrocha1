import {KenzieFoodControll} from "./KenzieFood.js";
class CarrinhoControll{
    static async addCarrinho(id){
        if(id !== undefined){
            let getDoProduto = KenzieFoodControll.get(id);
            let produto = await getDoProduto;
            let readCarrinho = this.getCard();
            let carrinho = (readCarrinho !== null)? readCarrinho : [];
            carrinho.push(produto);
            this.setCard(carrinho);
            this.criandoDOM();
        }
    }
    static getCard() {
        return JSON.parse(localStorage.getItem('carrinho'));
    }
    static setCard(obj) {
        localStorage.setItem('carrinho', JSON.stringify(obj));
    }
    static criandoDOM() {
        let listagem   = document.getElementsByClassName("cartContainer__list")[0];
        let html = `
            <div class="aside__cartContainer--empty">
                <img class="cart__icon" src="/src/img/shopping-bag.png">
                <span class="list--span1">Ops!</span>
                <span class="list--span2">Por enquanto não temos produtos no carrinho</span>
            </div>`;
        let iqual = true;
        let carrinho = this.getCard();
        if(carrinho !== null){
            carrinho.forEach((item, index) => {
                iqual = (index === 0)? true : false;
                let {categoria, nome, preco, imagem, id} = item;
                let valorConvertido = preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
                html = `
                    <li index="${index}">
                        <img src="${imagem}">
                        <div class="cartContainer__list--description">
                            <span class="product__title">${nome}</span>
                            <span class="product__category">${categoria}</span>
                            <span class="product__price">${valorConvertido}</span>
                        </div>
                        <button class="cartContainer__trash" ><i class="fas fa-trash"></i></button>
                    </li>`;
            });
        }
        (carrinho === null || iqual == true)? listagem.innerHTML = html : listagem.innerHTML += html;
        this.montarFooter();
        this.addEvents();
    }
    static montarFooter() {
        let carrinho = this.getCard();
        let total = 0;
        let footer   = document.getElementsByClassName("cartContainer__footer")[0];
        carrinho.forEach(item => total += Number(item.preco));
        let qtd        = carrinho.length;
        let valorConvertido = total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        footer.innerHTML = `
            <div class="footer__quantity">
            <span>Quantidade</span>
                <span>${qtd}</span>
            </div>
            <div class="footer_total">
                <span>Total</span>
                <span>${valorConvertido}</span>
            </div>`;
    }
    static excluirCarrinho(index=-1) {
        let carrinho = this.getCard();
        if (index >= 0) carrinho.splice(index, 1);
        this.setCard(carrinho);
        this.criandoDOM();
    }
    static addEvents() {
        let listaBotoes = document.querySelectorAll('.cartContainer__trash');
        listaBotoes.forEach(element => element.addEventListener('click', e => {
            let li = e.target.closest('li');
            let index = li.getAttribute('index');
            this.excluirCarrinho(index);
        }));
    }
}
export {CarrinhoControll}