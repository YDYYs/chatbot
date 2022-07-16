/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-07-09 10:15:26
 * @LastEditors: cheng 1797187146@qq.com
 * @LastEditTime: 2022-07-16 10:54:03
 * @FilePath: \10. 聊天机器人-接口封装\静态页面\js\login.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 账号
const loginidvd = new verify("txtLoginId", async function (val) {
  if (!val) {
    return "请填写账号";
  }
});
// 密码
const pwd = new verify("txtLoginPwd", async function (val) {
  if (!val) {
    return "请输入密码";
  }
});

const form = document.querySelector(".user-form");
// 表单提交事件
form.onsubmit = async function (e) {
  e.preventDefault(); //停止默认刷新事件
  const resulte = await verify.validate(loginidvd, pwd);
  if (!resulte) {
    return;
  }
  const formdata = new FormData(form);
  const data = Object.fromEntries(formdata.entries()); //获取表单输入的数据
  const r = await API.login(data);
  if (r.code === 0) {
    alert("登录成功");
    location.href = base + "/index.html"; //页面跳转
  }
};
