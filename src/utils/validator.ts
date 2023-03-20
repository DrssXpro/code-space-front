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

  // 更新自己的用户信息校验
  updateUserValidator: {
    name: validateUserName,
    email: validateEmail,
    nickName: validateUserNickName,
  },

  // 空间信息表单校验
  spaceValidator: {
    spacename: validateSpaceName,
    spaceintroduce: validateSpaceIntroduce,
    inviteCode: validateInviteCode,
  },
  // 任务信息表单校验
  taskValidator: {
    name: validateTaskName,
    introduce: validateTaskIntroduce,
    extime: validateTaskTime,
  },

  // 角色信息表单校验
  roleValidator: {
    name: validRoleName,
    introduce: validRoleIntroduce,
    menuList: validRoleMenuList,
    roleChar: validRoleChar,
    status: validRoleStatus,
  },
  // 菜单信息表单校验
  menuValidator: {
    name: validMenuName,
    menuIcon: validMenuIcon,
    routePath: validMenuRoutePath,
    comPath: validMenuComPath,
    perms: validMenuPerms,
    menuType: validMenuType,
    status: validMenuStatus,
  },

  // 空间用户表单校验
  spaceUserValidator: {
    nickName: validateUserNickName,
    roleId: validRoleId,
  },
  // 空间代码编辑校验
  spaceCodeValidator: {
    title: validCodeTitle,
    lan: validCodeLan,
    content: validCodeContent,
  },
  // 管理员更新用户校验
  updateAdminUserValidator: {
    name: validateUserName,
    email: validateEmail,
    password: validateUserPassword,
    roleId: validRoleId,
  },
};

// code选项
const codes = ["cpp", "Java", "JavaScript", "Python", "PHP", "CSS", "Vue"];

// 校验用户名
function validateUserName(rule: any, value: any, callback: any) {
  if (value == "") {
    callback(new Error("用户名不能为空"));
  } else if (value.length < 2 || value.length > 15) {
    callback(new Error("用户名在4-10个字符之间"));
  } else {
    callback();
  }
}

