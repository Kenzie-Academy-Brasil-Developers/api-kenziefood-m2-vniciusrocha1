class RotasControll {
    static requisicao = ({method=null,body=null}) => {return {headers: {Authorization:`Token ${this.token}`},method,body}};
    static apiURL     = "https://kenzie-food-api.herokuapp.com";
    static token      = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjQzMDQ0MjIwLCJleHAiOjE2NDM5MDgyMjAsInN1YiI6IltvYmplY3QgVW5kZWZpbmVkXSJ9.U4tH6ChE1YucabIGUTWdycLJVhsM3hico87drfCFSdQ";
    static get        = ({method="GET",    id="", body, endpoint="/product"})    => fetch(`${this.apiURL}${endpoint}/${id}`, this.requisicao({"method":method}))                  .then(res => res.json());
    static post       = ({method="POST",   id=0,  body, endpoint="/my/product"}) => fetch(`${this.apiURL}${endpoint}`,       this.requisicao({"method":method,"body":body})).then(res => res.json());
    static patch      = ({method="PATCH",  id=0,  body, endpoint="/my/product"}) => fetch(`${this.apiURL}${endpoint}/${id}`, this.requisicao({"method":method,"body":body})).then(res => res.json());
    static delete     = ({method="DELETE", id=0,  body, endpoint="/my/product"}) => fetch(`${this.apiURL}${endpoint}/${id}`, this.requisicao({"method":method}))                  .then(res => res.json());
}
export {RotasControll};