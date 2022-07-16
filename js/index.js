(async function init() {
  //判断是否登录
  const resp = await API.profile();
  const user = resp.data;
  if (!user) {
    alert("未登录或登录已过期，请重新登录");
    location.href = "../login.html";
    return;
  }
  //   console.log(user);

  const dom = {
    name: document.querySelector(".aside-name"),
    id: document.querySelector(".aside-account"),
    btn: document.querySelector(".close"),
    cont: document.querySelector(".chat-container"),
    txt: document.querySelector("#txtMsg"),
    msgcontainer: document.querySelector(".msg-container"),
  };
  userinfor();
  //显示用户信息
  function userinfor() {
    dom.name.innerText = user.nickname;
    dom.id.innerText = user.loginId;
  }
  //注销
  dom.btn.onclick = function () {
    API.loginOut();
    location.href = "../login.html";
  };

  //内容
  //   <div class="chat-item me">
  //             <img class="chat-avatar" src="./asset/avatar.png" />
  //             <div class="chat-content">你几岁啦？</div>
  //             <div class="chat-date">2022-04-29 14:18:13</div>
  //           </div>
  // addchat();
  function addchat(content) {
    //创建自己发送的div容器，并赋值
    const div = document.createElement("div");
    div.className = "chat-item";
    if (content.from) {
      div.classList.add("me");
    }
    //创建图片
    const img = document.createElement("img");
    img.src = content.from ? "./asset/avatar.png" : "./asset/robot-avatar.jpg";
    img.className = "chat-avatar";

    //文字内容容器
    const cont = document.createElement("div");
    cont.className = "chat-content";
    cont.innerText = content.content;

    //时间
    const time = document.createElement("div");
    time.className = "chat-date";
    time.innerText = Time(content.createdAt); //传入聊天内容的时间戳

    // 添加到div容器中
    div.appendChild(img);
    div.appendChild(cont);
    div.appendChild(time);

    // 添加到页面中
    dom.cont.appendChild(div);
    // 时间转换函数
    function Time(t) {
      const data = new Date(t);
      const year = data.getFullYear();
      const month = (data.getMonth() + 1).toString().padStart(2, "0");
      const day = data.getDate().toString().padStart(2, "0");
      const hour = data.getHours().toString().padStart(2, "0");
      const minute = data.getMinutes().toString().padStart(2, "0");
      const seconds = data.getSeconds().toString().padStart(2, "0");
      return `${year}-${month}-${day}-${hour}:${minute}:${seconds}`;
    }
  }

  // 历史记录函数
  await load();
  async function load() {
    const MsgEx = await API.gethistory();
    //循环聊天记录，有几条就循环几次，并执行addchat函数，把内容传入进去
    for (const key of MsgEx.data) {
      addchat(key);
    }
    scrollbars();
  }
  //加载完后滚动条移到最低端
  function scrollbars() {
    dom.cont.scrollTop = dom.cont.scrollHeight;
  }

  //提交事件
  dom.msgcontainer.onsubmit = function (e) {
    e.preventDefault();
    send();
  };

  // 发送消息
  async function send() {
    const txt = dom.txt.value.trim(); //获取输入内容
    // 手动添加
    addchat({
      from: user.loginId,
      to: null,
      createdAt: Date.now(),
      content: txt,
    });
    scrollbars();
    dom.txt.value = ""; //清空输入框
    const resp = await API.sendChat(txt);
    addchat({
      from: null,
      to: user.loginId,
      ...resp.data,
    });
    scrollbars();
  }
})();
