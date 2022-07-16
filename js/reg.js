/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-07-09 10:15:18
 * @LastEditors: cheng 1797187146@qq.com
 * @LastEditTime: 2022-07-16 10:54:24
 * @FilePath: \静态页面\js\reg.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 账号
const loginidvd = new verify("txtLoginId", async function (val) {
  if (!val) {
    return "请填写账号";
  }
  const resp = await API.verify(val);
  if (resp.data) {
    return "账号已存在";
  }
});

// 昵称
const nickname = new verify("txtNickname", async function (val) {
  if (!val) {
    return "请填写昵称";
  }
});

// 密码
const pwd = new verify("txtLoginPwd", async function (val) {
  if (!val) {
    return "请输入密码";
  }
});
// 二次密码
const surepwd = new verify("txtLoginPwdConfirm", async function (val) {
  if (!val) {
    return "请输入密码";
  } else if (val !== pwd.input.value) {
    return "两次密码不一致";
  }
});

const form = document.querySelector(".user-form");
// 表单提交事件
form.onsubmit = async function (e) {
  e.preventDefault();
  const resulte = await verify.validate(loginidvd, nickname, pwd, surepwd);
  if (!resulte) {
    return;
  }
  const formdata = new FormData(form);
  const data = Object.fromEntries(formdata.entries());
  const r = await API.reg(data);
  if (r.code === 0) {
    alert("注册成功");
    location.href = base + "/login.html";
  }
};
