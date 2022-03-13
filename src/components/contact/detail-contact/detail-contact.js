import react,{Component} from 'react';
import {useParams, RouteMatch} from 'react-router-dom';


//fungsi untuk mengakali
function akali(){

}


class IsiDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            list : [],
            isLoading : true
        }
    }

    componentDidMount(){
        // let id = this.props.match.id; //props.match berisi param yang dikirimkan
        let id = this.props.params;
        fetch('https://jsonplaceholder.typicode.com/users/'+id)
            .then(res => res.json())
            .then(res => {
                this.setState({list : res, isLoading : false});
            });
    }

    render(){
        if(this.state.isLoading){
            return (<h1>Loading .....</h1>)
        }
        let {id, name, username, email, phone, website} = this.state.list;
        return (
          <div className="container">
            <h2>Detail Contact</h2>
            <div className='row'>
            <div className='col-6'>
                <img
                src="http://placeimg.com/640/480/any"
                className="rounded"
                alt="..."
                style={{width: 30+'rem'}}
                />
            </div>
            <div className='col-6'>
                <table className="table">
                    <tbody>
                        <tr>
                            <td>Id</td>
                            <td>{id}</td>
                        </tr>
                        <tr>
                            <td>name</td>
                            <td>{name}</td>
                        </tr>
                        <tr>
                            <td>username</td>
                            <td>{username}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{email}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>srono, mutjar</td>
                        </tr>
                        <tr>
                            <td>phone</td>
                            <td>{phone}</td>
                        </tr>
                        <tr>
                            <td>website</td>
                            <td>{website}</td>
                        </tr>
                        <tr>
                            <td>Kompeni</td>
                            <td>verenigde oov compagnie</td>
                        </tr>
                </tbody>
                </table>
            </div>
            </div>
            
          </div>
        );
    }
}

//disini saya membuat function untuk mengakali tidak bisa menggunnaka params
function Detail(props){
    let {id :params} = useParams();
    return (
        <>
            <IsiDetail params={params}></IsiDetail>
        </>
    )
}

export default Detail;



/*
-- file ini akan berisi bagaiman penerapan pengiriman data dari param di url menggunakan react router
dan bagaiamana cara mengakses param dari url


--- sialan, sepertinya saya akan menyerah terlebih dahulu -
memang saya sangat bingung menegnai react router, banyak ttutorial yang sudah menjelasakan dengan v4 / v5.
tapi saya menggunakan v6, bahkan setiap versi perbedaanya sangatlah jauh. memang benar2 tidak bisa diharapkan.


NOTE:
 disini saya stuck untuk medapat props dari router, setiap saya tulis this.props itu munculnya this.props milik components.
 saya sudah cari2 tetap tidak ada jawabanya.

 link yang mungkin berguna
 https://stackoverflow.com/questions/62365009/how-to-get-parameter-value-from-react-router-dom-v6-in-class

-- akhirny sudah selesai
saya mengakalinya dengan menggunakan components berbasis class untuk memanggil params


*/






