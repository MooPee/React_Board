import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios'
import { Link } from "react-router-dom";
import Pagination from "../Pagination";

// Board Page
function Board() {
    const [boards, setBoards] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    const [search, setSearch] = useState(1);
    
    useEffect(() => {
        axios.post('/api/board/list', {
            userName : document.getElementById('userName') != null ? document.getElementById('userName').value : null,
            title : document.getElementById('title') != null ? document.getElementById('title').value : null,
            contents : document.getElementById('contents') != null ? document.getElementById('contents').value : null
            })
        .then((result) => {
            setBoards(result.data.data);
        })
        .catch((result) => {
            alert('게시물 리스트 호출에 실패했습니다. 관리자에게 문의해주세요.');
        });
    }, [search]);

  return (
    <>
      <div className='boardDiv'>
        <h1>게시판</h1>
        <table className="selectSearch">
        <tbody>
        <tr>
            <th>작성자</th>
            <td>
                <input type="text" className='widthMax' id="userName" placeholder="작성자를 입력하세요."/>
            </td>
        </tr>
        <tr>
            <th>제목</th>
            <td>
                <input type="text" className='widthMax' id="title" placeholder="제목을 입력하세요."/>
            </td>
        </tr>
        <tr>
            <th>내용</th>
            <td>
                <input type="text" className='widthMax' id="contents" placeholder="내용을 입력하세요."/>
            </td>
        </tr>
        </tbody>
        </table>
        <br/><button type='button' className='btnDefault rightBtn' onClick={() => setSearch(search + 1)}>검색</button>
        <br/><br/>
        <table className='selectSearch'>
            <thead>
            <tr>
                <th>NO</th>
                <th>작성자</th>
                <th>제목</th>
            </tr>
            </thead>
            <tbody id='tbody'>
                {boards.slice(offset, offset + limit).map(({ num, id, userName, title }) => (
                    <tr key={id}>
                        <td>{num}</td>
                        <td>{userName}</td>
                        <td><Link to={'/board/' + id}>{title}</Link></td>
                    </tr>
                ))}
            </tbody>
        </table><br/>
        <footer>
        <Pagination
          total={boards.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </footer>
        <Link to="/board/create">
            <button type='button' className='btnDefault rightBtn'>등록</button>
        </Link>
      </div>
    </>
  );
}

export default Board;
