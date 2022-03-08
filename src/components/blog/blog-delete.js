//ini adalah file mengenai penjelasan tenatng delete
//baca file ini jika bingung mengenai delete
// di file ini juga proses req dan res api di kelola
//dengan dibuatnya file ini juga memudahkan routing seumpama nanti
// akan dibuat web app SPA

import react, {Component} from 'react';
import Card from './card/card';
import axios from 'axios';

//class yang akan dipanggil di app
class Blog extends Component{
    constructor(props){
        super(props);

        this.state = {
            list: [] //digunakan untuk menampung API nanti
        }
    }

    //disinalah API akan di proses, karena fungsi ini akan menungu untuk components 
    // di load sepenuhnya, baruhlah terjadi proses req dan res API
    componentDidMount(){
        this.getPostAPI();
        // console.log(this);
    }

    //method yang digunakan untuk mengupdate content
    // method ini selalu dipanggil setiap dilakukan perubahan
    getPostAPI(){
        /* 
        //-- cara fetch --
        fetch('http://localhost:3004/post/')
            .then(res => res.json())
            .then(res => {
                this.setState({list : res});
                console.log(this);
            });
        */

        axios.get('http://localhost:3004/post/')//perlu diingat, hasil fetch di axios akan disimpan di data
            .then(res => {
                this.setState({list : res.data});
                console.log(res.data);
        })
    }

    //membuat methos untuk menghadle remove
    // disini saya benar2 bingung,mengapa bila menghandlenya kosong data bisa ada, bagaimana datanya bisa dikirim?
    // pikiran saya masih tidak mengetahuinya
    // namun setelah saya pikir lagi handleremove ini akan berisi info semua eventnya (e)
    // pengiriman : handleRemove > props.remove > card(jadi props) > onClick > handleRemove

    handleRemove = (data) => {
        /* -- ini error, saya tdk bisa membperbaiki --
        //cara fetch
        console.log(this);//data berupa id
        let obj = this; //suapay function getpostAPI dapat digunakan dengan mngassign this ke var
        fetch(`http://localhost:3004/post/${data}`, {
            method: 'DELETE',
        }).then(res => {
            console.log(res);
        });
        */

        axios.delete(`http://localhost:3004/post/${data}`)
            .then(res => {
                console.log(res);
                this.getPostAPI();
            });
    }




    render(){
        let list = this.state.list; //assign state ke variabel
        return (
            <react.Fragment>
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
----- PENTING!!! -----
untuk yg  tidak tahu mengapa bisa error, itu karena saya masih belum menginstal json server
saya masih malas untuk menginstalnua dan saya tidak bisa menemukan dokumentasinya id json placeholder.
jadi lebih baik ini akan saya tinggak terlebih dahulu dan mencari alternativnya.



--- Lanjutan ---
oke, saat ini saya sudah kembali untuk melanjutkan project belajar tutorial ini, sekarang suapaya kodenya bisa
bekerja, waktunya kita untuk menginstal "json server" yang berfungsi sebagai penyedia fake API.
installnya :
npm install -g json-server

lalu kita buat file "db.json" sebagai tempat penyimpanan file json kita untuk fake API.
ingat tempatkan file ini di folder root

utuk melakukan request api kita tinggal mengetikan 
"json-server --watch db.json"

untuk routesnya kita bisa sesuaikan antara port json server dengan routes
contoh mengambil data id
GET "localhost:3004/id/1" <- mencari data dengan id 1 dg method GET

note: 
+ ingat pula bahka port yang di json-server dengan react harus berbeda, jadi untuk mengubahnya kita cukup mengetikan
"json-server --watch db.json --port 3004" //properti  port digunakan untuk mengganti port

+ jangan lupa juga kita harus menggunakan 2 terminal untuk melakukan ini,
 1 untuk running react, 1 lagi utuk running fake api

+ untuk keterangan lebih jelas silahkan lihat dokumentasi resminya "json server"

SIPPP, sekarang project ini sudah dapat digunakan dengan method lainya.


-- axios --
disini saya akn mengisntal axios seabagai http client, sebernya saya hanya ingin sepanjang project ini tidak menggunakan
librari atau tool yang terlalu banyak, namun karena saya tidak bisa mengatasi perujuan object di fecth jadi saya putuskan
untuk menggunakan axios
instal : 
"npm i axios"





*/