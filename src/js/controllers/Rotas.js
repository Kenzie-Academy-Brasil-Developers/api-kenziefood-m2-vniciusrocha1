class RotasControll {
    static formatBody = (body=null) =>{
        let retorno = {};
        if(body !== null && body.length > 0) {
            body.forEach(value =>{
                for (const key in value) {
                    retorno[key] = value[key];
                }
            })
            return JSON.stringify(retorno);
        }
    }
    static token      = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzksImlhdCI6MTY0MzI4OTYyNywiZXhwIjoxNjQ0MTUzNjI3LCJzdWIiOiJbb2JqZWN0IFVuZGVmaW5lZF0ifQ.BwcmokuzwDJPVRQ51xxRayTTGVlJZTiI7D_fsz6kHoU";
    static apiURL     = "https://kenzie-food-api.herokuapp.com/my/product";
    static requisicao = ({method=null,body=null}) => {return {headers: {Authorization:`Token ${this.token}`,"Content-Type": "application/json"},method,"body":this.formatBody(body)}};
    static get        = ({method="GET",   id="",body,endpoint="/my/product"}) => fetch(`${this.apiURL}/${id}`, this.requisicao({method}))     .then(res => res.json());
    static post       = ({method="POST",  id=0, body,endpoint="/my/product"}) => fetch(`${this.apiURL}`,       this.requisicao({method,body})).then(res => res.json());
    static patch      = ({method="PATCH", id=0, body,endpoint="/my/product"}) => fetch(`${this.apiURL}/${id}`, this.requisicao({method,body})).then(res => res.json());
    static delete     = ({method="DELETE",id=0, body,endpoint="/my/product"}) => fetch(`${this.apiURL}/${id}`, this.requisicao({method}))     .then(res => res.json());
}
export {RotasControll};