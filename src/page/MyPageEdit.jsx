import { useState, useEffect } from "react";
import styled from "styled-components";
import { Outlet, useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserStore";
import AxiosApi from "../api/MypageAxiosApi";
import Modal from "../utils/Modal";
import { storage } from "../api/firebase";
import { formatDate } from "../utils/Common";
import { useNavigate } from "react-router-dom";
import Footer from "../layout/Footer";

const Container = styled.div`
  padding: 24px;
  border-radius: 8px;
  width: 768px;
  margin: 20px auto;
`;

const LogoImage = styled.img`
  cursor: pointer;
  width: 100px;
  margin: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const UserNickName = styled.h2`
  margin-left: 20px;
`;

const UserImage = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 20px;
`;
const FieldEditTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IMGField = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;
const EditNick = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Input = styled.input`
  width: 80%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;
const Label = styled.label`
  display: block;
  margin: 20px 10px;
  font-weight: bold;
`;
const SubmitButton = styled.button`
  padding: 8px;
  background-color: #04bf8a;
  width: 60px;
  margin-left: 6px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #008660;
  }
`;
const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 auto;
`;
const EditLogo = styled.img`
  width: 20px;
  justify-content: left;
  align-items: end;
`;
const EditLogoCon = styled.div`
  display: flex;
  justify-content: right;
`;
const EditBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
`;

const MyPageEdit = () => {
  const { email } = useParams();
  const [modalContent, setModalContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };
  const [member, setMember] = useState("");
  // const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [editNickName, setEditNickName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  const context = useContext(UserContext);
  const setNickName = context ? context.setNickName : null;

  useEffect(() => {
    const memberInfo = async () => {
      const rsp = await AxiosApi.memberGetOne(email);
      if (rsp.status === 200) {
        setMember(rsp.date);
        setUrl(rsp.data.image);
      }
    };
    memberInfo();

    //로컬 스토리지에서 로그인한 사용자 정보를 가져옵니다.
    // const loginUserEmail = localStorage.getItem("email");
    //로그인한 사용자와 글쓴이가 같은지 비교
    // if (loginUserEmail === email) {
    //   setIsCurrentUser(true);
    // }
  }, [email]);

  const logoImage =
    "https://firebasestorage.googleapis.com/v0/b/mini-project-1f72d.appspot.com/o/logosmall.png?alt=media&token=5f1756d7-08ab-4930-a834-1c2d82e2c34d";

  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  //입력 필드 변경 처리
  const handleChange = (e) => {
    if (e.target.nickName === "NickName") {
      setFile(e.target.files[0]);
    } else {
      setEditNickName(e.target.value);
    }
  };

  //회원정보 업데이트 Axios호출
  const handleSubmit = async (e) => {
    e.preventDefault();
    const rsp = await AxiosApi.memberUpdate(email, editNickName, url);
    if (rsp.status === 200) {
      setEditMode(false);
      setNickName(editNickName);
      console.log("setNickName : ", setNickName);
      const rsp = await AxiosApi.memberGetOne(email);
      if (rsp.status === 200) {
        setMember(rsp.data);
        setUrl(rsp.data.image);
      }
    }
  };

  //handle clike
  const handleUploadChange = async () => {
    if (!file) {
      setModalOpen(true);
      setModalContent("사진을 선택해 주세요.");
      return;
    }
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file); //파일 업로드 후 기다리기
      console.log("파일 업로드 성공!!");

      // 업로드 후 이미지 URL 가져오기
      const uploadedUrl = await fileRef.getDownloadURL();
      console.log("저장경로 확인 : ", uploadedUrl);
      setUrl(uploadedUrl); //미리보기 URL업데이트 (상태 업데이트)
    } catch (error) {
      console.error("Upload failed 파일 업로드 에러 :", error);
    }
  };
  return (
    <Container>
      <HeaderBox>
        <LogoImage src={logoImage} alt="logo" onClick={goToHome} />
        <EditLogoCon>
          {!editMode && (
            <EditLogo
              onClick={() => setEditMode(true)}
              src={
                url ||
                "https://firebasestorage.googleapis.com/v0/b/kh-mini-prj.appspot.com/o/edit.png?alt=media&token=b6729420-f6dd-4dcf-be5d-e21ec76e66da"
              }
              alt="edit"
            />
          )}
        </EditLogoCon>
      </HeaderBox>
      <FieldEditTitle>
        <Label>프로필 사진</Label>
      </FieldEditTitle>
      <UserInfo>
        {/* 사용자 프로필 사진 부분 */}
        <UserImage src={url || "http://via.placeholder.com/160"} alt="User" />
      </UserInfo>
      {!editMode ? (
        <>
          {/* <Field>
            <Label>Email : {member.email}</Label>
          </Field>
          <Field>
            <Label>가입일 : {formatDate(member.regDate)}</Label>
          </Field> */}
          {/* 현재 사용자가 로그인한 사용자인 경우에만 편집 버튼 표시 */}
          {/* {isCurrentUser && (
            <SubmitButton onClick={() => setEditMode(true)}>편집</SubmitButton>
          )} */}
        </>
      ) : (
        <>
          <IMGField>
            <input type="file" name="file" onChange={handleUploadChange} />
            {/* <SendSubmitButton>전송</SendSubmitButton> */}
          </IMGField>
        </>
      )}
      <FieldEditTitle>
        <Label>닉네임</Label>
      </FieldEditTitle>
      <EditNick>
        {!editMode ? (
          <UserNickName>{member.NickName}</UserNickName>
        ) : (
          <Input
            type="text"
            name="NickName"
            placeholder="닉네임을 입력하세요."
            value={editNickName}
            onChange={handleChange}
          />
        )}
      </EditNick>
      <FieldEditTitle>
        <Label>희망 지역</Label>
      </FieldEditTitle>
      <FieldEditTitle>
        <Label>관심 레져</Label>
      </FieldEditTitle>
      <FieldEditTitle>
        <Label>MBTI</Label>
      </FieldEditTitle>
      {!editMode ? (
        <>
          {/* <Field>
            <Label>Email : {member.email}</Label>
          </Field>
          <Field>
            <Label>가입일 : {formatDate(member.regDate)}</Label>
          </Field> */}
          {/* 현재 사용자가 로그인한 사용자인 경우에만 편집 버튼 표시 */}
          {/* {isCurrentUser && (
            <SubmitButton onClick={() => setEditMode(true)}>편집</SubmitButton>
          )} */}
        </>
      ) : (
        <EditBtn>
          <SubmitButton onClick={handleSubmit}>수정</SubmitButton>
          <SubmitButton onClick={() => setEditMode(false)}>취소</SubmitButton>
        </EditBtn>
      )}
      <Footer />
    </Container>
  );
};

export default MyPageEdit;