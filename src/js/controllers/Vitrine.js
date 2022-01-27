import {RotasControll}    from "./Rotas.js";
import {CarrinhoControll} from "./Carrinho.js";
import {ExtraControll}    from "./Extra.js"
class VitrineControll {
    static doFetch    = true;
    static filtros    = {Todos:{img:"",classe:""},Panificadora:{img:"./src/img/Icon_bread.png",classe:"filterContainer__btn--panificadora"},Bebidas:{img:"./src/img/Icon_glass of wine.png",classe:"filterContainer__btn--bebidas"},Frutas:{img:"./src/img/Icon_fruits.png",classe:"filterContainer__btn--frutas"}};
    static getFiltros = ({categoria,retorno}) => this.filtros[categoria][retorno];
    static async montarVitrine(filtro){
        this.doFetch = false;
        document.querySelector(".productsContainer__list").innerHTML = '';
        let vitrine = await this.filtraVitrine(filtro);
        vitrine.forEach(({id, nome, preco, categoria, descricao, imagem}) => {
            let precoConvertido = preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
            let classIMG = (id !== 2) ? 'imgProduto' : 'panqueca';
            let teste = this.getFiltros({categoria,retorno:"classe"});
            document.querySelector(".productsContainer__list").innerHTML += `
                <li idP="${id}">
                    <img class="${classIMG}" src="${imagem}">
                    <div filter="${categoria.toLowerCase()}" class="div__centralizar--filtro ${this.getFiltros({categoria,retorno:"classe"})}">
                        <img src="${this.getFiltros({categoria,retorno:"img"})}">
                        <span>${categoria}</span>
                    </div>
                    <span>${nome}</span>
                    <p>${descricao}</p>
                    <div class="productsContainer__list--footer">
                        <span>${precoConvertido}</span>
                        <button class="btn-product btn--editProduct"><i class="fas fa-edit"></i></button>
                        <button class="btn-product btn--addCart"><i class="fas fa-cart-plus"></i></button>
                    </div>
                </li>`;
        });
        this.addEvents("excluir");
        ExtraControll.modal("close");
    }
    static async filtraVitrine(filtro){
        filtro = (filtro == undefined || filtro == null)? document.querySelector(".searchContainer__input").value : filtro;
        let db = await RotasControll.get({});
        return (filtro.toLowerCase() == 'todos') ? db : db.filter(item => item.categoria.toLowerCase().includes(filtro.toLowerCase()) || item.nome.toLowerCase().includes(filtro.toLowerCase()));
    }
    static addEvents(evento=null){
        if(evento == null) document.querySelector   (".searchContainer__input").addEventListener('keyup', event => (this.doFetch)? VitrineControll.montarVitrine(event.target.value) : {});
        if(evento == null) document.querySelectorAll(".btn--filtro").forEach(botao => botao.addEventListener('click', event =>(this.doFetch)? VitrineControll.montarVitrine(event.target.getAttribute("filter")) : {}));
        if(evento == "excluir"){
            document.querySelectorAll(".btn-product").forEach(botao => botao.addEventListener('click', event => {
                let button = event.target.closest('button');
                let classe = button.getAttribute('class').split(' ')[1];
                let li = (["btn--addCart","btn--editProduct"].includes(classe))? event.target.closest('li') : "";
                let id = (["btn--addCart","btn--editProduct"].includes(classe))? li.getAttribute('idP')     :  0;
                if(classe == "btn--addCart")     CarrinhoControll.addCarrinho({id});
                if(classe == "btn--editProduct") ExtraControll.initExtra({action:"update",id});
                if(classe == "btn--addProduct")  ExtraControll.initExtra({action:"insert"});
            }));
        }
        this.doFetch = true;
    }
}
export {VitrineControll};