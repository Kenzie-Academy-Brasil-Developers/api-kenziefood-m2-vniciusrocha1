import {KenzieFoodControll} from "./KenzieFood.js";
class ExtraControll{
    static id = 0;
    static method = null;
    static async openModal(method,id=0) {
        document.querySelector(".modalProduct").style.display = "block";
        this.id     = id;
        this.method = method;
        let produto = (method="PATCH")? await KenzieFoodControll.get(id) : {};
        this.setForm(produto,"openModal");
        this.configButtons();
    }
    static addEvents(){
        let buttons = document.querySelectorAll(".eventClick");
        buttons.forEach(element => {
            element.addEventListener("click", e => {
                let button = e.target.closest('button');
                // let classAtual = button.getAttribute('class').split(' ')[1];
                let buttonClass = button.getAttribute('class').split(' ').includes('btn--');
                let method = (buttonClass == "btn--modalSave")? this.method : (buttonClass == "btn--modalDelete")? "DELETE" : "GET";
                this.callRoutes(method);
            });
        });
    }
    static setForm({nome="",preco="",categoria="",descricao="",imagem=""},origem="callRoutes"){
        let retorno = [];
        let form = document.querySelector(".formProduct");
        let fields = form.querySelectorAll(`.form--field`);
        fields.forEach(field => {
            let key = field.getAttribute("name").split("--")[1];
            console.log('window key', window[key]);
            // (origem == "callRoutes")? retorno.push({"name":field.name,"value":field.value}) : field.value = window[key];
        });
        return retorno;
    }
    static configButtons(){
        //Ocultar os botões se o this.method == "POST" e mostrar se for PATCH
    }
    static async callRoutes(method=null){
        let produto = this.setForm();
        let retorno = (method  == "GET")    ? await KenzieFoodControll.get(this.id)         : method;
        retorno     = (retorno == "POST")   ? await KenzieFoodControll.post(produto)        : retorno;
        retorno     = (retorno == "PATCH")  ? await KenzieFoodControll.get(this.id,produto) : retorno;
        return        (retorno == "DELETE") ? await KenzieFoodControll.get(this.id)         : {"error":"invalid method"};
    }
}
export {ExtraControll};