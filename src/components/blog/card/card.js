import react, {Component} from "react";
import "./card.css";

//componetes card (ya komponen card)
// dikomponen ini yang nanti akan dipanggil berkali2 sesuai api
//jangan lupa pula untuk menginstal axios sebagai client http / kata untuk mengelola res dan req API
// 
class Card extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="card-container cf" >
                <div className="img">
                    <img src="http://placeimg.com/150/100/tech" />
                </div>
                <div className="content ">
                    <h3 className="title">{this.props.data.title}</h3>
                    <p className="article">{this.props.data.body}</p>
                    <button className="btn btn-danger" onClick={() => this.props.remove(this.props.data.id)}>X remove</button>
                    <button className="btn btn-success ms-2" onClick={() => this.props.update(this.props.data)}>update</button>{/*berupa seluruh data karena akan digunakan untuk mengupdate seluruh isi berdasarkan id */}
                    {/*button remove yang menjalanakn fungsi remove(dari props) dengan parameter id daari props */}
                    {/*jangan lupa, untuk function dengan parameter, selalu masukan kedalam function aninim */}
                </div>
            </div>
        )
    }
}

export default Card;