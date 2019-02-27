$(function () {

    initBuyList();

    var $prod_list = $("#product-list");
    var $remained_prod_list = $("#remained-products-list");

    $("#add-button").click(function () {
        var prod_name = $("#input-field").val();
        if(prod_name) {
            addProduct(prod_name);
        }
    });

    $("#input-field").keypress(function (e) {
        if(e.which == 13) {
            var prod_name = $("#input-field").val();
            if(prod_name) {
                addProduct(prod_name);
            }
            return false;
        }
    })

    $prod_list.on("click", "div.product .buy-button", function (e) {
        var $button_clicked = $("button#" + e.target.id);
        var $parent = $button_clicked.closest("div");

        if($button_clicked.attr("clicked").localeCompare("false") == 0) {
            $("span#" + e.target.id).css("text-decoration", "line-through");

            moveToBought(e.target.id);

            $parent.find(".dismiss-button").css("display", "none");
            $parent.find(".plus-button").css("visibility", "hidden");
            $parent.find(".minus-button").css("visibility", "hidden");

            $button_clicked.text("Не куплено");
            $button_clicked.css("width", "70%");
            $button_clicked.attr("clicked", "true");
        } else {
            $("span#" + e.target.id).css("text-decoration", "none");

            moveToRemained(e.target.id);

            $parent.find(".dismiss-button").css("display", "initial");
            $parent.find(".plus-button").css("visibility", "initial");
            $parent.find(".minus-button").css("visibility", "initial");

            $button_clicked.text("Куплено");
            $button_clicked.css("width", "initial");
            $button_clicked.attr("clicked", "false");
        }
    });

    $prod_list.on("click", "div.product .dismiss-button", function (e) {
        var $button_clicked = $("button#" + e.target.id);
        var id = $button_clicked.closest("div").find(".prod-name").attr("id");
        $remained_prod_list.find("#status-" + id).remove();
        $button_clicked.closest("div").remove();
    });

    $prod_list.on("click", "div.product .plus-button", function (e) {
        var $parent = $("button#" + e.target.id).closest("div");
        var quantity = parseInt($parent.find(".quantity").text(), 10) + 1;
        $parent.find(".quantity").text(quantity);
        $parent.find(".minus-button").attr("active", "true");
        $parent.find(".minus-button").css("opacity", "1");

        var id = $parent.find(".prod-name").attr("id");
        $remained_prod_list.find("#status-" + id).find(".quantity").text(quantity);
    })

    $prod_list.on("click", "div.product .minus-button", function (e) {
        var $button_clicked = $("button#" + e.target.id);
        var $parent = $button_clicked.closest("div");
        if($button_clicked.attr("active").localeCompare("true") == 0){
            var id = $parent.find(".prod-name").attr("id");
            var quantity = parseInt($parent.find(".quantity").text(), 10) - 1;
            if(quantity > 1){
                $parent.find(".quantity").text(quantity);
                $remained_prod_list.find("#status-" + id).find(".quantity").text(quantity);
            } else {
                $parent.find(".quantity").text(quantity);
                $remained_prod_list.find("#status-" + id).find(".quantity").text(quantity);
                $button_clicked.attr("active", "false");
                $button_clicked.css("opacity", ".45");
            }
        }
    });

    $prod_list.on("click", "div.product .prod-name", function (e) {
        var $label = $("span#" + e.target.id);
        var $label_clicked = $label.clone();

        var content = $label_clicked.text() + "";

        var hidden_input = "<input type='text' id='hidden' value=" +
            "'" + content + "'" + " placeholder='Нова назва' style='float: left; width: 105px; font-size: 0.8em'>";

        $label.replaceWith(hidden_input);

        var $hidden = $("#hidden");
        $hidden.focus();

        $hidden.on("blur", function (e) {
            $hidden.replaceWith($label_clicked.text($hidden.val()));
        });

        $hidden.keyup(function () {
            $remained_prod_list.find("#status-" + $label_clicked.attr("id")).find(".name").text($hidden.val());
        });
    })
});

function moveToRemained(prod_id) {
    var $prod = $("#bought-products-list").find("#status-" + prod_id).clone();
    $("#bought-products-list").find("#status-" + prod_id).remove();
    $prod.css("text-decoration", "none");
    $("#remained-products-list").append($prod);
}


function moveToBought(prod_id) {
    var $prod = $("#remained-products-list").find("#status-" + prod_id).clone();
    $("#remained-products-list").find("#status-" + prod_id).remove();
    $prod.css("text-decoration", "line-through");
    $("#bought-products-list").append($prod);
}

function initBuyList() {
    addProduct("Помідори");
    addProduct("Печиво");
    addProduct("Сир");
}

function addProduct(product_name) {
    var $product = $("#product-template").clone();

    $("#input-field").val("");

    $product.find(".prod-name").text(product_name);
    $product.find(".prod-name").attr("id", "product-" + product_name);
    $product.find(".buy-button").attr("id", "product-" + product_name);
    $product.find(".buy-button").attr("clicked", "false");
    $product.find(".dismiss-button").attr("id", "dismiss-product-" + product_name);
    $product.find(".plus-button").attr("id", "add-product-" + product_name);
    $product.find(".minus-button").attr("id", "reduce-product-" + product_name);

    $product.removeAttr("id");
    $product.attr("class", "product");

    $("#product-list").append($product);

    addProduct_SL(product_name);
}

function addProduct_SL(product_name){
    var $sl_product_template = $("#status-column").find("#sl-product-template").clone();

    $sl_product_template.find(".name").text(product_name);
    $sl_product_template.attr("id", "status-product-" + product_name);
    $sl_product_template.attr("class", "product");

    $("#remained-products-list").append($sl_product_template);
}