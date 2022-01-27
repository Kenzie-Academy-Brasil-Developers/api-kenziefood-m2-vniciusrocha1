import {KenzieFoodControll} from "./KenzieFood.js";
class ExtraControll{
    static id           = 0;
    static make         = null;
    static method       = null;
    static formValues   = [];
    static setFormValue = (produto,origem="callRoutes") => document.querySelector(".formProduct").querySelectorAll(`.form--field`).forEach(field => (origem == "callRoutes")? this.formValues = this.formatField(field) : (this.make == "post")? field.value = "" : field.value = produto[field.getAttribute("name").split("--")[1]]);
    static async openModal(make,id=0) {
        document.querySelector(".modalProduct").style.display = "block";
        this.id     = id;
        this.make   = make;
        let produto = (make="update")? await KenzieFoodControll.get(id) : {};
        this.setFormValue(produto,"openModal");
        this.configButtons();
    }
    static closeModal(){
        document.querySelector(".modalProduct").style.display = "none";
    }
    static addEvents(){
        let buttons = document.querySelectorAll(".eventClick");
        buttons.forEach(element => {
            element.addEventListener("click", e => {
                let button = (e.target.tagName == "SPAN")? e.target : e.target.closest('button');
                let classe = button.getAttribute('class').split(' ')[button.getAttribute('class').split(' ').findIndex(classe => classe.includes('btn--'))];
                let method =  (classe == "btn--modalSave")  ? ((this.make=="update")? "PATCH" : "POST") : classe;
                method     =  (method == "btn--modalReset") ? "GET"                                     : method;
                method     =  (method == "btn--modalDelete")? "fgh"                                  : method;
                              (method == "btn--closeModal") ? this.closeModal()                         : this.callRoutes(method);
            });
        });
    }
    static configButtons(){
        //Ocultar os botões se o this.method == "POST" e mostrar se for PATCH
    }
    static async callRoutes(method){
        this.configButtons();
        this.formValues = [];
        this.setFormValue();
        let retorno = (method == "GET")? {} :{"msg":`O metodo '${method}' é invalido`};
        if (method == "GET")    retorno = await KenzieFoodControll.get(this.id);
        if (method == "GET")    this.setFormValue(retorno,'openModal');
        if (method == "POST")   retorno = await KenzieFoodControll.post(this.formValues);
        if (method == "PATCH")  retorno = await KenzieFoodControll.patch(this.id,this.formValues);
        if (method == "DELETE") retorno = await KenzieFoodControll.delete(this.id);
        console.log('retorno', retorno)
    }
    static formatField (field){
        let obj = {};
        obj[field.name.split('--')[1]] = field.value;
        return [...this.formValues,obj];
    }
}
export {ExtraControll};