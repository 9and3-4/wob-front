// 관리자 페이지 axiosApi
// import axios from "axios";
import customAxios from "./Interceptors";

import { KH_DOMAIN } from "../utils/Common";
import Common from "../utils/Common";

const AdminAxiosApi = {
<<<<<<< HEAD
=======
  // 지도 장소 조회
  // mapPlace: async () => {
  //   const accessToken = Common.getAccessToken();
  //   return await axios.get(KH_DOMAIN + `/post/places`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + accessToken,
  //     },
  //   });
  // },

  // 지도 키워드 검색
  mapSearch: async (name) => {
    console.log("키워드 : " + name);
    const accessToken = Common.getAccessToken();

    return await axios.get(KH_DOMAIN + `/post/search?keyword=${name}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

>>>>>>> 504fc9a (test commit)
  //회원 조회
  // memberGet: async (id) => {
  //   return await axios.get(KH_DOMAIN + `/users/member?id=${id}`);
  // },

  //회원 전체 조회
  userGet: async () => {
    return await customAxios.get(KH_DOMAIN + `/users/list`);
  },
  // userGet: async () => {
  //   const accessToken = localStorage.getItem("accessToken");
  //   return await axios.get(KH_DOMAIN + `/users/list`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + accessToken,
  //     },
  //   });
  // },

  // 회원 페이지네이션 조회
  userPageList: async (page, size) => {
<<<<<<< HEAD
    return await customAxios.get(
      KH_DOMAIN + `/users/list/page?page=${page}&size=${size}`
    );
  },
  // userPageList: async (page, size) => {
  //   const accessToken = Common.getAccessToken();
  //   return await axios.get(
  //     KH_DOMAIN + `/users/list/page?page=${page}&size=${size}`,
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + accessToken,
  //       },
  //     }
  //   );
  // },

  // 회원 페이지 수 조회
  userPageCount: async (page, size) => {
    return await customAxios.get(KH_DOMAIN + `/users/count`);
  },
  // userPageCount: async (page, size) => {
  //   const accessToken = Common.getAccessToken();
  //   return await axios.get(KH_DOMAIN + `/users/count`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + accessToken,
  //     },
  //   });
  // },

  // 회원 활성화 바활성화 처리(get)-userController
  userInfoGet: async () => {
    return await customAxios.get(KH_DOMAIN + `/users/allList`);
  },
  // userInfoGet: async () => {
  //   const accessToken = Common.getAccessToken();
  //   return await axios.get(KH_DOMAIN + `/users/allList`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + accessToken,
  //     },
  //   });
  // },

  // 회원 활성화 비활성화(post)-AdminActiveController
  userListState: async (id, state) => {
=======
    const accessToken = Common.getAccessToken();
    return await axios.get(
      KH_DOMAIN + `/users/list/page?page=${page}&size=${size}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  },

  // 회원 페이지 수 조회
  userPageCount: async (page, size) => {
    const accessToken = Common.getAccessToken();
    return await axios.get(KH_DOMAIN + `/users/count`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  // 회원 활성화 바활성화 처리(get)-userController
  userInfoGet: async () => {
    const accessToken = Common.getAccessToken();
    return await axios.get(KH_DOMAIN + `/users/allList`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  // 회원 활성화 비활성화(post)-AdminActiveController
  userListState: async (id, state) => {
    const accessToken = Common.getAccessToken();
>>>>>>> 504fc9a (test commit)
    console.log("활성화 비활성화, id : ", id, state);
    const data = {
      id: id,
      active: state,
    };
<<<<<<< HEAD
    return await customAxios.put(KH_DOMAIN + `/users/state`, data);
  },
  // userListState: async (id, state) => {
  //   const accessToken = Common.getAccessToken();
  //   console.log("활성화 비활성화, id : ", id, state);
  //   const data = {
  //     id: id,
  //     active: state,
  //   };
  //   return await axios.put(KH_DOMAIN + `/users/state`, data, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + accessToken,
  //     },
  //   });
  // },

  // (카테고리)게시글 등록
  categorySave: async (name, img, logo) => {
=======
    return await axios.put(KH_DOMAIN + `/users/state`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  // 카테고리 등록
  categorySave: async (name, img, logo) => {
    const accessToken = Common.getAccessToken();
    console.log("access : " + accessToken);
>>>>>>> 504fc9a (test commit)
    console.log("name : " + name);
    console.log("img : " + img);
    console.log("logo : " + logo);

    const category = {
      name: name,
      image: img,
      logo: logo,
    };
    return await customAxios.post(KH_DOMAIN + "/category/add", category);
  },
<<<<<<< HEAD
  // categorySave: async (name, img, logo) => {
  //   const accessToken = Common.getAccessToken();
  //   console.log("access : " + accessToken);
  //   console.log("name : " + name);
  //   console.log("img : " + img);
  //   console.log("logo : " + logo);

  //   const category = {
  //     name: name,
  //     image: img,
  //     logo: logo,
  //   };
  //   return await axios.post(KH_DOMAIN + "/category/add", category, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + accessToken,
  //     },
  //   });
  // },

  // 게시글 조회
  boardList: async () => {
    return await customAxios.get(KH_DOMAIN + "/category/list");
=======
  // 카테고리 조회
  boardList: async () => {
    const accessToken = Common.getAccessToken();
    return await axios.get(KH_DOMAIN + "/category/list", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
>>>>>>> 504fc9a (test commit)
  },
  // boardList: async () => {
  //   const accessToken = Common.getAccessToken();
  //   return await axios.get(KH_DOMAIN + "/category/list", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + accessToken,
  //     },
  //   });
  // },

<<<<<<< HEAD
  // 게시글 삭제
  boardDelete: async (categoryId) => {
    return await customAxios.delete(
      KH_DOMAIN + `/category/delete/${categoryId}`
    );
=======
  // 카테고리 수정
  boardUpdate: async (categoryId, updatedValue, active, inactive) => {
    const accessToken = Common.getAccessToken();

    try {
      const response = await axios.put(
        KH_DOMAIN + `/category/modify/${categoryId}`,
        {
          value: updatedValue,
          active, // 이 부분은 active와 inactive를 요청으로 보낼지 여부에 따라 수정하세요.
          inactive,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  },

  // 카테고리 삭제
  boardDelete: async (id) => {
    const accessToken = Common.getAccessToken();
    return await axios.delete(KH_DOMAIN + `/category/delete/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
>>>>>>> 504fc9a (test commit)
  },
  // boardDelete: async (categoryId) => {
  //   const accessToken = Common.getAccessToken();
  //   return await axios.delete(KH_DOMAIN + `/category/delete/${categoryId}`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + accessToken,
  //     },
  //   });
  // },

  // 게시글 페이지네이션 조회
  boardPageList: async (page, size) => {
    return await customAxios.get(
      KH_DOMAIN + `/category/list/page?page=${page}&size=${size}`
    );
  },
  // boardPageList: async (page, size) => {
  //   const accessToken = Common.getAccessToken();
  //   return await axios.get(
  //     KH_DOMAIN + `/category/list/page?page=${page}&size=${size}`,
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + accessToken,
  //       },
  //     }
  //   );
  // },

  // 페이지 수 조회
  boardPageCount: async (page, size) => {
<<<<<<< HEAD
    return await customAxios.get(KH_DOMAIN + `/category/count`);
=======
    const accessToken = Common.getAccessToken();
    return await axios.get(KH_DOMAIN + `/category/count`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  // 카테고리 활성화 바활성화 처리(get)-categoryController
  categoryInfoGet: async () => {
    const accessToken = Common.getAccessToken();
    return await axios.get(KH_DOMAIN + `/category/allList`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  // 카테고리 활성화 비활성화(post)-AdminActiveController
  categoryListState: async (id, state) => {
    const accessToken = Common.getAccessToken();
    console.log("활성화 비활성화, id : ", id, state);
    const data = {
      categoryId: id,
      active: state,
    };
    return await axios.put(KH_DOMAIN + `/category/state`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  //광고 전체 조회
  adList: async () => {
    const accessToken = localStorage.getItem("accessToken");
    return await axios.get(KH_DOMAIN + `/ad/list`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  // 광고 페이지네이션 조회
  adPageList: async (page, size) => {
    const accessToken = Common.getAccessToken();
    return await axios.get(
      KH_DOMAIN + `/ad/list/page?page=${page}&size=${size}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
>>>>>>> 504fc9a (test commit)
  },
  // boardPageCount: async (page, size) => {
  //   const accessToken = Common.getAccessToken();
  //   return await axios.get(KH_DOMAIN + `/category/count`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + accessToken,
  //     },
  //   });
  // },

<<<<<<< HEAD
  // 게시판 활성화 바활성화 처리(get)-categoryController
  categoryInfoGet: async () => {
    return await customAxios.get(KH_DOMAIN + `/category/allList`);
  },
  // categoryInfoGet: async () => {
  //   const accessToken = Common.getAccessToken();
  //   return await axios.get(KH_DOMAIN + `/category/allList`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + accessToken,
  //     },
  //   });
  // },

  // 게시판 활성화 비활성화(post)-AdminActiveController
  categoryListState: async (id, state) => {
    console.log("활성화 비활성화, id : ", id, state);
    const data = {
      categoryId: id,
      active: state,
    };
    return await customAxios.put(KH_DOMAIN + `/category/state`, data);
  },
  // categoryListState: async (id, state) => {
  //   const accessToken = Common.getAccessToken();
  //   console.log("활성화 비활성화, id : ", id, state);
  //   const data = {
  //     categoryId: id,
  //     active: state,
  //   };
  //   return await axios.put(KH_DOMAIN + `/category/state`, data, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + accessToken,
  //     },
  //   });
  // },

  //광고 전체 조회
  adList: async () => {
    return await customAxios.get(KH_DOMAIN + `/ad/list`);
  },
  // adList: async () => {
  //   const accessToken = localStorage.getItem("accessToken");
  //   return await axios.get(KH_DOMAIN + `/ad/list`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + accessToken,
  //     },
  //   });
  // },

  // 광고 페이지네이션 조회
  adPageList: async (page, size) => {
    return await customAxios.get(
      KH_DOMAIN + `/ad/list/page?page=${page}&size=${size}`
    );
  },
  // adPageList: async (page, size) => {
  //   const accessToken = Common.getAccessToken();
  //   return await axios.get(
  //     KH_DOMAIN + `/ad/list/page?page=${page}&size=${size}`,
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + accessToken,
  //       },
  //     }
  //   );
  // },

  // 광고 페이지 수 조회
  adPageCount: async (page, size) => {
    return await customAxios.get(KH_DOMAIN + `/ad/count`);
  },
  // adPageCount: async (page, size) => {
  //   const accessToken = Common.getAccessToken();
  //   return await axios.get(KH_DOMAIN + `/ad/count`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + accessToken,
  //     },
  //   });
  // },

  // 광고 활성화 바활성화 처리(get)
  adInfoGet: async () => {
    return await customAxios.get(KH_DOMAIN + `/ad/allList`);
  },
  // adInfoGet: async () => {
  //   const accessToken = Common.getAccessToken();
  //   return await axios.get(KH_DOMAIN + `/ad/allList`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + accessToken,
  //     },
  //   });
  // },

  // 광고 활성화 비활성화(post)
  adListState: async (id, state) => {
=======
  // 광고 페이지 수 조회
  adPageCount: async (page, size) => {
    const accessToken = Common.getAccessToken();
    return await axios.get(KH_DOMAIN + `/ad/count`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  // 광고 활성화 바활성화 처리(get)
  adInfoGet: async () => {
    const accessToken = Common.getAccessToken();
    return await axios.get(KH_DOMAIN + `/ad/allList`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  // 광고 활성화 비활성화(post)
  adListState: async (id, state) => {
    const accessToken = Common.getAccessToken();
>>>>>>> 504fc9a (test commit)
    console.log("활성화 비활성화, id : ", id, state);
    const data = {
      id: id,
      active: state,
    };
<<<<<<< HEAD
    return await customAxios.put(KH_DOMAIN + `/ad/state`, data);
  },
  // adListState: async (id, state) => {
  //   const accessToken = Common.getAccessToken();
  //   console.log("활성화 비활성화, id : ", id, state);
  //   const data = {
  //     id: id,
  //     active: state,
  //   };
  //   return await axios.put(KH_DOMAIN + `/ad/state`, data, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + accessToken,
  //     },
  //   });
  // },
=======
    return await axios.put(KH_DOMAIN + `/ad/state`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },
>>>>>>> 504fc9a (test commit)
};

export default AdminAxiosApi;
