function renderSelectVariantHTML(choisesArr, name) {
    const selectOptionsHTML = generateSelectOptionsHTML(choisesArr);
    const selectionDivHTML = generateSelectionDivHTML(name);

    return `
        <div class="ingridiensListChoise">
            <div class="ingridiensListHeadline">${name}</div>
            <div class="ingridiensChoises">
                <select name="${name}" id="${name}Select" class="choiseSelect" onchange="showSelection('${name}Selection', '${name}Select')">
                    <option value="0">--Bitte wählen Sie ${name}--</option>
                    ${selectOptionsHTML}
                </select>
                ${selectionDivHTML}
            </div>
        </div>
    `;
}

function generateSelectOptionsHTML(choisesArr) {
    let optionsHTML = "";

    for (const element of choisesArr) {
        optionsHTML += `<option value="${element['price']}">${element['choise']} ( + ${element['price']} € )</option>`;
    }

    return optionsHTML;
}

function generateSelectionDivHTML(name) {
    return `
        <div id="${name}Selection" class="d-none selection">
            <div class="disFlex">
                <div id="${name}SelectionName" class="selectionName">Name</div>
                <div class="smallIcon" onclick="openDialog(event, 'allergens', 1)">
                    <img src="./img/icons/info-24.png">
                </div>
            </div>
        </div>
    `;
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

function renderAllergeneModal(articleID) {
    hideElements();

    let articleObj = getArticle(articleID);
    console.log("ID: " + articleID);
    console.log(articleObj);

    let substanceUL = generateListHTML(articleObj['substance']);
    let allergensUL = generateListHTML(articleObj['allergene']);

    document.getElementById('substanceListUL').innerHTML = substanceUL;
    document.getElementById('allergensListUL').innerHTML = allergensUL;

    document.getElementById('allergenAndSubstanceInfo').classList.remove("d-none");
}

function hideElements() {
    let elementsToHide = ['dialogNav', 'rating', 'info', 'offer', 'ingridiensChoises', 'substanceList', 'allergensList'];
    for (let elementId of elementsToHide) {
        document.getElementById(elementId).classList.add('d-none');
    }
}

function generateListHTML(items) {
    let listHTML = "<ul>";
    if (items.length > 1) {
        for (let item of items) {
            listHTML += `<li>${item}</li>`;
        }
    }
    listHTML += "</ul>";
    return listHTML;
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

function render(){
    calcRatingCnt();
    calcRatings();
    createGroupLineHTML(createSortedGroupsArr());
    createReviewListHTML();
    renderArticleGroups();
    loadBasketFromLocalStorage();
}

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