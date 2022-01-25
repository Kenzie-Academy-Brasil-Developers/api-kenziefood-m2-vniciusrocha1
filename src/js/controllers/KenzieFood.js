class KenzieFoodControll{
    static token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjQzMDQ0MjIwLCJleHAiOjE2NDM5MDgyMjAsInN1YiI6IltvYmplY3QgVW5kZWZpbmVkXSJ9.U4tH6ChE1YucabIGUTWdycLJVhsM3hico87drfCFSdQ";
    static apiURL = "https://kenzie-food-api.herokuapp.com";
    // static endpoint = "my/product";
    static endpoint = "product";
    static fetchURL = `${this.apiURL}/${this.endpoint}`;
    static req = {headers : {Authorization: `Bearer ${this.token}`}};
    static async get(id=0){
        let newId = (id > 0)? `/${id}` : "";
        return await fetch(`${this.fetchURL}${newId}`,this.req).then(res => res.json());
    }
    static post(){
        if(this.endpoint === "my/product"){
        }
    }
    static patch(id=0){
        let newId = (id > 0)? `/${id}` : "";
        if(this.endpoint === "my/product"){
        }
    }
    static delete(id=0){
        let newId = (id > 0)? `/${id}` : "";
        if(this.endpoint === "my/product"){
        }
    }
}
export {KenzieFoodControll};