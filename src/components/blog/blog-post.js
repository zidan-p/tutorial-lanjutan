//iini adalah penjelasana bagaimana kita akan menambahakan data dengan method POST
//mungkin dalam project ini akan lebih membingungkan
// tapi secara meraba2 dapat dipahami
// saya tidak terlalu banyak memberi comment disini, mungkin hanya yang dirasa membuat bingung


import react, {Component} from 'react';
import Card from './card/card';
import axios from 'axios';

//class yang akan dipanggil di app
class Blog extends Component{
    constructor(props){
        super(props);
        this.state = {
            list: [], //digunakan untuk menampung API nanti
            formBlog: { //untuk menampung nilai sementara dari onchange input form
                userId: 1,
                id:'',
                title:'',
                body:''
            }
        }
    }

    // di load sepenuhnya, baruhlah terjadi proses req dan res API
    componentDidMount(){
        this.getPostAPI();
    }

    //method yang digunakan untuk mengupdate content
    getPostAPI(){
        //untuk mengurutkan berdasarkan id dan desc
        //"http://localhost:3004/post?_sort=id&_order=desc"
        axios.get('http://localhost:3004/post?_sort=id&_order=desc')//perlu diingat, hasil fetch di axios akan disimpan di data
            .then(res => {
                this.setState({list : res.data});
                console.log(res.data);
        })
    }

    //untuk meremove data
    handleRemove = (data) => {
        axios.delete(`http://localhost:3004/post/${data}`)
            .then(res => {
                console.log(res);
                this.getPostAPI();
            });
    }

    //method untuk menangai setiap perubahan di form
    // perlu diingt method ini menangani 2 input
    //sehingga mungkin ada variabel yang akan dibuat dinamis berdasar nama inputnya

    //perlu diingat, disini ketika kita bermain dengan state, kita harus menggunakan cara aman dalam merubahnya
    //yaitu "copy nilai state -> ubah nilai copyan -> baru ubah state dengan copyan yang dibubah";
    // saya lupa apa istilah untuk cara ini
    handleChange = (event) => {
        // console.log(event.target);//cek target
        let newFormBlog = {...this.state.formBlog} //mengambil nilai dari state
        //untuk value
        newFormBlog[event.target.name] = event.target.value;//target.name disamping didapat dari atribut name di jsx, jadi pastika antara name di jsx dengan name di state itu sama
        //untuk id postingan
        newFormBlog.id = new Date().getTime(); //id postingan diisi waktu, jadi setiap melakukan perubahan id disiberbeda2 (saya tdk tahu mengapa tidak dijadikan 1 paket dengan submit)

        let val = event.target.value;
        this.setState(
            {formBlog: newFormBlog}, 
            // () => console.log(this.state.formBlog)
            ); //saya juga bingung, apakah dengan menambahkan function baru setelah perubahan state dapat untuk monitor perubahan.
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        //untuk prevent
        this.postDatatoAPI();
        this.getPostAPI();
    }

    //method untuk post
    postDatatoAPI = () => {
        axios.post('http://localhost:3004/post',this.state.formBlog)
            .then(res => console.log(res), err => console.log('error :'+err));
    }


    render(){
        let list = this.state.list; //assign state ke variabel
        return (
            <react.Fragment>
                {/* =========== awal form =============== */}
                <form className='container ms-3 mb-1 border border-primary rounded p-3' onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <label for="exampleFormControlInput1" className="form-label">Title</label>
                        <input type="text" name="title" className="form-control" id="exampleFormControlInput1" onChange={this.handleChange} />
                    </div>
                    <div className="mb-3">
                        <label for="exampleFormControlTextarea1" className="form-label">Body</label>
                        <textarea className="form-control" name="body" id="exampleFormControlTextarea1" rows="3" onChange={this.handleChange} ></textarea>
                    </div>
                    <button className='btn btn-primary' name="submit" >submit</button>
                </form>






                {list.map(list => { //mereturn untuk setiap list(hasil fetch) menjadi bentuk card
                    return (
                        <Card key={list.id} data={list} remove={this.handleRemove} />
                        )
                })}
            </react.Fragment >
        )
    }
}

export default Blog;



/*
jika ada yg bertanya mengapa tidak mengapai bubbling dalam menangani form
itu karena pada project ini saya hanya mengikuti yang ada di tutorial 
sehingga pasti ada banyak cara yang lebih baik dari yang disajikan

poin oenting dalam project ini
+ id postingan ini dibuat berdasarkan timestamp, supaya setiap data bisa mendapat id unik
    - itu karena waktu pasti tidak akan pernah sama
+ pada project ini, state diubah dengan menggunakan cara aman, caranya ada di comment method
+ 



*/