// 校验用户昵称名
function validateUserNickName(rule: any, value: any, callback: any) {
  if (value == "") {
    callback(new Error("空间昵称不能为空"));
  } else if (value.length < 2 || value.length > 15) {
    callback(new Error("空间昵称在2-15个字符之间"));
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

// 校验选择角色
function validRoleId(rule: any, value: any, callback: any) {
  if (typeof value !== "number") {
    callback(new Error("选择角色不能为空"));
  } else if (value <= 0) {
    callback(new Error("选择角色不符合规范"));
  } else {
    callback();
  }
}

// 检验空间名
function validateSpaceName(rule: any, value: any, callback: any) {
  if (value == "") {
    callback(new Error("空间名不能为空"));
  } else if (value.length < 4 || value.length > 10) {
    callback(new Error("空间名在4-10个字符之间"));
  } else {
    callback();
  }
}

// 检验空间介绍
function validateSpaceIntroduce(rule: any, value: any, callback: any) {
  if (value == "") {
    callback(new Error("空间介绍不能为空"));
  } else if (value.length < 4 || value.length > 50) {
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

// 检验任务名
function validateTaskName(rule: any, value: any, callback: any) {
  if (value == "") {
    callback(new Error("任务名不能为空"));
  } else if (value.length < 4 || value.length > 15) {
    callback(new Error("任务名在4-15个字符之间"));
  } else {
    callback();
  }
}

// 检验任务详情
function validateTaskIntroduce(rule: any, value: any, callback: any) {
  if (value == "") {
    callback(new Error("任务详情不能为空"));
  } else if (value.length < 4 || value.length > 80) {
    callback(new Error("任务详情在4-80个字符之间"));
  } else {
    callback();
  }
}

// 检查任务过期时间
function validateTaskTime(rule: any, value: any, callback: any) {
  if (value == "") {
    callback(new Error("过期时间不能为空"));
  } else if (Date.now() > new Date(value).getTime()) {
    callback(new Error("过期时间不能小于当前时间"));
  } else {
    callback();
  }
}

// 检查角色名
function validRoleName(rule: any, value: any, callback: any) {
  if (value == "") {
    callback(new Error("角色不能为空"));
  } else if (value.length < 2 || value.length > 110) {
    callback(new Error("角色名在2-10个字符之间"));
  } else {
    callback();
  }
}
// 检查角色标识
function validRoleChar(rule: any, value: any, callback: any) {
  if (value == "") {
    callback(new Error("角色标识不能为空"));
  } else if (value.length < 2 || value.length > 20) {
    callback(new Error("角色标识在2-10个字符之间"));
  } else {
    callback();
  }
}

// 检查角色介绍
function validRoleIntroduce(rule: any, value: any, callback: any) {
  if (value == "") {
    callback(new Error("角色介绍不能为空"));
  } else if (value.length < 4 || value.length > 30) {
    callback(new Error("角色介绍在4-30个字符之间"));
  } else {
    callback();
  }
}

// 检查角色状态
function validRoleStatus(rule: any, value: any, callback: any) {
  if (![0, 1].includes(value)) {
    callback(new Error("角色状态不能为空"));
  } else {
    callback();
  }
}

// 检查角色菜单权限
function validRoleMenuList(rule: any, value: any, callback: any) {
  if (!value || !value.length) {
    callback(new Error("角色权限不能设置为空"));
  } else {
    callback();
  }
}

// 检查菜单名称
function validMenuName(rule: any, value: any, callback: any) {
  if (value == "") {
    callback(new Error("菜单名称不能为空"));
  } else if (value.length < 2 || value.length > 10) {
    callback(new Error("菜单名称在2-10个字符之间"));
  } else {
    callback();
  }
}

// 检查菜单icon
function validMenuIcon(rule: any, value: any, callback: any) {
  if (value == "") {
    callback(new Error("菜单图标不能为空"));
  } else if (!value.includes("fa") || value.length >= 20) {
    callback(new Error("菜单图标格式不正确"));
  } else {
    callback();
  }
}

// 检查菜单路由路径
function validMenuRoutePath(rule: any, value: any, callback: any) {
  if (value == "") {
    callback(new Error("菜单路由路径不能为空"));
  } else if (value.length < 4 || value.length > 30) {
    callback(new Error("菜单组件路径在4-30个字符之间"));
  } else if (!value.includes("/")) {
    callback(new Error("菜单路由路径不符合规范"));
  } else {
    callback();
  }
}
// 检查菜单组件路径
function validMenuComPath(rule: any, value: any, callback: any) {
  if (value == "") {
    callback(new Error("菜单组件路径不能为空"));
  } else if (value.length < 4 || value.length > 30) {
    callback(new Error("菜单组件路径在4-30个字符之间"));
  } else if (!value.includes("/")) {
    callback(new Error("菜单组件路径不符合规范"));
  } else {
    callback();
  }
}

// 检查菜单标识
function validMenuPerms(rule: any, value: any, callback: any) {
  if (value == "") {
    callback(new Error("菜单标识不能为空"));
  } else if (value.length < 4 || value.length > 20) {
    callback(new Error("菜单标识在4-20个字符之间"));
  } else {
    callback();
  }
}

// 检查菜单类型
function validMenuType(rule: any, value: any, callback: any) {
  if (!value) {
    callback(new Error("菜单类型不能为空"));
  } else if (!["M", "D", "B"].includes(value)) {
    callback(new Error("菜单类型不正确"));
  } else {
    callback();
  }
}

// 检查菜单状态
function validMenuStatus(rule: any, value: any, callback: any) {
  if (!value || ![0, 1].includes(value)) {
    callback(new Error("菜单状态不能为空"));
  } else {
    callback();
  }
}

// 校验代码标题
function validCodeTitle(rule: any, value: any, callback: any) {
  if (!value) {
    callback(new Error("代码标题不能为空"));
  } else if (value.length < 2 || value.length > 20) {
    callback(new Error("代码标题的长度在2-20个字符之间"));
  } else {
    callback();
  }
}

// 检验代码内容
function validCodeContent(rule: any, value: any, callback: any) {
  if (!value) {
    callback(new Error("代码内容不能为空"));
  } else if (value.length < 10 || value.length > 1000) {
    callback(new Error("代码长度在10-1000个字符之间"));
  } else {
    callback();
  }
}

// 检验代码语言
function validCodeLan(role: any, value: any, callback: any) {
  if (!value) {
    callback(new Error("选择语言不能为空"));
  } else if (!codes.includes(value)) {
    callback(new Error("语言选择不在范围内"));
  } else {
    callback();
  }
}
// 检验代码密码
function validCodePwd(role: any, value: any, callback: any) {
  if (!value) {
    callback(new Error("设置密码不能为空"));
  } else if (value.length < 2 || value.length > 15) {
    callback(new Error("密码在2-15个字符之间"));
  } else {
    callback();
  }
}

export default validator;
