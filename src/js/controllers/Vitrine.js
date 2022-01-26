import { KenzieFoodControll } from "./KenzieFood.js";
class VitrineControll {
    static async addItensVitrine(procurar) {
        const listagem = document.querySelector(".productsContainer__list")
        listagem.innerHTML =''
        let arr = await this.filtraItensVitrine(procurar)
        console.log('arr', arr)
        arr.forEach(item => {
            const { id, nome, preco, categoria, descricao, imagem } = item
            let precoConvertido = preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
            let itemVitrine =
            `
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
            </li>
            `
                listagem.appendChild(itemVitrine)
        });
    }
    static async filtraItensVitrine(procurar) {
        let db = await KenzieFoodControll.get()
        let filtrar = (procurar == 'todos') ? db : db.filter((item) => item.categoria.toUpperCase().includes(procurar.toUpperCase()) || item.nome.toUpperCase().includes(procurar.toUpperCase()))
        return filtrar
    }
    static caminhoImgSecao(secao) {
        if (secao === "Panificadora") {
            return "./img/Icon_bread.png"
        } else if (secao === "Bebidas") {
            return "img/Icon_glass of wine.png"
        } else if (secao === "Frutas") {
            return "img/Icon_fruits.png"
        }
    }
    static classesFiltro(secao) {
        if (secao === "Panificadora") {
            return "filterContainer__btn--panificadora"
        } else if (secao === "Bebidas") {
            return "filterContainer__btn--bebidas"
        } else if (secao === "Frutas") {
            return "filterContainer__btn--frutas"
        }
    }
    static addEvent(){
        const botoesCategoria = document.querySelectorAll(".btn--categoria")
        console.log('botoesCategoria', botoesCategoria)
        botoesCategoria.forEach((botao)=>{
            botao.addEventListener('click', (e) => {
                let procurar = e.target.getAttribute("filter")
                VitrineControll.addItensVitrine(procurar)
            })
        })
    document.querySelector(".searchContainer__input").addEventListener('keyup', e => VitrineControll.addItensVitrine( e.target.value))
    }
}
    export { VitrineControll };