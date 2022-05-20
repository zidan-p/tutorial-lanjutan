// karen saya sedang malas, jadi seluruh components, baik itu child maupun parent nya akan saya taruh disini

import react from "react";



//untuk card
function Product(props) {
    return (
        <div class="card mb-3" style={{ maxWidth: 540 + 'px' }}>
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="http://placeimg.com/640/640/any" class="img-fluid rounded-start" alt="..." />
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <button type="button" class="btn btn-primary btn-sm"> - </button>
                        <small class="text-muted mx-3">5 item</small>
                        <button type="button" class="btn btn-primary btn-sm"> + </button>
                    </div>
                </div>
            </div>

            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                99+
                <span class="visually-hidden">unread messages</span>
            </span>
        </div>
    )
}



export default Product;