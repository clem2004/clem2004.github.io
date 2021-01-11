let str = get('https://clem2004.github.io/files/cells.json')
let cells = JSON.parse(str).cells
loadTableView();

function HTMLCell(title, subtitle, image, i) {
    if (isEmoji(image) != true) {
        return '<cell id = ' + i + '><img src="https://clem2004.github.io/site/images/' + image + '.png" height="80"/><description><cell-title>' + title + '</cell-title><cell-subtitle>' + subtitle + '</cell-subtitle></description></cell>'
    } else {
        return '<cell id = ' + i + '><emoji>' + image + '</emoji><description><cell-title>' + title + '</cell-title><cell-subtitle>' + subtitle + '</cell-subtitle></description></cell>'
    }
}

function addClickEvent(i) {
    var element = document.getElementById(i); //grab the element
    element.onclick = function() { //asign a function
        window.open(cells[i].link);
    }
}

function addNewPageEvent(i) {
    var element = document.getElementById(i); //grab the element
    element.onclick = function() { //asign a function
        str = get(cells[i].link)
        cells = JSON.parse(str).cells
        loadTableView();
    }
}

function loadTableView() {
    document.body.innerHTML = ""
    for (let i = 0; i < cells.length; i++) {
        document.body.insertAdjacentHTML("beforeend", HTMLCell(cells[i].title, cells[i].subtitle, cells[i].image, i));
        if (cells[i].newPage) {
            addNewPageEvent(i);
        } else {
            addClickEvent(i);
        }
    }
}

function get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}

function isEmoji(str) {
    var ranges = ['(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])'];
    if (str.match(ranges.join('|'))) {
        return true;
    } else {
        return false;
    }
}