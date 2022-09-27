import axios from 'axios';
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// set cookie
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

let name = null;
(function fnMe() {
    if (getCookie('reactUser') != '') {
        axios.get('/api/me?encodeLoginId=' + getCookie('reactUser'))
        .then((result) => {
            document.getElementById('headerloginname').innerHTML = result.data.data.name + ' 님';
        })
        .catch((result) => {
            alert('내 정보 가져오기에 실패했습니다. 관리자에게 문의해주세요.');
        })
    }
})();

function getCookie(key){
    key = new RegExp(key + '=([^;]*)');
    return key.test(document.cookie) ? unescape(RegExp.$1) : '';
}

function delCookie() {
    setCookie('reactUser', "", -1);
    window.location.replace('/login');
}

function fnLogout() {
    delCookie();
}

function Header() {
    return (
    <header>
        <div>
            <article>
                <p className='name'>
                    <b id='headerloginname'>로그인이 필요합니다.</b>
                </p>
                {getCookie('reactUser') != null && getCookie('reactUser') != '' ? 
                <button type='button' className='btnDefault' onClick={() => fnLogout()}>로그아웃</button> : 
                <><Link to='/sign'><button className='btnDefault'>회원가입</button></Link>
                <Link to='/login'><button className='btnDefault'>로그인</button></Link></>}
            </article>
        </div>
    </header>
    );
};

export default Header;