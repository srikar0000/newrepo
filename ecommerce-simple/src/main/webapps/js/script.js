document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            alert(`Product ${productId} added to cart (Not really implemented yet!)`);
            // In a real application, you would send an AJAX request to the server
            // to update the cart.
        });
    });
});