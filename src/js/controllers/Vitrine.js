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
            const suporte = document.createElement("li")
            const img = document.createElement("img")
            const secao = document.createElement("span")
            const titulo = document.createElement("span")
            const subTitulo = document.createElement("p")
            const containerPreco = document.createElement('div')
            const valor = document.createElement("span")
            const botao = document.createElement("button")
            const icone = document.createElement("i")
            const divSecao = document.createElement("div")
            const imgSecao = document.createElement("img")
            secao.innerText = categoria
            img.src = imagem
            titulo.innerText = nome
            subTitulo.innerText = descricao
            valor.innerText = precoConvertido
            imgSecao.src = this.caminhoImgSecao(categoria)
            divSecao.setAttribute('filter', categoria.toLowerCase())
            divSecao.setAttribute('class', this.classesFiltro(categoria))
            icone.setAttribute('class', 'fas fa-cart-plus')
            containerPreco.setAttribute('class', 'productsContainer__list--footer')
            botao.appendChild(icone)
            containerPreco.appendChild(valor)
            containerPreco.appendChild(botao)
            divSecao.appendChild(imgSecao)
            divSecao.appendChild(secao)
            suporte.appendChild(img)
            suporte.appendChild(divSecao)
            suporte.appendChild(titulo)
            suporte.appendChild(subTitulo)
            suporte.appendChild(containerPreco)
            listagem.appendChild(suporte)
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