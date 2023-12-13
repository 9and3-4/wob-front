import React from "react";
import styled from "styled-components";
import FullLogoBth from "../../component/FullLogoBtn";
import SubHeader from "../../layout/SubHeader";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useState, useEffect } from "react";
import AdminAxiosApi from "../../api/AdminAxiosApi";
import { storage } from "../../api/firebase";

const FormContainer = styled.div`
  padding: 20px;
  margin: auto;
  max-width: 600px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const FieldContainer = styled.div`
  display: flex;
  align-items: center; // 수직 방향 중앙 정렬
  margin-bottom: 20px; // 하단 여백 추가
`;

const StyledLabel = styled.label`
  flex: 0 0 100px; // 라벨의 너비 고정
  margin-right: 10px; // 라벨과 입력 필드 사이 여백
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
`;

const StyledInput = styled.input`
  width: 90%; // 너비를 100%로 설정하여 컨테이너의 너비에 맞춤
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  margin-bottom: 20px; // 입력창 아래에 여백 추가
`;

const SubmitButton = styled.button`
  padding: 10px 15px;
  background-color: #DFEDE9;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #04BF8A;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; // 버튼을 중앙에 위치시킴
  margin-top: 20px; // 버튼 상단에 여백 추가
  gap: 10px; // 버튼 사이에 여백 추가
`;

const UserImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 5px;
  margin-top: 20px;
`;

const UploadButton = styled.button`
  background-color: #DFEDE9;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #04BF8A;
  }
`;

const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;



const Container = styled.div`
  max-width: 768px;
  min-width: 300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  .Logo {
    display: flex;
    align-items: center;

        span {
            font-size: 30px;
            font-weight: bold;
            margin: 80px;
        }
  }
  .Board {
    border: 1px solid #353535;
    border-radius: 10px;
    margin: 20px 20px;
    padding: 0 20px;
    th {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 30px 40px;
        font-size: 25px;
        color: #353535;
        font-weight: bold;
    }
    td{
        background-color: #DFEDE9;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 20px 0px;
        padding: 20px 20px;
        border-radius: 10px;
    }
}
`;

const MemberBoard = styled.div`

    .list {
        display: flex;
        flex-direction: row;
        justify-content: center;
        font-size: 20px;
        
        p {
            margin-right: 350px;
        }

        input {
            display: flex;
            text-align: center;
            border-style: none;
            border-bottom: 1px solid black;
        }
    }
    p {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
    
    .buttons {
        display: flex;
        justify-content: right;
        
        button {
        background-color: #DFEDE9;
        border: 1px solid #353535; 
        border-radius: 5px;
        margin: 0 20px 0 5px;

        &:hover {
            background-color: #04BF8A;
        }
    }
}
`;
const Wrap = styled.div`
    display: grid;
    grid-template-columns: repeat(1,2fr);
    gap:100px;
    line-height: 40px;

    h5 {
        font-size: 20px;
        padding: 20px;
    }
    ul {
        border: 1px solid #353535;
        li {
         display: flex;
         padding: 20px;
        }
        .btn {
            background-color: #DFEDE9;
            border: 1px solid #353535; 
            border-radius: 5px;

        &:hover {
            background-color: #04BF8A;
        }
    }
    }
    b {
        font-size: 20px;
        font-weight: bold;
    }
    input {
        width: 600px;
        height: 60px;
    }
`;

const SearchIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  color: #04bf8a;
  font-size: 23px;
  `;


const AllBoardContent = () => {
    // const navigate = useNavigate();

    const goToSearchPage = () => {
        navigate("searchMain");
      };

      const [title, setTitle] = useState("");
      const [content, setContent] = useState("");
      const [file, setFile] = useState(null);
      const [url, setUrl] = useState("");
      const [categories, setCategories] = useState([]); // 새 상태 추가
      
    
      useEffect(() => {
        const getCategories = async () => {
          try {
            const rsp = await AdminAxiosApi.cateList();
            console.log(rsp.data);
            setCategories(rsp.data);
          } catch (error) {
            console.log(error);
          }
        };
        getCategories();
      }, []);
    
      const email = window.localStorage.getItem("email");
      console.log("email : " + email);
      const navigate = useNavigate();
    
      const handleTitleChange = (e) => {
        setTitle(e.target.value);
      };
      const handleSubmit = async () => {
        console.log(title, url);
        try {
          const rsp = await AdminAxiosApi.boardWrite(
            title,
            url
          );
          if (rsp.data === true) {
            alert("글쓰기 성공");
            navigate("/Boards");
          } else {
            alert("글쓰기 실패");
          }
        } catch (error) {
          console.log(error);
        }
      };
      const handleReset = () => {
        setTitle("");
        setContent("");
        navigate("/Boards");
      };
    
      const handleFileInputChange = (e) => {
        setFile(e.target.files[0]);
      };
    
      const handleUploadClick = async () => {
        try {
          const storageRef = storage.ref();
          const fileRef = storageRef.child(file.name);
    
          // 파일을 업로드하고 기다립니다.
          await fileRef.put(file);
          console.log("File uploaded successfully!");
    
          // 다운로드 URL을 가져오고 기다립니다.
          const url = await fileRef.getDownloadURL();
          console.log("저장경로 확인 : " + url);
    
          // 상태를 업데이트합니다.
          setUrl(url);
        } catch (error) {
          // 에러를 처리합니다.
          console.error("Upload failed", error);
        }
      };


    return (
        <Container>
            <SubHeader />
            <div className="Logo">
                <FullLogoBth />
                <span>전체 게시판 관리</span>
            </div>
            <MemberBoard>
                <div className="list">
                    <p>전체 게시판 관리</p>
                    <input type="text" placeholder="게시글 검색" />
                    <SearchIcon icon={faSearch} onClick={goToSearchPage} />
                </div>
                <div className="Board">
                        <th>
                            <tr>번호</tr>
                            <tr>이름</tr>
                            <tr>내용</tr>
                            <tr>작성일자</tr>
                        </th>
                        <td>
                            <tr>No.1</tr>
                            <tr>홍길동</tr>
                            <tr>내용</tr>
                            <tr>2023.12.06</tr>
                        </td>
                        <td>
                            <tr>No.2</tr>
                            <tr>아무개</tr>
                            <tr>내용</tr>
                            <tr>2023.12.08</tr>
                        </td>
                        <td>
                            <tr>No.3</tr>
                            <tr>홍홍홍</tr>
                            <tr>내용</tr>
                            <tr>2023.12.10</tr>
                        </td>
                        <td>
                            <tr>No.4</tr>
                            <tr>동동동</tr>
                            <tr>내용</tr>
                            <tr>2023.12.11</tr>
                        </td>
                        <td>
                            <tr>No.5</tr>
                            <tr>길길길</tr>
                            <tr>내용</tr>
                            <tr>2023.12.12</tr>
                        </td>
                </div>
                <div className="buttons">
                    <button>등록</button>
                    <button>수정</button>
                    <button>삭제</button>
                </div>
                <p>1 | 2 | 3 | 4 </p>
           </MemberBoard>

        <Wrap>
        <FormContainer>
        <Title>게시물 등록</Title>
        <FileUploadContainer>
        <StyledInput type="file" onChange={handleFileInputChange} />
        <UploadButton onClick={handleUploadClick}>Upload</UploadButton>
      </FileUploadContainer>
      {url && <UserImage src={url} alt="uploaded" />}
      <FileUploadContainer>
        <StyledInput type="file" onChange={handleFileInputChange} />
        <UploadButton onClick={handleUploadClick}>Upload</UploadButton>
      </FileUploadContainer>
      {url && <UserImage src={url} alt="uploaded" />}
      <FieldContainer>
        <StyledLabel htmlFor="title">종목</StyledLabel>
        <StyledInput
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleTitleChange}
        />
      </FieldContainer>
      <ButtonContainer>
        <SubmitButton onClick={handleSubmit}>글쓰기</SubmitButton>
        <SubmitButton onClick={handleReset}>취소</SubmitButton>
      </ButtonContainer>
    </FormContainer>

           <div className="modify">
            <b>게시물 수정</b>
            <ul>
                <li>
                    <h5>제목</h5>
                    <input type="text" />
                </li>
                <li>
                    <h5>사진</h5>
                    <input type="text" />
                </li>
                <li>
                    <h5>내용</h5>
                    <input type="text" />
                </li>
                <button className="btn">수정</button>
            </ul>
           </div>
           <div className="delete">
           <b>게시물 삭제</b>
           <ul>
                <li>
                    <h5>제목</h5>
                    <input type="text" />
                </li>
                <li>
                    <h5>사진</h5>
                    <input type="text" />
                </li>
                <li>
                    <h5>내용</h5>
                    <input type="text" />
                </li>
                <button className="btn">삭제</button>
            </ul>
           </div>
           </Wrap>
        </Container>
    )
};

export default AllBoardContent;