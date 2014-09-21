sub = "aww";

function init() {
    var request = new XMLHttpRequest();
    document.getElementById("viewer").src = "http://jimpunk.net/Loading/wp-content/uploads/loading1.gif";
    document.getElementById("sub").innerHTML = sub;
    request.onload = getSessionData;

    stream = 'https://api.reddit.com/r/' + sub + '?limit=600';
    request.open('get', stream, true);
    request.send();
    i = 3;
}

function getSessionData() {
    responseObj = JSON.parse(this.responseText);
    loadViewer();
}

function changeSub(nSub) {
    sub = nSub;
    init();
}

function search() {
    input = document.getElementById("searchbar").value;
    changeSub(input);
}

function loadViewer() {
    title = responseObj.data.children[i].data.title;
    url = responseObj.data.children[i].data.url;

    url = url.replace("http://imgur.com", "http://i.imgur.com");

    re = "jpg";
    pe = "gif";
    n = url.indexOf(re);
    if (n != -1) {} else {
        url = url + ".jpg";
    }

    document.getElementById("viewer").src = url;
    document.getElementById("tagline").innerHTML = title;
}

function drop() {

    inner = document.getElementById("droper").innerHTML;

    if (inner == "Drop") {
        document.getElementById("nav").style.display = "block";
        document.getElementById("droper").innerHTML = "Lift";
        document.getElementById("viewer").style.height = "70%";
    } else {
        document.getElementById("nav").style.display = "none";
        document.getElementById("droper").innerHTML = "Drop";
        document.getElementById("viewer").style.height = "80%";
    }
}

function next() {
    i = i + 1;
    document.getElementById("viewer").src = "http://jimpunk.net/Loading/wp-content/uploads/loading1.gif";
    loadViewer();
}

function previous() {
    i = i - 1;
    loadViewer();
}

init();