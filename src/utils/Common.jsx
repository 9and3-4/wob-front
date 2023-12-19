import moment from "moment";
import axios from "axios";
import "moment/locale/ko"; // 한글 로컬라이제이션
moment.locale("ko"); // 한글 설정 적용

export const KH_DOMAIN = "http://localhost:8111";
export const KH_SOCKET_URL = "ws://localhost:8111/ws/chat";

export const timeFromNow = (timestamp) => {
  return moment(timestamp).fromNow();
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Adds leading 0 if needed
  const day = ("0" + date.getDate()).slice(-2);
  const hour = ("0" + date.getHours()).slice(-2);
  const minute = ("0" + date.getMinutes()).slice(-2);
  return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
};

const Common = {
  getAccessToken: () => {
    return localStorage.getItem("accessToken");
  },
  setAccessToken: (token) => {
    localStorage.setItem("accessToken", token);
  },
  getRefreshToken: () => {
    return localStorage.getItem("refreshToken");
  },
  setRefreshToken: (token) => {
    localStorage.setItem("refreshToken", token);
  },
  setEmail: (email) => {
    localStorage.setItem("email", email);
  },
  getEmail: () => {
    return localStorage.getItem("email");
  },
  clearLocalStorage: () => {
    localStorage.clear();
  },

  // 401 에러 처리 함수
  // handleUnauthorized: async () => {
  //   const refreshToken = Common.getRefreshToken();

  //   try {
  //     const response = await axios.get(KH_DOMAIN + "/refresh", {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization-refresh": "Bearer " + refreshToken,
  //       },
  //     });
  //     console.log("Common의 refreshToken : ", refreshToken);
  //     console.log("Common의 response", response);
  //     // 여기서 서버에서 새로 발급받은 Access Token을 받아와서 저장하거나 다른 작업을 수행할 수 있습니다.
  //     const newAccessToken = response.headers.get("authorization");
  //     const newRefreshToken = response.headers.get("authorization-refresh");
  //     console.log("Common의 newAccessToken : ", newAccessToken);
  //     console.log("Common의 newRefreshToken : ", newRefreshToken);
  //     Common.setAccessToken(newAccessToken);

  //     return newAccessToken;

  //     // 이후 실패한 요청 재시도 또는 다른 작업 수행
  //     // ...
  //   } catch (error) {
  //     // Refresh Token을 통한 재인증이 실패한 경우
  //     // 에러 처리 로직
  //     console.error("Refresh Token을 통한 재인증이 실패했습니다.", error);
  //   }
  // },
};

export default Common;
