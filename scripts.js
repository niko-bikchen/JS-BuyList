$(function () {

    initBuyList()

    $("#add-button").click(function () {
        addProduct($("#input-field").val())
    })

})

function initBuyList() {
    addProduct("Помідори")
    addProduct("Печиво")
    addProduct("Сир")
}

function addProduct(product_name) {
    var $product = $("#product-template").clone()

    $("#input-field").val("")

    $product.find(".prod-name").text(product_name)
    $product.removeAttr("id")
    $product.attr("class", "product")

    $("#product-list").append($product)

    addProduct_SL(product_name)
}

function addProduct_SL(product_name){
    var $sl_product_template = $("#status-column").find("#sl-product-template").clone()

    $sl_product_template.find(".name").text(product_name)
    $sl_product_template.removeAttr("id")
    $sl_product_template.attr("class", "product")

    $("#remained-products-list").append($sl_product_template)
}