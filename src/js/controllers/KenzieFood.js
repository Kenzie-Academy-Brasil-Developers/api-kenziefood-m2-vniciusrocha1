class KenzieFoodControll{
    static url = "https://kenzie-food-api.herokuapp.com"
    static async get(id=""){
        return  await fetch(this.url + "/product/"+ id).then(res => res.json());
    }
    static post(){
    }
    static patch(){
    }
    static delete(){
    }
}
export {KenzieFoodControll};