function getPriceStr(price) {
    return price.toFixed(2).toString().replace('.', ",") + " €";
}

function stopClosing(event){
    event.stopPropagation();
}

function closeDialog() {
    document.getElementById("dialog").classList.add("d-none");  
}

function calcRatingCnt(){
    let ratingCnt = ratings.length;
    document.getElementById('rating-cnt').innerHTML = ratingCnt;
    document.getElementById('ratingCnt').innerHTML = ratingCnt;
}

// Replaces oldS with newS in the string fullS
function replaceString(oldS, newS, fullS) {
    for (let i = 0; i < fullS.length; ++i) {
      if (fullS.substring(i, i + oldS.length) === oldS) {
        fullS =
          fullS.substring(0, i) +
          newS +
          fullS.substring(i + oldS.length, fullS.length);
      }
    }
    return fullS;
}