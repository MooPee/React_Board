import React, { useState } from 'react';
import '../App.css';
import axios from 'axios'
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

// Board Detail Page
function BoardDetail() {
    const { id } = useParams();
    (function () {
        console.log(id);
        fnGetBoardDetail();
    })()

    function fnGetBoardDetail() {
        console.log('fnGetBoard Start');
        axios.post('/api/board/detail?id=' + id)
            .then((result) => {
            const board = result.data.data;
            console.log(board);
            })
            .catch((result) => {
            alert('회원가입을 실패했습니다. 관리자에게 문의해주세요.');
            });
    }


    return (
        <>
        <div className='boardDiv'>
            <h1>게시판</h1>
            <button type='button' className='btnDefault'>등록</button>
        </div>
        </>
    );
}

export default BoardDetail;
