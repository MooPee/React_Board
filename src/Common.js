var version = "@VERSION", commonJs = function() {
    return new commonJs.fn.init();
};

commonJs.fn = commonJs.prototype = {
    commonJs : version,
    constructor : commonJs
};

(function() {
    function getCookie(key){
        key = new RegExp(key + '=([^;]*)'); // 쿠키들을 세미콘론으로 구분하는 정규표현식 정의
        return key.test(document.cookie) ? unescape(RegExp.$1) : ''; // 인자로 받은 키에 해당하는 키가 있으면 값을 반환
    }

    // expiredays 는 일자 정수 - 365년 1년 쿠키
    function setCookie(cookieName, cookieValue, cookieExpire, cookiePath, cookieDomain, cookieSecure) {
        const domain = window.location.host;
        let todayDate = new Date();
        todayDate.setDate(todayDate.getDate() + cookieExpire); // 현재 시각 + 일 단위로 쿠키 만료 날짜 변경
        var cookieText=escape(cookieName)+'='+escape(cookieValue.replace(/[<>()'`]/g, ''));
        cookieText+=(cookieExpire ? '; EXPIRES='+todayDate.toGMTString() : '');
        cookieText+=(cookiePath ? '; PATH='+cookiePath : '');
        cookieText+=(cookieDomain ? domain.indexOf("localhost") > -1 ? '' : '; DOMAIN='+cookieDomain : '');
        cookieText+=(cookieSecure ? '; SECURE' : '');
        document.cookie=cookieText;
    }
})();
