window.Shop = {

    API_URL: "http://localhost:8085",

    getProducts: function () {
        $.ajax({
            url: Shop.API_URL + "/products",
            method: "GET"
        }).done(function (response) {
            Shop.displayProducts(response.content);
        });
    },

    addProductToCart: function (productID) {
        const userId = 16;

        const requestBody = {
            userID: userId,
            productID: productID
        }

        $.ajax({
            url: Shop.API_URL + "/carts",
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(requestBody)
        }).done(function () {
            window.location.replace("cart.html");
        });
    },

    getProductHtml: function (product) {
        return `
                <div class="col-md-3 col-sm-6">
                    <div class="single-shop-product">
                        <div class="product-upper">
                            <img src="img/product-2.jpg" alt="">
                        </div>
                        <h2><a href="">${product.name}</a></h2>
                        <div class="product-carousel-price">
                            <ins>$${product.price}</ins>
                        </div>  
                        
                        <div class="product-option-shop">
                            <a class="add_to_cart_button" data-quantity="1" data-product_sku="" data-product_id="${product.id}" rel="nofollow" href="/canvas/shop/?add-to-cart=70">Add to cart</a>
                        </div>                       
                    </div>
                </div>
        `
    },

    displayProducts: function (products) {
        let productsHtml = '';

        products.forEach(product => productsHtml += Shop.getProductHtml(product));

        $('.single-product-area .row:first-child').html(productsHtml);
    },

    bindEvents: function () {
        $('.single-product-area .row:first-child')
            .delegate('.add_to_cart_button', 'click', function (event) {
                event.preventDefault();

                let productId = $(this).data('product_id');

                Shop.addProductToCart(productId);
            });
    }
};

Shop.getProducts();
Shop.bindEvents();