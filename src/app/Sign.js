import React, { useState } from 'react';
import '../App.css';
import '../Common.js';
import axios from 'axios';
import { Link } from "react-router-dom";

// Sign Page
function Sign() {
  // Sign action
  function sign() {
    let loginId = document.getElementById('login_id').value.replaceAll(' ', '');
    let loginPw = document.getElementById('login_pw').value;
    let loginPwChk = document.getElementById('login_pw_chk').value;
    let name = document.getElementById('name').value;
  
    if (loginId === '') {
      alert('아이디를 입력해주세요.');
      document.getElementById('login_id').focus();
      return false;
    } else if (loginPw === '') {
      alert('비밀번호를 입력해주세요.');
      document.getElementById('login_pw').focus();
      return false;
    } else if (loginPwChk === '') {
      alert('비밀번호를 입력해주세요.');
      document.getElementById('login_pw_chk').focus();
      return false;
    } else if (name === '') {
      alert('이름을 입력해주세요.');
      document.getElementById('name').focus();
      return false;
    } else if (!passwordVaild) {
      alert('비밀번호가 일치하지 않습니다.');
      document.getElementById('login_pw').focus();
      return false;
    } else if (!idVaild) {
      alert('아이디 중복 확인이 필요합니다..');
      document.getElementById('login_id').focus();
      return false;
    }
    axios.post('/api/user/create', {
      loginId : loginId,
      loginPassword : loginPw,
      name : name
        })
      .then((result) => {
        const user = result.data.data;
        alert(user.name + '님 회원가입 되었습니다.');
        window.location.replace('/login');
      })
      .catch((result) => {
        alert('회원가입을 실패했습니다. 관리자에게 문의해주세요.');
      });
  }

  let idVaild = false;
  const idChk = e => {
    idVaild = false;
  }

  function fnIdChk() {
    let loginId = document.getElementById('login_id').value.replaceAll(' ', '');
    axios.get('/api/user/id/chk?loginId=' + loginId)
      .then((result) => {
        const idChk = result.data.data;
        if (idChk) {
          alert('사용 가능한 아이디입니다.');
          idVaild = true;
        } else {
          alert('이미 사용 중인 아이디입니다.');
          idVaild = false;
        }
      })
      .catch((result) => {
        alert('아이디 중복 확인을 실패했습니다. 관리자에게 문의해주세요.');
      });
  }
  
  let passwordVaild = false;
  const passwordChk = e => {
    const errorPw = document.getElementById('errorPwChk');
    if (document.getElementById('login_pw').value === document.getElementById('login_pw_chk').value) {
      errorPw.style.display = "none";
      passwordVaild = true;
    } else {
      errorPw.style.display = "block";
      passwordVaild = false;
    }
  }

  return (
    <>
      <div className='loginDiv'>
        <h1>회원가입</h1>
        <fieldset>
          <p>
            <label>아이디</label>
            <input type='text' className='loginTxt' id='login_id' style={{width: 450}} onChange={idChk} placeholder='아이디를 입력해주세요.'/>
            <button type='button' className='loginBtn' style={{width: 100, lineHeight: 3, fontSize: 16}} onClick={() => fnIdChk()}>중복확인</button>
          </p>
          <p>
            <label>비밀번호</label>
            <input type='password' className='loginTxt' id='login_pw' onChange={passwordChk} placeholder='비밀번호를 입력해주세요.'/>
          </p>
          <p>
            <label>비밀번호 확인</label>
            <input type='password' className='loginTxt' id='login_pw_chk' onChange={passwordChk} placeholder='비밀번호를 입력해주세요.'/>
            <b className='errorTxt' id='errorPwChk'>비밀번호가 일치하지 않습니다.</b>
          </p>
          <p>
            <label>이름</label>
            <input type='text' className='loginTxt' id='name' placeholder='이름을 입력해주세요.'></input>
          </p>
          <br/>
          <button type='button' className='loginBtn' onClick={() => sign()}>회원가입</button>
          <Link to='/login'>
            <button type='button' className='loginBtn'>취소</button>
          </Link>
        </fieldset>
      </div>
    </>
  );

}

export default Sign;
