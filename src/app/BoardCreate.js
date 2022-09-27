import React, { useEffect, useState } from 'react';
import axios from 'axios'
import '../App.css';
import { Link, useParams } from "react-router-dom";

// Board Create Page
function BoardCreate() {
    const { id } = useParams();
    let regUserId = null;
    useEffect(() => {
        if (id !== null && id !== undefined) {
            if (getCookie('reactUser') !== '') {
                axios.get('/api/me?encodeLoginId=' + getCookie('reactUser'))
                .then((result) => {
                    fnGetBoardDetail(result.data.data.id);
                })
                .catch((result) => {
                    alert('내 정보 가져오기에 실패했습니다. 관리자에게 문의해주세요.');
                })
            }
        }
    }, []);

    function getCookie(key){
        key = new RegExp(key + '=([^;]*)');
        return key.test(document.cookie) ? unescape(RegExp.$1) : '';
    }

    function fnGetBoardDetail(loginUserId) {
        axios.post('/api/board/detail?id=' + id)
            .then((result) => {
                const board = result.data.data;
                regUserId = board.userId;
                document.getElementById('writerTd').innerHTML = board.userName;
                if (regUserId === loginUserId) {
                    document.getElementById('title').value = board.title;
                    document.getElementById('contents').value = board.contents;
                } else {
                    document.getElementById('titleTd').innerHTML = board.title;
                    document.getElementById('contentsTd').innerHTML = board.contents;
                    document.getElementById('createBtn').style.display = 'none';
                    document.getElementById('deleteBtn').style.display = 'none';
                }
            })
            .catch((result) => {
                alert('게시글 정보 호출에 실패했습니다. 관리자에게 문의해주세요.');
            });
    }

    function fnCreateBoard() {
        const encodeUserId = getCookie('reactUser');
        const title = document.getElementById('title').value;
        const contents = document.getElementById('contents').value;

        if (title === '') {
            alert('제목을 입력해주세요.');
            document.getElementById('title').focus();
            return false;
        } else if (contents.replaceAll(' ', '') === '') {
            alert('내용을 입력해주세요.');
            document.getElementById('contents').focus();
            return false;
        }

        axios.post('/api/board/create', {
            id : id != null ? id : null,
            encodeUserId : encodeUserId,
            title : title,
            contents : contents
        })
        .then((result) => {
            if (id != null && id != null) {
                alert('게시글이 수정 되었습니다.');
            } else {
                alert('게시글이 등록 되었습니다.');
            }
            window.location.replace('/board');
        })
        .catch((result) => {
            alert('게시글 등록을 실패했습니다. 관리자에게 문의해주세요.');
        });
    }

    function fnDeleteBoard() {
        axios.get('/api/board/delete?id=' + id)
        .then((result) => {
            alert('게시글이 삭제 되었습니다.')
            window.location.replace('/board');
        })
        .catch((result) => {
            alert('게시글 삭제를 실패했습니다. 관리자에게 문의해주세요.');
        });
    }

    return (
        <>
        <div className='boardDiv'>
            <h1 className='titDep1'>게시판 글쓰기</h1>
            <table className='selectSearch'>
                <tbody>
                {id != null ? <tr><th>작성자</th><td id='writerTd'></td></tr> : ''}
                <tr>
                    <th>제목</th>
                    <td id='titleTd'>
                        <input type="text" className='widthMax' id='title' placeholder='제목을 입력해주세요.'/>
                    </td>
                </tr>
                <tr>
                    <th>내용</th>
                    <td id='contentsTd'>
                        <textarea type="textarea" className='widthMax' id='contents' placeholder='내용을 입력해주세요.'/>
                    </td>
                </tr>
                </tbody>
            </table>
            <br/>
            <Link to='/board'>
                <button type='button' className='btnDefault'>목록</button>
            </Link>
            {id !== null && id !== undefined ? <button type='button' className='btnDefault rightBtn' id='deleteBtn' onClick={() => fnDeleteBoard()}>삭제</button> : ''}
            <button type='button' className='btnDefault rightBtn' id='createBtn' onClick={() => fnCreateBoard()}>{id !== null && id !== undefined ? '수정' : '등록'}</button>
        </div>
        </>
    );
}

export default BoardCreate;
