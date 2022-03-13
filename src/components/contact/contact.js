import react,{Component} from 'react';
import Detail from './detail-contact/detail-contact';
import {BrowserRouter,Routes,Route, Link} from "react-router-dom";


class Card extends Component{
    constructor(props){
        super(props);
    }

    // handleLink = (id) =>{
    //     this.props.history.push(`/contact/${id}`);
    // }


    render(){
        return(
            <div className="col">
                <div className="card ms-3" style={{width: 18+'rem'}}>
                    <img src="http://placeimg.com/640/480/any" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{this.props.name}</h5>
                        <p className="card-text">
                            Email : <br />
                            <small className="text-muted">{this.props.email}</small> <br />
                            phone : <br />
                            <small className="text-muted">{this.props.phone}</small>
                        </p>
                        
                    </div>
                    <div className="card-body">
                        {/* <a href="#" className="card-link text-decoration-none" > */}
                            <Link to={"/detail/"+this.props.id} className="ling"> {/* untuk link ke id terpilih*/}
                            selengkapnya <i class="bi bi-arrow-up-right-square"></i>
                            </Link>
                        {/* </a> */}
                    </div>
                </div>
            </div>
        )
    }
}


class Contact extends Component{
    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(res => this.setState({list : res}));
    }

    render(){
        return(
            <react.Fragment>
                <div className='container'>
                    <div class="row row-cols-1 row-cols-md-4 g-4">
                        {this.state.list.map((list,i) => {
                            return <Card key={i} name={list.name} phone={list.phone} email={list.email} id={list.id} />
                        })}
                    </div>
                </div>
                {/* <Detail /> */}
            </react.Fragment>
        )
    }
}

export default Contact;

































