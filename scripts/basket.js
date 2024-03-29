/** START BASKET FUNKTION */

function showSelection(selectionID, selectID) {
    let section = document.getElementById(selectID);
    let selectionText = section.options[section.selectedIndex].text;
    let selectionValue = section.options[section.selectedIndex].value;
    if(selectionValue.length > 0 ) {
        document.getElementById(selectionID).classList.remove('d-none');
        document.getElementById(selectionID + "Name").innerHTML = selectionText;
    }else{
        document.getElementById(selectionID).classList.add('d-none');
    }

    addIngridient(selectionText, selectionValue, selectID);
}

function deleteIngridiensFromBasket(ingridiensID, isTempBasket=true) {
    
    index = tempBasket[0]['ingredient'].findIndex(item => item.id === ingridiensID)
    console.log("Index of " + ingridiensID + " is: " + index);
    if (index > -1) { // only splice array when item is found
        tempBasket[0]['ingredient'].splice(index, 1);
    }

    calcBasketPrice(true);
}

function addIngridient(name, price, ingridiend_ID) {
    //console.log(tempBasket['ingredient']);

    const newIngredient = {
        id: ingridiend_ID,
        name: name,
        price: price
    };

    if (tempBasket[0]['ingredient'] == undefined) {
        tempBasket[0]['ingredient'] = [newIngredient];
    } else {
        const existingIngredientIndex = tempBasket[0]['ingredient'].findIndex(item => item.id === ingridiend_ID);

        if (existingIngredientIndex === -1) {
            tempBasket[0]['ingredient'].push(newIngredient);
        } else {
            tempBasket[0]['ingredient'][existingIngredientIndex] = newIngredient;
        }
    }

    calcBasketPrice(true);
}

function addtempBasket(name, price, count = 1, isTempBasket = true) {
    if (tempBasket.length === 0) {
        //console.log("basketIsEmpty");
        tempBasket = [{
            name: name,
            price: price,
            count: count,
            ingredient: []
        }];
        console.log("a new Item was added");
    } else {
        //console.log("change the given attributes for NAME, price");
        tempBasket[0]['name'] = name;
        tempBasket[0]['price'] = price;
        tempBasket[0]['count'] = count;
    }

    const cntPlus = count + 1;
    const cntMinus = count - 1 <= 0 ? 1 : count - 1;

    document.getElementById("modalArtPlus").setAttribute("onclick", `addtempBasket("${name}", "${price}", ${cntPlus})`);
    document.getElementById("modalArtMinus").setAttribute("onclick", `addtempBasket("${name}", "${price}", ${cntMinus})`);
    document.getElementById("tempArtCnt").innerHTML = count;
    calcBasketPrice();

    if (!isTempBasket) {
        transferTempBasketToBasket();
    }
}

function transferTempBasketToBasket() {

    if(basket.length == undefined){
        basket = tempBasket;
    }else {
        basket.push(tempBasket);
    }
    
    tempBasket = [];

    closeDialog();
    saveBaskettoLocalStorage();
    renderBasketContent();

}

function calcBasketPrice(isTempBasket = true) {
    basketArr = [];
    let basketPrice = 0.00;
    if(isTempBasket){
        basketArr = tempBasket;
    }else {
        basketArr = basket;
    }
    //console.log(basketArr)
    for (let i = 0; i < basketArr.length; i++) {
        basketPrice += calcArtPrice(basketArr[i])
    }
    if(isTempBasket) {
        document.getElementById('articleToBasketPrice').innerHTML = getPriceStr(basketPrice);
        document.getElementById('articleToBasketPrice').setAttribute("onclick",`transferTempBasketToBasket()`);
    }else {
        document.getElementById('basketTotal').innerHTML = getPriceStr(basketPrice);
        document.getElementById('basketSubtotal').innerHTML = getPriceStr(basketPrice);
        document.getElementById('basketBtnPrice').innerHTML = getPriceStr(basketPrice);
        document.getElementById('stickyWareBunchBtn').innerHTML = getPriceStr(basketPrice);
    }
    
}

