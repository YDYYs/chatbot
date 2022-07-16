/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-07-09 10:14:47
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-07-09 14:52:26
 * @FilePath: \10. 聊天机器人-接口封装\静态页面\js\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 通用代码
class verify {
  constructor(textid, Funl) {
    this.input = document.querySelector("#" + textid);
    this.p = this.input.nextElementSibling;
    this.Funl = Funl;
    // console.log(this.input, this.p);
    this.input.onblur = () => {
      this.validate();
    };
  }
  async validate() {
    const err = await this.Funl(this.input.value);
    if (err) {
      this.p.innerText = err;
      return false;
    } else {
      this.p.innerText = "";
      return true;
    }
  }
  // 传入的全部判断一下
  static async validate(...a) {
    const resp = a.map((r) => r.validate());
    const resulte = await Promise.all(resp);
    return resulte.every((r) => r); //两个为t则为t
  }
}

// // 账号
// var loginidvd = new verify("txtLoginId", async function (val) {
//   if (!val) {
//     return "请填写账号";
//   }
//   const resp = await API.verify(val);
//   if (resp.data) {
//     return "账号已存在";
//   }
// });

// // 昵称
// var nickname = new verify("txtNickname", async function (val) {
//   if (!val) {
//     return "请填写昵称";
//   }
// });
// function text() {
//   verify.validate(loginidvd, nickname).then((r) => console.log(r));
// }
