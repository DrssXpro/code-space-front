const validator = {
  // 登录表单校验
  loginValidator: {
    username: validateUserName,
    password: validateUserPassword,
    email: validateEmail,
    emailCode: validateEmailCode,
  },
  // 注册表单校验
  registerValidator: {
    username: validateUserName,
    password: validateUserPassword,
    email: validateEmail,
  },

  // 空间信息展示校验
  spaceValidator: {
    spacename: validateSpaceName,
    spaceintroduce: validateSpaceIntroduce,
    inviteCode: validateInviteCode,
  },
};

// 校验用户名
function validateUserName(rule: any, value: any, callback: any) {
  if (value == "") {
    callback(new Error("用户名不能为空"));
  } else if (value.length < 4 || value.length > 10) {
    callback(new Error("用户名在4-10个字符之间"));
  } else {
    callback();
  }
}

// 校验用户密码
function validateUserPassword(rule: any, value: any, callback: any) {
  const reg = /[a-zA-Z0-9!?.]+/;
  if (value === "") {
    callback(new Error("请输入密码"));
  } else if (value.length < 6 || value.length > 16) {
    callback(new Error("密码长度需要在6-16位之间"));
  } else if (!reg.test(value)) {
    callback(new Error("密码中不能包含除了!?.之外的特殊符号"));
  } else {
    callback();
  }
}

// 校验用户邮箱
function validateEmail(rule: any, value: any, callback: any) {
  const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (value == "") {
    callback(new Error("邮箱不能为空"));
  } else if (!reg.test(value)) {
    callback(new Error("邮箱格式不正确"));
  } else {
    callback();
  }
}

// 检验邮箱验证码
function validateEmailCode(rule: any, value: any, callback: any) {
  if (value == "") {
    callback(new Error("验证码不能为空"));
  } else if (value.lengh !== 6) {
    callback(new Error("验证码为六位数"));
  } else {
    callback();
  }
}

// 检验空间名
function validateSpaceName(rule: any, value: any, callback: any) {
  if (value == "") {
    callback(new Error("空间名不能为空"));
  } else if (value.length <= 4 || value.length >= 10) {
    callback(new Error("空间名在4-10个字符之间"));
  } else {
    callback();
  }
}

// 检验空间介绍
function validateSpaceIntroduce(rule: any, value: any, callback: any) {
  if (value == "") {
    callback(new Error("空间介绍不能为空"));
  } else if (value.length <= 4 || value.length >= 50) {
    callback(new Error("空间介绍在4-50个字符之间"));
  } else {
    callback();
  }
}

// 检验空间邀请码
function validateInviteCode(rule: any, value: any, callback: any) {
  if (value == "") {
    callback(new Error("需要生成邀请码"));
  } else {
    callback();
  }
}

export default validator;
