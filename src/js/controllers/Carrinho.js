import {KenzieFoodControll} from "./KenzieFood.js"; 
class CarrinhoControll{
    static async addCarrinho(id){
        if(id !== undefined){
            const getDoProduto = KenzieFoodControll.get(id);
            const produto = await getDoProduto;
            const readCarrinho = this.read()
            const carrinho = (readCarrinho.length > 0)? readCarrinho : [] ;
            carrinho.push(produto)
            this.write(carrinho);
            this.criandoDOM()
        }
    }
    static read() {
        return JSON.parse(localStorage.getItem('carrinho'))
    }
    static write(obj) {
        localStorage.setItem('carrinho', JSON.stringify(obj));
    }
    static criandoDOM() {
        const listagem   = document.querySelector(".list__carrinho");
        listagem.innerHTML = ""
        const carrinho = this.read()
        if(carrinho.length > 0){
            carrinho.forEach((item) => {
                const {categoria, nome, preco, imagem, id} = item
                const li         = document.createElement('li');
                const categoriaP = document.createElement('p');
                const nomeh3     = document.createElement('h3');
                const precoP     = document.createElement('p');
                const imgSrc        = document.createElement('img')
                categoriaP.innerText = categoria;
                nomeh3.innerText      = nome;
                precoP.innerText     = preco
                imgSrc.src          = imagem
                li.appendChild(imgSrc);
                li.appendChild(nomeh3);
                li.appendChild(categoriaP);
                li.appendChild(precoP);
                listagem.appendChild(li)
            })
        }
    }
}
export {CarrinhoControll}