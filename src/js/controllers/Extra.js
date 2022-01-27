import {RotasControll} from "./Rotas.js";
import {VitrineControll} from "./Vitrine.js";
class ExtraControll{
    static id            = 0;
    static action        = null;
    static body          = [];
    static configButtons = () => document.querySelectorAll(".disableClass").forEach(value => value.disabled = (this.action == "update")? false : true);
    static modal         = (display = null)             => (display !== null)? document.querySelector(".modalProduct").style.display = (display == "open")? "block" : "none" : document.querySelector(".modalProduct");
    static setFormValue  = (produto,origem="fetchAPI")  => document.querySelector(".formProduct").querySelectorAll(`.form--field`).forEach(field => (origem == "fetchAPI")? this.body = this.formatField(field) : (this.action == "insert")? field.value = "" : field.value = produto[field.getAttribute("name").split("--")[1]]);
    static closeModal    = () => document.querySelector(".modalProduct").style.display = "none";
    static async initExtra({action,id=0}) {
        this.modal("open");
        this.id     = id;
        this.action = action;
        let produto = (action="update")? await RotasControll.get({id}) : {};
        this.setFormValue(produto,"initExtra");
        this.configButtons();
    }
    static addEvents(){
        let buttons = document.querySelectorAll(".eventClick");
        buttons.forEach(element => {
            element.addEventListener("click", e => {
                let button = e.target.closest('button');
                let classe = button.getAttribute('class').split(' ')[1];
                let method =  (classe == "btn--modalSave")  ? ((this.action=="update")? "PATCH" : "POST") : classe;
                method     =  (method == "btn--modalReset") ? "GET"                                     : method;
                method     =  (method == "btn--modalDelete")? "DELETE"                                  : method;
                              (method == "btn--closeModal") ? this.modal("close")                       : this.fetchAPI(method);
            });
        });
        let modal = this.modal();
        modal.addEventListener("click", event => {
            let classe = event.target.getAttribute("class");
            if (classe == "modalProduct") this.modal("close");
        });
    }
    static async fetchAPI(method){
        this.body = [];
        this.setFormValue();
        let response = {method};
        if (method == "GET")    response.body = await RotasControll.get({id:this.id});
        if (method == "GET")    this.setFormValue(response.body,'initExtra');
        if (method == "POST")   response.body = RotasControll.post({body:this.body});
        if (method == "PATCH")  response.body = RotasControll.patch({id:this.id,body:this.body});
        if (method == "DELETE") RotasControll.delete({id:this.id});
        this.returnAPI(response);
    }
    static async returnAPI({body={},method=""}){
        if(method !== "DELETE", body !== {}){
            let retorno = await body;
            this.id     = (method == "POST" && retorno.id)?    retorno.id : this.id;
            this.action = (method == "POST" && retorno.id)?    "update"   : this.action;
            if(method  == "POST" && retorno.id)                this.configButtons();
        }
        if(method === "DELETE") ExtraControll.modal("close");
        if(method !== "GET" && body.error == undefined && body.msg == undefined) VitrineControll.montarVitrine("todos");
    }
    static formatField (field){
        let obj = {};
        obj[field.name.split('--')[1]] = field.value;
        return [...this.body,obj];
    }
}
export {ExtraControll};