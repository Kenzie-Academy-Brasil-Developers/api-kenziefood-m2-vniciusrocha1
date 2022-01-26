class KenzieFoodControll {
    static token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjQzMDQ0MjIwLCJleHAiOjE2NDM5MDgyMjAsInN1YiI6IltvYmplY3QgVW5kZWZpbmVkXSJ9.U4tH6ChE1YucabIGUTWdycLJVhsM3hico87drfCFSdQ";
    static apiURL = "https://kenzie-food-api.herokuapp.com";
    // static endpoint = "my/product";
    static endpoint = "product";
    static fetchURL = `${this.apiURL}/${this.endpoint}`;
    static requisicao = {headers: {Authorization:`Token ${this.token}`}};
    static async get(id = 0) {
        let newId = (id > 0) ? `/${id}` : "";
        return await fetch(`${this.fetchURL}${newId}`, this.requisicao).then(res => res.json());
    }
    static async post(body){
        if (this.endpoint === "my/product") {
            let req = this.requisicao;
            req.method = "POST";
            req.body = body;
            let retorno = await fetch(this.fetchURL, req).then(res => res.json());
            return retorno;
        }
    }
    static async patch(id = 0,body) {
        if (this.endpoint === "my/product") {
            let req = this.requisicao;
            req.method = "PATCH";
            req.body = body;
            return await fetch(`${this.fetchURL}${id}`, this.requisicao).then(res => res.json());
        }
    }
    static delete(id = 0) {
        if (this.endpoint === "my/product") {
            let req = this.requisicao;
            req.method = "DELETE";
            fetch(`${this.fetchURL}${id}`, this.requisicao).then(res => res.json());
        }
    }
}
export {KenzieFoodControll};