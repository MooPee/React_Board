import React, { useState } from 'react';
import '../App.css';
import axios from 'axios'
import { Link } from "react-router-dom";

// Login Page
function Login() {

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

function getCookie(key){
  key = new RegExp(key + '=([^;]*)');
  return key.test(document.cookie) ? unescape(RegExp.$1) : '';
}

(function fnMe() {
    if (getCookie('reactUser') != '') {
        axios.get('/api/me?encodeLoginId=' + getCookie('reactUser'))
        .then((result) => {
          window.location.replace('/board');
        })
    }
})();

  // login action
  function login() {
    const loginId = document.getElementById('login_id').value.replaceAll(' ', '');
    const loginPw = document.getElementById('login_pw').value;
  
    if (loginId === '') {
      alert('아이디를 입력해주세요.');
      document.getElementById('login_id').focus();
      return false;
    } else if (loginPw === '') {
      alert('비밀번호를 입력해주세요.');
      document.getElementById('login_pw').focus();
      return false;
    }
    
    axios.post('/api/login', {
        loginId : loginId,
        loginPassword : loginPw
      })
    .then((result) => {
      const user = result.data.data;
      if (user.loginYn) {
        setCookie('reactUser', user.encodeLoginId, 1);
        alert('로그인 성공');
        window.location.replace('/board');
      } else {
        alert(user.reason);
        return false;
      }
    })
    .catch((result) => {
      alert('로그인을 실패했습니다. 관리자에게 문의해주세요.');
    });
  }

  // enter key => login()
  const handleKeyPress = e => {
    if(e.key === 'Enter') {
      login();
    }
  }

  return (
    <>
      <div className='loginDiv'>
        <h1>로그인</h1><br/>
        <fieldset>
          <p>
            <label>아이디</label>
            <input type='text' className='loginTxt' id='login_id' placeholder='아이디를 입력해주세요.' onKeyPress={handleKeyPress}></input>
          </p>
          <p>
            <label>비밀번호</label>
            <input type='password' className='loginTxt' id='login_pw' placeholder='비밀번호를 입력해주세요.' onKeyPress={handleKeyPress}></input>
          </p>
          <button type='button' className='loginBtn' onClick={() => login()}>로그인</button>
          <Link to='/sign'>
            <button type='button' className='loginBtn'>회원가입</button>
          </Link>
        </fieldset>
      </div>
    </>
  );
}

export default Login;
