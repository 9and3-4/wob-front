import axios from "axios";
import Common, { KH_DOMAIN } from "../utils/Common";

// http://localhost:3000/oauth2/authorization/google

const LoginPageAxiosApi = {
  // 회원가입
  userSignUp: async (props) => {
    const params = {
      email: props.email,
      password: props.password,
      nickname: props.nickname,
    };
    // console.log(params);
    return await axios.post(KH_DOMAIN + "/sign-up", params);
  },

  userLogin: async (props) => {
    const params = {
      email: props.email,
      password: props.password,
    };
    // console.log(params);
    return await axios.post(KH_DOMAIN + "/login", params);
  },

  googleLogin: async () => {
    return await axios.get(KH_DOMAIN + "/oauth2/authorization/google", {
      withCredentials: true,
    });
  },

  naverLogin: async () => {
    return await axios.get(KH_DOMAIN + "/oauth2/authorization/naver", {
      withCredentials: true,
    });
  },

  kakaoLogin: async () => {
    return await axios.get(KH_DOMAIN + "/oauth2/authorization/kakao", {
      withCredentials: true,
    });
  },

  loginTest: async () => {
    const accessToken = Common.getAccessToken();
    return await axios.get(KH_DOMAIN + "/jwt-test", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },
};
export default LoginPageAxiosApi;