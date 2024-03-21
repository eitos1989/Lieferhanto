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
    document.getElementById('orderSucess').classList.add('d-none');
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

function openTab(event, activTab) {
    event.stopPropagation(event);
    document.getElementById('allergenAndSubstanceInfo').classList.add('d-none');
    document.getElementById('dialogNav').classList.remove('d-none');
    document.getElementById('ingridiensChoises').classList.add('d-none');
    document.getElementById('orderSucess').classList.add('d-none');
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

