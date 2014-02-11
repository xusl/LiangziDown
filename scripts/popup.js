function getTimeStr() {
    var date = new Date();
    return [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDay(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
    ].join('-');
}

function genUrlFromCookie(cookie, count) {
    return 'http://api.linezing.com/?' + count + '&_s=' + cookie.lzsession;
}

function downloadStat(user, session) {
    var fileName = encodeURIComponent(user) + '-' + getTimeStr() + '.csv';
    var url = "https://lzd.ap01.aws.af.cm?file=" + fileName + '&token=' + session;
    window.open(url);
}

document.addEventListener('DOMContentLoaded', function () {
    var cookie = chrome.extension.getBackgroundPage().cookieData;
    var unloginDiv = document.querySelector('#unlogin'),
        loginedDiv = document.querySelector('#logined'),
        userSpan = document.querySelector('#user'),
        tipSpan = document.querySelector('#tip'),
        downloadBtn = document.querySelector('#download');
    if (cookie.lzsession && cookie.lznick) {
        unloginDiv.style.display = 'none';
        loginedDiv.style.display = 'block';
        userSpan.textContent = decodeURI(cookie.lznick);
        if (cookie.lzcat === '3') {
            tipSpan.style.display = 'block';
            downloadBtn.style.display = 'none';
        } else {
            tipSpan.style.display = 'none';
            downloadBtn.style.display = 'inline';
            downloadBtn.addEventListener('click', function(){
                downloadStat(userSpan.textContent, cookie.lzsession);
            });
        }
    } else {
        unloginDiv.style.display = 'block';
        loginedDiv.style.display = 'none';
    }
});

