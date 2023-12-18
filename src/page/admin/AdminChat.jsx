// 1:1 문의하기(1:1 관리자 채팅 문의)
import React from "react";
import styled from "styled-components";
import Layout from "../../component/admin/Layout";
import FullLogoBth from "../../component/admin/FullLogoBtn";
import SubHeader from "../../layout/SubHeader";

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
            margin: 100px;
        }
    }
`;

const AdminChat = () => {
    return (
        <Container>
         <SubHeader />
            <div className="Logo">
                <FullLogoBth />
                <span>1:1 관리자 채팅 문의</span>
            </div>

        <Layout />
        </Container>
    )
};

export default AdminChat;