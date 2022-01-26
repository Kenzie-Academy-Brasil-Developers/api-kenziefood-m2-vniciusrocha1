import {KenzieFoodControll} from "./KenzieFood.js";
import {CarrinhoControll}   from "./Carrinho.js";
let call = true;
class VitrineControll {
    static async addItensVitrine(procurar) {
        call = false;
        let listagem = document.querySelector(".productsContainer__list");
        listagem.innerHTML = '';
        let arr = await this.filtraItensVitrine(procurar);
        arr.forEach(item => {
            let { id, nome, preco, categoria, descricao, imagem } = item;
            let precoConvertido = preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
            let itemVitrine =`
            <li>
                <img src="${imagem}">
                <div filter="${categoria.toLowerCase()}" class="div__centralizar--categoria ${this.classesFiltro(categoria)}">
                    <img src="${this.caminhoImgSecao(categoria)}">
                    <span>${categoria}</span>
                </div>
                <span>${nome}</span>
                <p>${descricao}</p>
                <div class="productsContainer__list--footer">
                    <span>${precoConvertido}</span>
                    <button>
                        <i class="fas fa-cart-plus"></i> 
                    </button>
                </div>
            </li>`;
            listagem.appendChild(itemVitrine);
        });
        call = true;
        this.addEventsCardButton();
    }
    static async filtraItensVitrine(procurar) {
        let db = await KenzieFoodControll.get();
        return (procurar == 'todos') ? db : db.filter((item) => item.categoria.toUpperCase().includes(procurar.toUpperCase()) || item.nome.toUpperCase().includes(procurar.toUpperCase()));
    }
    static caminhoImgSecao(secao) {
        if (secao === "Panificadora") {
            return "./src/img/Icon_bread.png";
        } else if (secao === "Bebidas") {
            return "./src/img/Icon_glass of wine.png";
        } else if (secao === "Frutas") {
            return "./src/img/Icon_fruits.png";
        }
    }
    static classesFiltro(secao) {
        if (secao === "Panificadora") {
            return "filterContainer__btn--panificadora";
        } else if (secao === "Bebidas") {
            return "filterContainer__btn--bebidas";
        } else if (secao === "Frutas") {
            return "filterContainer__btn--frutas";
        }
    }
    static addEventFilter() {
        document.querySelector(".searchContainer__input").addEventListener('keyup', e => {
            if (call) VitrineControll.addItensVitrine(e.target.value);
        });
        let botoesCategoria = document.querySelectorAll(".btn--categoria");
        botoesCategoria.forEach((botao) => {
            botao.addEventListener('click', (e) => {
                let procurar = e.target.getAttribute("filter");
                if (call) VitrineControll.addItensVitrine(procurar);
            });
        });
    }
    static addEventsCardButton() {
        let botoesAddCart = document.querySelectorAll(".btn--addCart");
        botoesAddCart.forEach((botao) => {
            botao.addEventListener('click', (e) => {
                let li = e.target.closest('li');
                let id = li.getAttribute('idP');
                CarrinhoControll.addCarrinho(id);
            });
        });
    }
}
export {VitrineControll}