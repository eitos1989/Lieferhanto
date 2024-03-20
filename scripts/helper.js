function getPriceStr(price) {
    return price.toFixed(2).toString().replace('.', ",") + " €";
}