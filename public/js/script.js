$(document).ready(function(){
    showCategories()
    showProducts()
})

function showCategories() {
    $.get( "/categories", function( data ) {
        var html = ''
        data.forEach(function(category) {
            html = html + '<li><a href="#" onClick="showProducts('+category.id+')">'+category.categorie+'</a></li>'
        })
        $('#categories').html(html)
    });
}

//todo: implement showProducts method
function showProducts(categoryId) {
    if(categoryId) {
        var url = '/categories/'+ categoryId +'/products';
    } else {
        var url = '/products'   
    }
    $.get(url, function(data) {
        var html = '';
        data.forEach(
            function(product) {
                html = html + '<div class="product">'
                  +  '<h2>'+product.nume+'</h2>'
                  +  '<p>Pret: '+product.pret_achiz+'</p>'
                  +  '<p>Categorie: '+product.category.categorie+'</p>'
                + '</div>';
                
               
                
                
                
                
            }
        )
        $('#content').html(html);
    })
}