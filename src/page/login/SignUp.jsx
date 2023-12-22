import styled from "styled-components";
import {
  InputBar,
  AuthInputBar,
  GreenButton,
} from "../../component/login/LoginCommon";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { KH_DOMAIN } from "../../utils/Common";
import { useState } from "react";
import LoginPageAxiosApi from "../../api/LoginPageAxiosApi";
import Modal from "../../utils/Modal";
import Common from "../../utils/Common";

const Container = styled.div`
  max-width: 768px;
  min-width: 300px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginBox = styled.div`
  background-color: #dfede9;
  width: 320px;
  padding: 20px;
  border-radius: 30px;
  text-align: center;
`;

const RowAlignBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const AlignBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const Logo = styled.img`
  width: 200px;
  &:hover {
    cursor: pointer;
    background-color: #dfede9;
    border-radius: 25%;
  }
`;
const OauthLogo = styled.img`
  width: 40px;
  margin: 10px 20px;
  background-color: white;
  padding: 5px;
  border-radius: 50%;
`;

const BlackButton = styled(GreenButton)`
  background-color: #353535;
  &:hover {
    cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  }
`;

const SmallGreenButton = styled.button`
  background-color: #04bf8a;
  color: #fff;
  margin: 10px;
  border: none;
  border-radius: 30px;
  padding: 10px;
  width: 70px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const SignUp = () => {
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [modalOpen, setModalOpen] = useState(false); // 모달 오픈
  const [modalText, setModelText] = useState("정말 로그아웃 하시겠습니까?"); // 모달에 넣을 내용
  const [emailVerified, setEmailVerified] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const selectedAgreement = state ?? false; // ConditionModal에서 undefined와 null값을 받았을경우 default값으로 false로 설정
  console.log("Signup selectedAgreement", selectedAgreement);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordCheckChange = (e) => {
    setPasswordCheck(e.target.value);
  };

  const handleNickNameChange = (e) => {
    setNickName(e.target.value);
  };

  const handleCheckNickName = async () => {
    try {
      const result = await LoginPageAxiosApi.userNickNameCheck({
        nickname: nickName,
      });
      console.log("결과는? ", result.data);
      const message = result.data
        ? "사용 불가능한 닉네임입니다."
        : "사용 가능한 닉네임입니다.";
      setModelText(message);
      setModalOpen(true);
    } catch (error) {
      console.error("Error during nickname check:", error);
    }
  };

  const handleCheckEmail = async () => {
    try {
      const result = await LoginPageAxiosApi.mailConfirm({
        email: email,
      });
      console.log(result.status);
      if (result.status === 200) {
        setEmailVerified(true);
      }
    } catch (error) {
      console.error("Error during nickname check:", error);
    }
  };

  const handleCheckCode = async () => {
    try {
      const result = await LoginPageAxiosApi.mailVerify({
        email: email,
        code: code,
      });
      console.log(result.status);
      if (result.status === 200) {
        setCodeVerified(true);
      }
    } catch (error) {
      console.error("Error during nickname check:", error);
    }
  };

  const handleSignUpClick = () => {
    if (emailVerified && codeVerified && password === passwordCheck) {
      // 이메일과 코드가 확인되었을 때 처리할 로직
      console.log("이메일과 인증번호가 유효합니다. 회원가입을 시작합니다.");
      handleSignUp();
    } else if (emailVerified && codeVerified && password !== passwordCheck) {
      console.log("비밀번호와 비밀번호 확인이 불일치합니다.");
    } else {
      console.log("이메일과 인증번호가 유효하지않습니다. 회원가입 실패");
    }
  };

  const handleSignUp = async () => {
    const response = await LoginPageAxiosApi.userSignUp({
      email: email,
      password: password,
      nickname: nickName,
      selectedAgreement: selectedAgreement,
    });
    if (response.status === 200) {
      console.log("sign-up 리턴 값: ", response);
      handleLogin();
    }
  };

  const handleLogin = async () => {
    const response = await LoginPageAxiosApi.userLogin({
      email: email,
      password: password,
    });
    if (response.status === 200) {
      const accessToken = response.headers.get("authorization");
      const refreshToken = response.headers.get("authorization-refresh");
      console.log("accessToken return = ", accessToken);
      console.log("refreshToken return = ", refreshToken);
      Common.setEmail(email);
      Common.setAccessToken(accessToken);
      Common.setRefreshToken(refreshToken);
      console.log("login email : ", Common.getEmail());
      navigate("/interestenter");
    }
  };

  // Modal 닫기 눌렀을 때, ModalOpen(false)
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Container>
      <AlignBox>
        <Logo
          src="/wob-logo-green.png"
          alt="main logo"
          onClick={() => navigate("/")}
        />
        <LoginBox>
          <AlignBox>
            <RowAlignBox>
              <AuthInputBar
                placeholder="Email Address"
                value={email}
                onChange={handleEmailChange}
              />
              <SmallGreenButton onClick={handleCheckEmail}>
                인증코드
              </SmallGreenButton>
            </RowAlignBox>
            <RowAlignBox>
              <AuthInputBar
                placeholder="인증 코드"
                value={code}
                onChange={handleCodeChange}
              />
              <SmallGreenButton onClick={handleCheckCode}>
                인증확인
              </SmallGreenButton>
            </RowAlignBox>
            <RowAlignBox>
              <AuthInputBar
                placeholder="Nick Name"
                value={nickName}
                onChange={handleNickNameChange}
              />
              <SmallGreenButton onClick={handleCheckNickName}>
                중복확인
              </SmallGreenButton>
            </RowAlignBox>
            <InputBar
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <InputBar
              type="password"
              placeholder="Password Check"
              value={passwordCheck}
              onChange={handlePasswordCheckChange}
            />
          </AlignBox>
          <BlackButton
            disabled={
              !email || !code || !nickName || !password || !passwordCheck
            }
            onClick={handleSignUpClick}
          >
            동의하고 시작하기
          </BlackButton>
          <Link to={`${KH_DOMAIN}/oauth2/authorization/google`}>
            <OauthLogo src="/google-log.png" />
          </Link>
          <Link to={`${KH_DOMAIN}/oauth2/authorization/naver`}>
            <OauthLogo src="/naver-log.png" />
          </Link>
          <Link to={`${KH_DOMAIN}/oauth2/authorization/kakao`}>
            <OauthLogo src="/kakao-log.png" />
          </Link>
        </LoginBox>
      </AlignBox>
      <Modal open={modalOpen} close={closeModal} header="알림">
        {modalText}
      </Modal>
    </Container>
  );
};

export default SignUp;
