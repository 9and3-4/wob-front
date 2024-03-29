import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import MyPageAxiosApi from "../api/MyPageAxiosApi";

const Container = styled.div`
  display: flex;
  color: --var(MINT);
  align-items: center;
  width: 100%;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 768px;
  min-width: 300px;
  margin: 0 auto;
  padding-right: 10px;
`;

const LogoImage = styled.img`
  cursor: pointer;
  width: 100px;
  margin: 10px;
`;

const RightBox = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  color: #04bf8a;
  font-size: 30px;
`;

const GreetingText = styled.span`
  margin-right: 10px;
  padding-top: 13px;
  font-size: 20px;
  font-weight: bold;
  color: #555555;
`;

const SearchBar = styled.input`
  display: ${(props) => (props.visible ? "inline-block" : "none")};
  position: absolute;
  top: 7%;
  width: 200px;
  height: 30px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px;
`;

const Header = () => {
  const [user, setUser] = useState(null);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // 엔터 키가 눌렸을 때 검색 실행
      navigate("/searchMain", { state: { searchQuery } });
    }
  };

  const logoImage =
    "https://firebasestorage.googleapis.com/v0/b/mini-project-1f72d.appspot.com/o/logosmall.png?alt=media&token=5f1756d7-08ab-4930-a834-1c2d82e2c34d";

  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/main");
  };

  const goToSearchPage = () => {
    setSearchVisible(!isSearchVisible);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const email = localStorage.getItem("email");
      if (email) {
        const rsp = await MyPageAxiosApi.userGetOne(email);
        if (rsp.status === 200) {
          setUser(rsp.data);
          console.log("user 정보 잘 왔나 : ", rsp.data);
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <Container>
        <HeaderBox>
          <LogoImage src={logoImage} alt="logo" onClick={goToHome} />
          <RightBox>
            {user ? (
              <GreetingText>안녕, 내친구 {user.nickname}</GreetingText>
            ) : (
              <GreetingText>로그인 해주세요</GreetingText>
            )}
            <SearchIcon icon={faSearch} onClick={goToSearchPage} />
            <SearchBar
              visible={isSearchVisible}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search..."
            />
          </RightBox>
        </HeaderBox>
      </Container>
    </>
  );
};

export default Header;
