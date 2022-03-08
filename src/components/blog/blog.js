//iini adalah penjelasana bagaimana kita akan mengupdate data dengan method put
//put disini digunakans sebagai method untuk emngubah data degan kriteria tertentu
// mungki file akan berbeda dengan yang ada di tutirial karena bila di tutorial menggunakan 1 form untuk menguodate dan mengubah
// saya akan emnggunakan 2 form untuk mengubah


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
            },
            isUpadate: false
        }
    }

    // di load sepenuhnya, baruhlah terjadi proses req dan res API
    componentDidMount(){
        this.getPostAPI();
    }

    //method yang digunakan untuk mengupdate content
    getPostAPI(){

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
    handleChange = (event) => {
        // console.log(event.target);//cek target
        let newFormBlog = {...this.state.formBlog} //mengambil nilai dari state
        //untuk value
        newFormBlog[event.target.name] = event.target.value;
        //untuk id postingan/ jika update maka tidak diubah
        if(!this.state.isUpadate){
            newFormBlog.id = new Date().getTime();
        }

        let val = event.target.value;
        this.setState(
            {formBlog: newFormBlog}
        ); 
    }

    handleSubmit = async (event) =>{
        event.preventDefault();//untuk prevent
        if(this.state.isUpadate){
            this.putDatatoAPI();
        }else{
            this.postDatatoAPI();
        }
    }

    //method untuk post
    postDatatoAPI = async () => {
        await axios.post('http://localhost:3004/post',this.state.formBlog)
            .then(res => {
                console.log(res);
                this.getPostAPI();
            }, err => console.log('error :'+err));
    }

    //method untuk menghandle update
    
    //NOTE: data ini bisa berupa event bilai tidak diberi parameter pada props di components
    handleUpdate = (data) => {
        console.log(data);
        this.setState({formBlog:data,  isUpadate: true});
    }

    //untuk menangani put data
    //untuk setruktur methodnya mirip dengan post, namun struktur urlnya mirip dengan delete
    putDatatoAPI(){
        axios.put(`http://localhost:3004/post/${this.state.formBlog.id}`, this.state.formBlog)
            .then(res => {
                console.log(res);
                this.getPostAPI();
            });
    }

    render(){
        let list = this.state.list; //assign state ke variabel
        return (
            <react.Fragment>
                {/* =========== awal form =============== */}
                {this.state.isUpadate && //jika isUpdate = true, render form update
                    <form className='container ms-3 mb-1 border border-primary rounded p-3' onSubmit={this.handleSubmit}>
                        <h3>Form Update</h3>
                        <div className="mb-3">
                            <label for="read-only" className="form-label">ID</label>
                            <input value={this.state.formBlog.id} type="text" name="title" className="form-control" id="read-only" readonly readOnly/>
                        </div>
                        <div className="mb-3">
                            <label for="exampleFormControlInput1" className="form-label">joedoel</label>
                            <input type="text" value={this.state.formBlog.title} name="title" className="form-control" id="exampleFormControlInput1" onChange={this.handleChange} />
                        </div>
                        <div className="mb-3">
                            <label for="exampleFormControlTextarea1" className="form-label">Body</label>
                            <textarea className="form-control" value={this.state.formBlog.body} name="body" id="exampleFormControlTextarea1" rows="3" onChange={this.handleChange} ></textarea>
                        </div>
                        <button className='btn btn-success' name="submit" >update</button>
                    </form>
                }
                {!this.state.isUpadate && //jika isUpdate = false, render form create
                    <form className='container ms-3 mb-1 border border-primary rounded p-3' onSubmit={this.handleSubmit}>
                        <h3>Form Create</h3>
                        <div className="mb-3">
                            <label for="exampleFormControlInput1" className="form-label">Title</label>
                            <input type="text" value={this.state.formBlog.title} name="title" className="form-control" id="exampleFormControlInput1" onChange={this.handleChange} />
                        </div>
                        <div className="mb-3">
                            <label for="exampleFormControlTextarea1" className="form-label">Body</label>
                            <textarea className="form-control" value={this.state.formBlog.body} name="body" id="exampleFormControlTextarea1" rows="3" onChange={this.handleChange} ></textarea>
                        </div>
                        <button className='btn btn-primary' name="submit" >submit</button>
                    </form>
                }
                




                {list.map(list => { //mereturn untuk setiap list(hasil fetch) menjadi bentuk card
                    return (
                        <Card key={list.id} data={list} remove={this.handleRemove} update={this.handleUpdate} />
                        )
                })}
            </react.Fragment >
        )
    }
}

export default Blog;



/*
pada file ini barukah kita melakukan bind anatar nilai value form dengan statenya.
caranya tinggal mengusi value dengan this.state.[valuenya apa]


*/