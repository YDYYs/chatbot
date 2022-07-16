/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-07-08 16:09:53
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-07-13 15:00:35
 * @FilePath: \10. 聊天机器人-接口封装\静态页面\js\API.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var API = (function () {
  const BASE_URL = "https://study.duyiedu.com";
  const TOKEN_KEY = "token";

  // 获取网络资源
  function get(path) {
    const headers = {};
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    return fetch(BASE_URL + path, { headers });
  }

  // 发送请求
  function post(path, bodyobj) {
    const headers = {
      "Content-Type": "application/json",
    };
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    return fetch(BASE_URL + path, {
      headers,
      method: "POST",
      body: JSON.stringify(bodyobj),
    });
  }

  //注册账号
  async function reg(userinfor) {
    return await post("/api/user/reg", userinfor).then((resp) => resp.json());
  }

  //登录账号
  async function login(usermag) {
    const resp = await post("/api/user/login", usermag); //获取请求头
    const result = await resp.json(); //获取请求体
    if (result.code === 0) {
      //登录成功保存令牌到localstorage
      //保存响应头
      const token = resp.headers.get("authorization");
      localStorage.setItem(TOKEN_KEY, token);
    }
    console.log(result);
    return result;
  }

  //验证账号
  async function verify(userId) {
    const resp = await get("/api/user/exists?loginId=" + userId);
    return await resp.json();
  }

  //用户信息
  async function profile() {
    const resp = await get("/api/user/profile");
    return await resp.json();
  }

  //发送聊天请求
  async function sendChat(content) {
    const resp = await post("/api/chat", { content });
    return await resp.json();
  }

  // 获取历史记录
  async function gethistory() {
    const resp = await get("/api/chat/history");
    return await resp.json();
  }

  // 退出登录
  function loginOut() {
    localStorage.removeItem(TOKEN_KEY);
  }
  return {
    reg,
    login,
    verify,
    profile,
    sendChat,
    gethistory,
    loginOut,
  };
})();
