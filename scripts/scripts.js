function openDialog(event, dialogType, articleID=0) {
    
    switch (dialogType) {
        case 'rating' :
            document.getElementById('modalHeadline').innerHTML = "Über dieses Geschäft";
            openTab(event, 'rating');     
            break;
        
        case 'info' :
            document.getElementById('modalHeadline').innerHTML = "Über dieses Geschäft";
            openTab(event, 'info') ;
            break;
        
        case 'offer' :
            document.getElementById('modalHeadline').innerHTML = "Über dieses Geschäft";
            openTab(event, 'offer') ;   
            break;

        case 'allergens' :
            renderAllergeneModal(articleID)
            break;

        case 'articleIngridens' :
            let article = getArticle(articleID)
            document.getElementById('modalHeadline').innerHTML = article['name'];
            renderIngridensModal(article);
            break;

        case 'success' :

        default:
        break;
    }
    document.getElementById("dialog").classList.remove("d-none");
}



function renderIngridensModal(article) {
    let priceStr = getPriceStr(article['price']);
    
    //vorhandene Elemente ausblenden
    document.getElementById('dialogNav').classList.add('d-none');
    document.getElementById('rating').classList.add('d-none');
    document.getElementById('info').classList.add('d-none');
    document.getElementById('offer').classList.add('d-none');
    document.getElementById('allergenAndSubstanceInfo').classList.add('d-none');
    document.getElementById('ingridiensChoises').classList.remove('d-none');
    
    //console.log(article['name']);
    renderVariantsHTML(loadVariantsArrbyArticleID(article['id']));

    document.getElementById('articleDesc').innerHTML = article['extra Info'];
    document.getElementById('articlePrice').innerHTML = priceStr;
    document.getElementById('articleImg').src = article['img'];
    document.getElementById('articleToBasketPrice').innerHTML = priceStr;
}





function getVariantbyID(variantID){
    for (let index = 0; index < variantes.length; index++) {
        const element = variantes[index];
        if(element['id'] == variantID) {
            return element;
        }
    }
    return null;
}

function loadVariantsArrbyArticleID(articleID){
    let article = getArticle(articleID);
    let articleVarianten = article['variante'];
    let ret = [];
    for (let i = 0; i < articleVarianten.length; i++) {
        const element = getVariantbyID(articleVarianten[i]);
        ret[i] = element;
    }

    if(ret.length == 0) {
        return null
    }

    console.log(ret);
    return ret;
}

function renderVariantsHTML(variantArr) {
    ret = ""
    if(variantArr == null) {
        document.getElementById('ingridiensList').innerHTML = ret;
        return;
    }
    for (let i = 0; i < variantArr.length; i++) {
        const element = variantArr[i];
        if(element['parent'] > 0) {
            element['choises'] = getParentChoises(element);
        }
        if(element['type'] == 'select') {
            ret += renderSelectVariantHTML(element['choises'], element['name']);
        }else {
            ret += renderMultiVariantHTML (element['choises'], element['name'],element['id']);
        }
    }

    document.getElementById('ingridiensList').innerHTML = ret;
}

function getParentChoises(element){

    let parentVariant = getVariantbyID(element['parent']);
    let parentChoises = parentVariant['choises'];
    let choise = [];
    if(element['parentPriceOnTop'] > 0){
        for (let index = 0; index < parentChoises.length; index++) {
            choise = parentChoises[index];
            choise['price'] += element['parentPriceOnTop'];
        }
    }
    
    return parentChoises;
}

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
    console.log(tempBasket['ingredient']);

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

    console.log(tempBasket);
    calcBasketPrice(true);
}