function isElementInViewport(el) {
    if(el == null) {
        return false;
    }
    let rect = el.getBoundingClientRect(); // Holt die Größe und Position des Elements
    
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function showStickyBasketBtn() {

    if(isDialogOpen || isElementInViewport(document.getElementById('basketBtn')) || basket.length == 0) {
        hideStickyBasketButton();
    }else if(window.innerWidth < 1300 && !isElementInViewport(document.getElementById('basketBtn'))) {
        showStickyButton();
    }
}

function hideStickyBasketButton() {
    document.getElementById('stickyBasketBtn').classList.add("d-none"); 
}

function showStickyButton(){
    document.getElementById('stickyBasketBtn').classList.remove("d-none"); 
}

function calcArtPrice(basketItem) {

    if(Array.isArray(basketItem)) {
        basketItem = basketItem[0]; 
    }
    ret = 0.00;
    ret = parseFloat(basketItem['count']) * basketItem['price'];

    if(basketItem['ingredient'].length > 0) {
        for (let index = 0; index < basketItem['ingredient'].length; index++) {
            const element = basketItem['ingredient'][index];
            ret += parseFloat(element.price);
        }
    }
    //console.log(ret)
    return parseFloat(ret);    
}

function getIngidientsStr(basketItem) {
    ret = "";
    //console.log(basketItem.ingredient)
    if(basketItem.ingredient.length > 0) {
        for (let index = 0; index < basketItem.ingredient.length; index++) {
            const ingredient = basketItem.ingredient[index];
            if(index > 0){
                ret += ", "; 
            }
            ret += ingredient['name']
        }
    }

    return ret;
}

function renderEmptyBasket() {

    let ret = `
    <img src="./img/bunch-ingredients-48.png" />
    <div id="basketInput">
        <h3>Fülle deine Warenkorb</h3>
        <p>Füge einige leckere Gerichte aus der Speisekarte hinzu unf bestelle dein Essen</p>
    </div>`;

    document.getElementById('basketContent').innerHTML = ret;
    document.getElementById('basketContent').classList.remove('basketContentWrapper')
    localStorage.removeItem('basket');

}

function orderSuccess(event) {
    basket = [];
    localStorage.removeItem("basket");
    renderEmptyBasket();
    openDialog(event, 'success');
    document.getElementById(stickyWareBunchBtn)
}

function renderBasketContent() {
    if (!basket || basket.length === 0) {
        renderEmptyBasket();
        return;
    }

    const content = generateBasketContent();
    displayBasketContent(content);

    renderArtComment();
    calcBasketPrice(false);
}

function generateBasketContent() {
    let content = "";

    for (let i = 0; i < basket.length; i++) {
        const article = basket[i][0];
        const price = calcArtPrice(article);
        content += generateArticleHTML(article, price, i);
    }

    return content;
}

function generateArticleHTML(article, price, index) {
    let html = `
        <div class="basketArtWrapper">
            <div class="basketArtContent">
                <div class="basketArtCnt">${article['count']}</div>
                <div class="basketArtRight">
                    <div class="articleHeadline">
                        <div class="basketArtPrice">${article['name']}</div>
                        <div id='artPrice_${index}'>${getPriceStr(price)}</div>
                    </div>
    `;

    if (getIngidientsStr(article).length > 0) {
        html += `
                    <div class="variantText">
                        ${getIngidientsStr(article)}
                    </div>
        `;
    }

    html += `
                    <div class="basketArtFooter">
                        <div id=comment_${index} onclick="addCommentToBasketArt(${index})" class="addComment">
                            Anmerkung hinzufügen
                        </div>
                        <div class="dflexevenly noRightMargin">
                            <div class="roundedImg" id="modalArtMinus" onclick="reduceArtCount(${index})"> - </div>
                            <div id="ArtCnt">${article['count']}</div>
                            <div class="roundedImg marginSide" id="modalArtPlus" onclick="addArtCount(${index})"> + </div>
                        </div>
                    </div>
                    <div id="artCommentSection_${index}" class="d-none artCommentSection">
                    </div>
                </div>
            </div>
            <hr>
        </div>
    `;

    return html;
}

function generateHTMLBasketFooter() {
    return `
        <div class="basketFooter">
        <div class="dflexbetween">
            <div>Zwischensumme</div>
            <div id="basketSubtotal">19,25</div>
        </div>
        <div class="dflexbetween highlightedFont">
            <div>Gesamtsumme</div>
            <div id="basketTotal">19,25</div>
        </div>
        </div>
        <div class="priceBtn basketBtn" id="basketBtn" onclick="orderSuccess(event)">
            Bezahlen (<span id="basketBtnPrice"></span>)
        </div>
    `;
}

function displayBasketContent(content) {
    const basketContent = document.getElementById('basketContent');
    basketContent.classList.add('basketContentWrapper');
    content += generateHTMLBasketFooter();
    basketContent.innerHTML = content;
}

function getArtCommentStr(artIndex) {
    if(basket[artIndex][0]['comment'] == undefined) {
        return `
        <div id="artCommentSection_${i}" class="d-none">
            <div id="artCommentContent_${i}"></div>
            <div class="" onclick="editArtComment(${i})">Anmerkung bearbeiten</div>
        </div>
        `;
    }else {
        return `
        <div id="artCommentSection_${i}">
            <div id="artCommentContent_${i}">${basket[artIndex][0]['comment']}</div>
            <div class="addComment" onclick="editArtComment(${i})">Anmerkung bearbeiten</div>
        </div>
        `;
    }
}

function reduceArtCount(indexOfArt) {
    curCount = basket[indexOfArt][0]['count'];
    newCount = curCount - 1;
    if(newCount == 0) {
        basket.splice(indexOfArt, 1)
    }else {
        basket[indexOfArt][0]['count'] = newCount;
    }
    saveBaskettoLocalStorage();
    renderBasketContent();
    
}

function addArtCount(indexOfArt) {
    curCount = basket[indexOfArt][0]['count'];
    newCount = curCount + 1;
    basket[indexOfArt][0]['count'] = newCount;
    saveBaskettoLocalStorage();
    renderBasketContent();
}

function addCommentToBasketArt(indexOfArt, value="") {
    let valueText = "";
    abortLink = `<div class="saveLinks" onclick="abortArtComment(${indexOfArt})">Abbrechen</div>`;
    if(value.length > 1) {
        valueText = value;
        abortLink = `<div class="saveLinks" onclick="deleteArtComment(${indexOfArt})">Löschen</div>`;
        document.getElementById('comment_'+indexOfArt).innerText = "";
    }
    document.getElementById('artCommentSection_'+ indexOfArt).innerHTML = 
    `
    <textarea maxlength="50"  id="artCommentText_${indexOfArt}">${valueText}</textarea>
    <div class="artCommentSaveLinks">
        ${abortLink}
        <div class="saveLinks" onclick="saveArtComment(${indexOfArt})">Speichern</div>
    </div>
    `;
    document.getElementById('artCommentSection_'+ indexOfArt).classList.add('artCommentSection');
    document.getElementById('artCommentSection_'+ indexOfArt).classList.remove('artCommentSectionWithValue');
    document.getElementById('artCommentSection_'+ indexOfArt).classList.remove('d-none');
}

function abortArtComment(indexOfArt) {
    document.getElementById('artCommentSection_'+ indexOfArt).classList.add('d-none');
    document.getElementById("artCommentText_"+ indexOfArt).value = "";
}

function saveArtComment(indexOfArt) {
    basket[indexOfArt][0]['comment'] = document.getElementById("artCommentText_"+ indexOfArt).value;
    
    document.getElementById('artCommentSection_'+ indexOfArt).classList.add('artCommentSectionWithValue');
    document.getElementById('artCommentSection_'+ indexOfArt).classList.remove('artCommentSection');
    document.getElementById('comment_'+indexOfArt).innerText = "";

    document.getElementById('artCommentSection_'+ indexOfArt).innerHTML = 
    `
    <div>${basket[indexOfArt][0]['comment']}</div>
    <div class="artCommentSaveLinks">
        <div class="saveLinks" onclick="editArtComment(${indexOfArt})">Anmerkung bearbeiten</div>
    </div>
    `;
    saveBaskettoLocalStorage();

}

function renderArtComment() {
    
    for (let indexOfArt = 0; indexOfArt < basket.length; indexOfArt++) {
        if(basket[indexOfArt][0]['comment'] == undefined){
            //console.log('found no Comment');
            document.getElementById('artCommentSection_'+ indexOfArt).classList.add('artCommentSection');
            document.getElementById('artCommentSection_'+ indexOfArt).classList.remove('artCommentSectionWithValue');
            document.getElementById('artCommentSection_'+ indexOfArt).classList.add('d-none');
            //document.getElementById('comment_'+indexOfArt).classList.remove('d-none');
            document.getElementById('comment_'+indexOfArt).innerText = `
            Anmerkung hinzufügen
            `;
        }else {
            console.log('found 1 Comment: ' +  basket[indexOfArt][0]['comment']);
            document.getElementById('artCommentSection_'+ indexOfArt).classList.add('artCommentSectionWithValue');
            document.getElementById('artCommentSection_'+ indexOfArt).classList.remove('artCommentSection');
            document.getElementById('artCommentSection_'+ indexOfArt).classList.remove('d-none');
            //document.getElementById('comment_'+indexOfArt).classList.add('d-none');
        
            document.getElementById('comment_'+indexOfArt).innerText = "";
            document.getElementById('artCommentSection_'+ indexOfArt).innerHTML = 
            `
            <div>${basket[indexOfArt][0]['comment']}</div>
            <div class="artCommentSaveLinks">
                <div class="saveLinks" onclick="editArtComment(${indexOfArt})">Anmerkung bearbeiten</div>
            </div>
            `;
        }
    }
}
    
function editArtComment(indexOfArt) {
    addCommentToBasketArt(indexOfArt, basket[indexOfArt][0]['comment']);
}

function deleteArtComment(indexOfArt) {
    console.log('indexofComment: ');
    delete basket[indexOfArt][0]['comment'];
    document.getElementById('artCommentSection_'+ indexOfArt).classList.add('d-none');
    document.getElementById("artCommentText_"+ indexOfArt).value = "";
    renderArtComment();
    saveBaskettoLocalStorage();

}

function saveBaskettoLocalStorage(){
    localStorage.setItem('basket', JSON.stringify(basket));
}

function loadBasketFromLocalStorage() {
    
    if(localStorage.getItem('basket') == null) {
        basket = [];
    }else {
        basket = JSON.parse(localStorage.getItem('basket'));
        renderBasketContent();
    }
}

/** START BASKET FUNKTION */