function addtempBasket(name, price, count = 1, isTempBasket = true) {
    if (tempBasket.length === 0) {
        console.log("basketIsEmpty");
        tempBasket = [{
            name: name,
            price: price,
            count: count,
            ingredient: []
        }];
        console.log("a new Item was added");
    } else {
        console.log("change the given attributes for NAME, price");
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
    }
    
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
/**
 * 
 * @returns 

function renderBasketcontent() {
    let ret = "";
    if(basket.length == 0 || basket == undefined) {
        renderEmptyBasket();
        return;
    }
    //console.log("renderBasket length: " + basket.length);
    console.log("renderBasket");
    console.log(basket)

    for (let i = 0; i < basket.length; i++) {
        const ele = basket[i][0];
        //console.log(ele);
        const price = calcArtPrice(ele);
        ret += `
            <div class="basketArtWrapper">
                <div class="basketArtContent">
                    <div class="basketArtCnt">${ele['count']}</div>
                    <div class="basketArtRight">
                        <div class="articleHeadline">
                            <div class="basketArtPrice">${ele['name']}</div>
                            <div id='artPrice_${i}'>${getPriceStr(price)}</div>
                        </div>
                        ` 
        if(getIngidientsStr(ele).length > 0){
            ret += `
                        <div class="variantText">
                        ${getIngidientsStr(ele)}
                        </div>
            `;
        }
        ret +=                 
                        `
                        <div class="basketArtFooter">
                            <div id=comment_${i} onclick="addCommentToBasketArt(${i})" class="addComment">
                                Anmerkung hinzufügen
                            </div>
                            <div class="dflexevenly noRightMargin">
                                <div class="roundedImg" id="modalArtMinus" onclick="reduceArtCount(${i})"> - </div>
                                <div id="ArtCnt">${ele['count']}</div>
                                <div class="roundedImg marginSide" id="modalArtPlus" onclick="addArtCount(${i})"> + </div>
                            </div>
                        </div>
                        <div id="artCommentSection_${i}" class="d-none artCommentSection">
                        </div>
                    </div>
                </div>
                <hr>
            </div>
            `;
    }
    ret +=
    `
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
            <div class="priceBtn basketBtn" onclick="">
                Bezahlen (<span id="basketBtnPrice"></span>)
            </div>
    `;
    document.getElementById('basketContent').classList.add('basketContentWrapper')
    document.getElementById('basketContent').innerHTML = ret;

    renderArtComment();
    calcBasketPrice(false);
}
 */
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

function displayBasketContent(content) {
    const basketContent = document.getElementById('basketContent');
    basketContent.classList.add('basketContentWrapper');
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
            console.log('found no Comment');
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
    console.log("we save the Basket local");
}

function loadBasketFromLocalStorage() {
    
    if(localStorage.getItem('basket') == null) {
        basket = [];
    }else {
        basket = JSON.parse(localStorage.getItem('basket'));
        renderBasketContent();
    }
}

function renderMultiVariantHTML (choisesArr, name, choise_id) {
    
    let ret = `
    <div class="ingridiensListChoise">
        <div class="ingridiensListHeadline">
            ${name}
        </div>
        <div class="ingridiensChoises">
    `;
        
    for (let i = 0; i < choisesArr.length; i++) {
        const element = choisesArr[i];
        ret += `
        <label class="container">
            <div class="choiseName">
                <div>${element['choise']}( +${element['price']} € )</div>
                <div class="smallIcon" onclick="openDialog(event, 'allergens', 1)">
                    <img src="./img/icons/info-24.png">
                </div>
            </div>
            <input type="checkbox" value="${element['price']}" id="${choise_id}_${element['choise']}" onclick='addIngridient("${element['choise']}( +${element['price']} € )", "${element['price']}", "${choise_id}_${element['choise']}"); changeOnClickbyCheckboxToDelete("${element['choise']}( +${element['price']} € )", "${element['price']}", "${choise_id}_${element['choise']}")' />
            <span class="checkmark"></span>
        </label>
        `;
    }

    ret +=`
        </div>
    </div>
        `;

    return ret;
}

function changeOnClickbyCheckboxToDelete(name, price, checkboxID) {
    console.log("changeOnClickbyCheckboxToDelete called");
    document.getElementById(checkboxID).setAttribute("onclick", `changeOnClickbyCheckboxToAdd("${name}", "${price}", "${checkboxID}"); deleteIngridiensFromBasket("${checkboxID}")`);
}

function changeOnClickbyCheckboxToAdd(name, price, checkboxID) {
    console.log("changeOnClickbyCheckboxToAdd called");
    document.getElementById(checkboxID).setAttribute("onclick", `changeOnClickbyCheckboxToDelete("${name}", "${price}", "${checkboxID}"); addIngridient("${name}", "${price}", "${checkboxID}")`);
}

function readDatafromForm(articleID) {
    loadVariantsArrbyArticleID(articleID)
}

function createRatinghtml(finalrating) {
    ratingHTML = `
    <div class="stars">
        <div class="star"><img id="star1" src="./img/star-128.png" /></div>
        <div class="star"><img id="star2" src="./img/star-128.png" /></div>
        <div class="star"><img id="star3" src="./img/star-128.png" /></div>
        <div class="star"><img id="star4" src="./img/star-128.png" /></div>
        <div class="star"><img id="star5" src="./img/star-128.png" /></div>
    </div>`;

    if( finalrating > 3.5 & finalrating < 4.5 ){
        ratingHTML = replaceString('<img id="star5" src="./img/star-128.png" />', '<img src="./img/star-4-128.png"/>', ratingHTML);
    }else if( finalrating > 2.5 & finalrating < 3.5 ){
        ratingHTML = replaceString('<img id="star5" src="./img/star-128.png" />', '<img src="./img/star-4-128.png"/>', ratingHTML);
        ratingHTML = replaceString('<img id="star4" src="./img/star-128.png" />', '<img src="./img/star-4-128.png"/>', ratingHTML);
    }else if( finalrating > 1.5 & finalrating < 2.5 ){
        ratingHTML = replaceString('<img id="star5" src="./img/star-128.png" />', '<img src="./img/star-4-128.png"/>', ratingHTML);
        ratingHTML = replaceString('<img id="star4" src="./img/star-128.png" />', '<img src="./img/star-4-128.png"/>', ratingHTML);
        ratingHTML = replaceString('<img id="star3" src="./img/star-128.png" />', '<img src="./img/star-4-128.png"/>', ratingHTML);
    }else if( finalrating > 0.5 & finalrating < 1.5 ){
        ratingHTML = replaceString('<img id="star5" src="./img/star-128.png" />', '<img src="./img/star-4-128.png"/>', ratingHTML);
        ratingHTML = replaceString('<img id="star4" src="./img/star-128.png" />', '<img src="./img/star-4-128.png"/>', ratingHTML);
        ratingHTML = replaceString('<img id="star3" src="./img/star-128.png" />', '<img src="./img/star-4-128.png"/>', ratingHTML);
        ratingHTML = replaceString('<img id="star2" src="./img/star-128.png" />', '<img src="./img/star-4-128.png"/>', ratingHTML);
    }else if(finalrating < 0.5){
        ratingHTML = replaceString('<img id="star5" src="./img/star-128.png" />', '<img src=""./img/star-4-128.png"/>', ratingHTML);
        ratingHTML = replaceString('<img id="star4" src="./img/star-128.png" />', '<img src=""./img/star-4-128.png"/>', ratingHTML);
        ratingHTML = replaceString('<img id="star3" src="./img/star-128.png" />', '<img src=""./img/star-4-128.png"/>', ratingHTML);
        ratingHTML = replaceString('<img id="star2" src="./img/star-128.png" />', '<img src=""./img/star-4-128.png"/>', ratingHTML);
        ratingHTML = replaceString('<img id="star1" src="./img/star-128.png" />', '<img src=""./img/star-4-128.png"/>', ratingHTML);
    }
    return ratingHTML
}

function setactive(idText) {
    if(idText == "deliveryToggle") {
        document.getElementById('deliveryToggle').classList.add('elactiv');
        document.getElementById('pickupToggle').classList.remove('elactiv');
    }else {
        document.getElementById('deliveryToggle').classList.remove('elactiv');
        document.getElementById('pickupToggle').classList.add('elactiv');
    }
}

function openTab(event, activTab) {
    event.stopPropagation();
    document.getElementById('allergenAndSubstanceInfo').classList.add('d-none');
    document.getElementById('dialogNav').classList.remove('d-none');
    document.getElementById('ingridiensChoises').classList.add('d-none');
    switch (activTab) {
        case 'rating' :
            document.getElementById('rating').classList.remove('d-none');
            document.getElementById('info').classList.add('d-none');
            document.getElementById('offer').classList.add('d-none');

            document.getElementById('tabInfo').classList.remove('tabActiv');
            document.getElementById('tabReview').classList.add('tabActiv');
            document.getElementById('tabOffer').classList.remove('tabActiv');    
        break;
        
        case 'info' :
            document.getElementById('rating').classList.add('d-none');
            document.getElementById('info').classList.remove('d-none');
            document.getElementById('offer').classList.add('d-none');

            document.getElementById('tabInfo').classList.add('tabActiv');
            document.getElementById('tabReview').classList.remove('tabActiv');
            document.getElementById('tabOffer').classList.remove('tabActiv');
        break;
        
        case 'offer' :
            document.getElementById('rating').classList.add('d-none');
            document.getElementById('info').classList.add('d-none');
            document.getElementById('offer').classList.remove('d-none');

            document.getElementById('tabInfo').classList.remove('tabActiv');
            document.getElementById('tabReview').classList.remove('tabActiv');
            document.getElementById('tabOffer').classList.add('tabActiv');    
        break;

        default:
        break;
    }

}

function calcRatings(){
    let rating = 0;
    let finalrating = 0;
    for(let i = 0; i < ratings.length; i++){
        completeRating = (ratings[i]['ratingDelivery'] + ratings[i]['ratingMeal']) / 2;
        rating = rating + completeRating;
    }
    
    finalrating = rating/ratings.length;
    document.getElementById('stars').innerHTML = createRatinghtml(finalrating);
    document.getElementById('Modalstars').innerHTML = createRatinghtml(finalrating);
    
}

function loadNavbar() {
    document.getElementById("groupNav").innerHTML = `
    <div class="roundedImgSmall" id="arrowLeft" onclick='scrollLeftSide()'>
        <img src="./img/icons/arrow-88-16.png">
    </div> 
    <div id="groupLine"></div>
    <div class="roundedImgSmall" id="arrowRight" onclick='scrollRightSide()'>
        <img src="./img/icons/arrow-24-16.png">
    </div>`;
}

function createSortedGroupsArr() {
    let groupsArr = []; 
    for(let i = 0; i < groups.length; i++){
        if(groups[i]['isActive']){
            groupsArr[groups[i]['sort-id']] = groups[i]['name'];
        } 
    }
    return groupsArr;
}

function scrollLeftSide() {
    document.getElementById('groupLine').scrollBy(-50, 0);
}

function scrollRightSide() {
    document.getElementById('groupLine').scrollBy(50, 0);
}

function renderArticleListByGroupID(groupID, searchword="") {
    //console.log(groupID);
    let ret = "";
    for (let index = 0; index < article.length; index++) {
        const element = article[index]
        if(article[index]['groups'].includes(groupID)) {
            
            if(searchword.length > 1) {
                console.log("found article with SearchWord: " + searchword)
                if(article[index]['name'].toLowerCase().includes(searchword) || article[index]["extra Info"].toLowerCase().includes(searchword)) {
                    //console.log(article[index]['name'] + " includes: => " + searchword);
                    ret += renderArticleByArticleID(article[index]['id']);
                }
            }else {
                ret += renderArticleByArticleID(article[index]['id']);
            }
        }
    }
    
    return ret;
}

//template function which return the HTML Article Template
/**
function renderArticleByArticleID(articleID) {
    let ret = "";
    for (let index = 0; index < article.length; index++) {
        if(article[index]['id'] == articleID){
            let articleEle = article[index];
            if(articleEle['variante'].length == 0) {
                onclickStr = `addtempBasket('${articleEle['name']}', '${articleEle['price']}', 1, false)`;
            }else {
                onclickStr = `openDialog(event, 'articleIngridens', ${articleEle['id']}); addtempBasket('${articleEle['name']}', '${articleEle['price']}', 1, true)`;
            }
            ret = `
            <div class="article">
                <div class="articleInnerDiv">
                    <div class="articleHeadLine">
                        <div class="articleHeadLineLeft">
                            <div>
                                <h3>${articleEle['name']}</h3>
                            </div>
                            <div class="smallIcon" onclick="openDialog(event, 'allergens', ${articleEle['id']})">
                                <img src="./img/icons/info-24.png">
                            </div>
                        </div>
                        <div class="roundedImg addArticle" onclick="${onclickStr}">
                            +
                        </div>
                    </div>
                    <div class="articleDescDiv" onclick="${onclickStr}">                                
                        <div class="articleDescInnerDiv">
                            <div>
                                <div class="articleDesc">
                                    ${articleEle['extra Info']}
                                </div>
                                <div class="articleVariant">
                                    ${articleEle['extra Info']}
                                </div>
                            </div>
                            <div class="articlePrice">
                                ${articleEle['price']}
                            </div>   
                        </div>
                        <div>
                            <img class="articleImg" src="${articleEle['img']}">
                        </div>
                    </div>
                </div>
            </div>
            `;
        } 
    }    
    return ret;
}
 */

function renderArticleByArticleID(articleID) {
    for (let index = 0; index < article.length; index++) {
        const articleEle = article[index];
        
        if (articleEle['id'] === articleID) {
            const onclickStr = generateOnclickString(articleEle);
            const articleHTML = createArticleHTML(articleEle, onclickStr);
            return articleHTML;
        } 
    }
    return "";
}

function generateOnclickString(articleEle) {
    if (articleEle['variante'].length === 0) {
        return `addtempBasket('${articleEle['name']}', '${articleEle['price']}', 1, false)`;
    } else {
        return `openDialog(event, 'articleIngridens', ${articleEle['id']}); addtempBasket('${articleEle['name']}', '${articleEle['price']}', 1, true)`;
    }
}

function createArticleHTML(articleEle, onclickStr) {
    return `
        <div class="article">
            <div class="articleInnerDiv">
                ${createArticleHeadline(articleEle, onclickStr)}
                ${createArticleDescription(articleEle, onclickStr)}
            </div>
        </div>
    `;
}

function createArticleHeadline(articleEle, onclickStr) {
    return `
        <div class="articleHeadLine">
            <div class="articleHeadLineLeft">
                <div><h3>${articleEle['name']}</h3></div>
                <div class="smallIcon" onclick="openDialog(event, 'allergens', ${articleEle['id']})"><img src="./img/icons/info-24.png"></div>
            </div>
            <div class="roundedImg addArticle" onclick="${onclickStr}">+</div>
        </div>
    `;
}

function createArticleDescription(articleEle, onclickStr) {
    return `
        <div class="articleDescDiv" onclick="${onclickStr}">                                
            <div class="articleDescInnerDiv">
                <div class="articleDesc">${articleEle['extra Info']}</div>
                <div class="articleVariant">${articleEle['extra Info']}</div>
                <div class="articlePrice">${articleEle['price']}</div>   
            </div>
            <div><img class="articleImg" src="${articleEle['img']}"></div>
        </div>
    `;
}

function getGroupById(group_id) {
    for (let index = 0; index < groups.length; index++) {
        const group = groups[index];
        if(group["group-id"] == group_id){
            return group;
        }
    }
}

/**

function getArticleSearchGroups() {
    searchword = document.getElementById('search').value;
    searchword = searchword.toLowerCase();
    let ret = [];
    counter = 0;
    for (let index = 0; index < article.length; index++) {
        const element = article[index];
        if(element.name.toLowerCase().includes(searchword) || element["extra Info"].toLowerCase().includes(searchword)) {
            if(element.groups.length > 1){
                for (let i = 0; i < element.groups.length; i++) {
                    const group = element.groups[i];
                    ret[counter] = getGroupById(group);
                    counter++;
                }
            }else {
                ret[counter] = getGroupById(element.groups[0]);
                counter++;
            }
        }
    }
    let retSet = new Set(ret);

    return Array.from(retSet);
}
*/
function getArticleSearchGroups() {
    const searchword = document.getElementById('search').value.toLowerCase();
    console.log("searchword: " + searchword);

    const result = [];
    let counter = 0;

    for (let index = 0; index < article.length; index++) {
        const element = article[index];
        const nameIncludesSearchWord = element.name.toLowerCase().includes(searchword);
        const extraInfoIncludesSearchWord = element["extra Info"].toLowerCase().includes(searchword);

        if (nameIncludesSearchWord || extraInfoIncludesSearchWord) {
            addGroupsToResult(element, result, counter);
            counter = updateCounter(counter, element.groups.length);
        }
    }

    const resultSet = new Set(result);

    return Array.from(resultSet);
}

function addGroupsToResult(element, result, counter) {
    const groups = element.groups.length > 1 ? element.groups : [element.groups[0]];

    for (let i = 0; i < groups.length; i++) {
        const group = getGroupById(groups[i]);
        result[counter] = group;
        counter++;
    }
}

function updateCounter(counter, groupLength) {
    return counter + groupLength;
}
/**
function renderArticleGroups(searchword = "") {
    let sortedArticleGroups = [];
    let articleGroups = [];
    let ret = "";
    let groupHtmlStr = "";

    if(searchword.length == 0) {
        articleGroups = groups;
    }else {
        searchword = document.getElementById('search').value;
        articleGroups = getArticleSearchGroups();
        console.log("Sw: " + searchword);
        //console.log(getArticleSearchGroups())
    }
    //console.log(typeof(articleGroups))


    for (let index = 0; index < articleGroups.length; index++) {
        //console.log(articleGroups[index]['name']);
        groupHtmlStr = `<div class="articleGroup" id="group_${articleGroups[index]['name']}">`;
        if(articleGroups[index]['img'].length > 1){
            groupHtmlStr += `<img class="articleGroupIMG" src="${articleGroups[index]['img']}" />`;
        }
        groupHtmlStr +=
            `<h2>${articleGroups[index]['name']}</h2>
            <div class="articleVariant">${articleGroups[index]['desc']}</div>
            `;
        groupHtmlStr += renderArticleListByGroupID(articleGroups[index]['group-id'],searchword) 
        groupHtmlStr += 
        `
        </div>
        `; 
        
        sortedArticleGroups[groups[index]['sort-id']] = groupHtmlStr;
        //console.log(groupHtmlStr);
     
    }
    //console.log(sortedArticleGroups);
    for (let i = 0; i < sortedArticleGroups.length; i++) {
        if(sortedArticleGroups[i] != undefined) {
            ret +=  sortedArticleGroups[i];
        }
        
    }

    //add Impressum
    ret += `
    <div class="infoWrapper marginImpressum" id="impressum">
        <div class="infoHeadline">
            <div class="infoHeadImg">
                <img src="./img/clock-3-24.png">
            </div>
            <div>
                <h3>Impressum</h3>
            </div>
        </div>
        <div class="impressum-Footer">
            John Doe handelt im Namen von Bring me 'A' Pizza Berlin<br>
            Musterstraße 23<br>
            12345 Buxtehude<br><br>
            
            Fax: 0000 0000 000 <br>
            MwSt-Nummer: DE000 000 000<br>
            
            Plattform der EU-Kommission zur Online-Streitbeilegung: https://ec.europa.eu/consumers/odr
            <hr>
            Wir sind ein professioneller Anbieter. Erfahre mehr darüber, wie wir gemeinsam mit Lieferhanto.de die Verbraucherverantwortung übernehmen.
        </div>
    </div>
    `;
    
    document.getElementById('articleListWrap').innerHTML = ret;
}
*/
function renderArticleGroups(searchword = "") {
    let articleGroups = [];
    let ret = "";
    let sortedArticleGroups = [];

    if (searchword.length == 0) {
        articleGroups = groups;
    } else {
        searchword = document.getElementById('search').value;
        articleGroups = getArticleSearchGroups();
        console.log("Sw: " + searchword);
    }

    sortedArticleGroups = generateSortedArticleGroups(articleGroups, searchword);
    ret = buildArticleHTML(sortedArticleGroups);
    appendImpressum(ret);
}

function generateSortedArticleGroups(articleGroups, searchword) {
    let sortedArticleGroups = [];

    for (let index = 0; index < articleGroups.length; index++) {
        let groupHtmlStr = generateGroupHtmlStr(articleGroups[index], searchword);
        sortedArticleGroups[groups[index]['sort-id']] = groupHtmlStr;
    }

    return sortedArticleGroups;
}

function generateGroupHtmlStr(group, searchword) {
    let groupHtmlStr = `<div class="articleGroup" id="group_${group['name']}">`;

    if (group['img'].length > 1) {
        groupHtmlStr += `<img class="articleGroupIMG" src="${group['img']}" />`;
    }

    groupHtmlStr += `
        <h2>${group['name']}</h2>
        <div class="articleVariant">${group['desc']}</div>
    `;

    groupHtmlStr += renderArticleListByGroupID(group['group-id'], searchword);

    groupHtmlStr += `</div>`;

    return groupHtmlStr;
}

function buildArticleHTML(sortedArticleGroups) {
    let ret = "";

    for (let i = 0; i < sortedArticleGroups.length; i++) {
        if (sortedArticleGroups[i] != undefined) {
            ret += sortedArticleGroups[i];
        }
    }

    return ret;
}

function appendImpressum(ret) {
    ret += `
        <div class="infoWrapper marginImpressum" id="impressum">
            <!-- Impressum HTML hier einfügen -->
        </div>
    `;

    document.getElementById('articleListWrap').innerHTML = ret;
}

function createGroupLineHTML(groupsarr) {
    loadNavbar();
    document.getElementById('groupLine').innerHTML = "";
    for (let index = 0; index < groupsarr.length; index++) {
        let groupName = groupsarr[index];
        if(index == 0){
            document.getElementById('groupLine').innerHTML +=
            `<div class="group activeGroup" onclick=changeActiveGroup(this)>
                <a href="#group_${groupName}">${groupName}</a>
            </div>`;
        }else {
            document.getElementById('groupLine').innerHTML +=
            `<div class="group" onclick=changeActiveGroup(this)>
                <a href="#group_${groupName}">${groupName}</a>
            </div>`;
        }
    }
}

function changeActiveGroup(ele) {
    let groupLine = document.getElementById('groupLine');
    let groups = groupLine.getElementsByClassName('group');
    
    for (let i = 0; i < groups.length; i++) {
        const cur = document.getElementsByClassName('activeGroup');
        if(cur.length > 0){
            cur[0].className = cur[0].className.replace("activeGroup", "");
        }
    }    

    ele.classList.add("activeGroup");
}

function changeHeart() {
    curHeart = document.getElementById('loveFood').src;
    if(curHeart.includes("regular")){
        document.getElementById('loveFood').src = "./img/icons/solid/heart.svg";
    }else {
        document.getElementById('loveFood').src = "./img/icons/regular/heart.svg";
    }
}

function changeNavigation(){
    if(document.getElementById("groupNav").innerHTML.includes("arrowLeft")){
        document.getElementById("groupNav").innerHTML = `
        <div id="searchBar">
            <input type="text" name="search" id="search" placeholder="Worauf haben Sie heute Hunger" onkeydown="renderArticleGroups('search')" />
        </div>
        `;
    }else {
        createGroupLineHTML(createSortedGroupsArr());
        renderArticleGroups();
    }
}

function createReviewListHTML() {
    reviewStr = '';
    reviewListStr = '';
    
    for (let index = 0; index < ratings.length; index++) {
        reviewHTMLStr ='';
        reviewHTMLStr = `
        <div class="review">
            <div class="reviewName">
                ${ratings[index]['userName']}
            </div>
            <div class="reviewDate">${ratings[index]['date']}</div>
            <div class="ratingWrapper">
                <div class="ratingMeal">
                    <div>Essen</div>
                    ${createRatinghtml(ratings[index]['ratingMeal'])}
                </div>
                <div class="ratingDelivery">
                    <div>Lieferung</div>
                    ${createRatinghtml(ratings[index]['ratingMeal'])}
                </div>
            </div>
            <div>${ratings[index]['ratingText']}</div>
        </div>`;
        
        reviewListStr = reviewListStr + reviewHTMLStr;
    }
    document.getElementById('reviewListDiv').innerHTML = reviewListStr;
}

function getArticle(articleID) {
    if(articleID == 0) {
        return null; 
    }
    
    for (let index = 0; index < article.length; index++) {
        const articleEle = article[index];
        if(articleEle['id'] == articleID) {
            console.log(articleEle)
            return articleEle;
        }
    }

    return null;
}

function renderAllergeneModal(articleID) {
    document.getElementById('substanceList').classList.add("d-none");
    document.getElementById('allergensList').classList.add("d-none");

    //vorhandene Elemente ausblenden
    document.getElementById('dialogNav').classList.add('d-none');
    document.getElementById('rating').classList.add('d-none');
    document.getElementById('info').classList.add('d-none');
    document.getElementById('offer').classList.add('d-none');
    document.getElementById('ingridiensChoises').classList.add('d-none');
    
    let allergensUL = "<ul>";
    let substanceUL = "<ul>";
    let articleObj = getArticle(articleID);
    
    console.log("ID: " + articleID);
    console.log(articleObj);

    if(articleObj['substance'].length > 1) {
        document.getElementById('substanceList').classList.remove("d-none");
        for (let i = 0; i < articleObj['substance'].length; i++) {
            const substance = articleObj['substance'][i];
            substanceUL += `<li>${substance}</li>`;
        }
    }

    if(articleObj['allergene'].length > 1) {
        document.getElementById('allergensList').classList.remove("d-none");
        for (let y = 0; y < articleObj['allergene'].length; y++) {
            const allergene = articleObj['allergene'][y];
            allergensUL += `<li>${allergene}</li>`;
        }
    }

    substanceUL += "</ul>";
    allergensUL += "</ul>";

    document.getElementById('substanceListUL').innerHTML = substanceUL;
    document.getElementById('allergensListUL').innerHTML = allergensUL;

    document.getElementById('allergenAndSubstanceInfo').classList.remove("d-none");
}

function render(){
    calcRatingCnt();
    calcRatings();
    createGroupLineHTML(createSortedGroupsArr());
    createReviewListHTML();
    renderArticleGroups();
    loadBasketFromLocalStorage();
}