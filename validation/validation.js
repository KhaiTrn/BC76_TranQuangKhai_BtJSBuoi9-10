// check khoảng trống
function checkEmptyValue(theThongBao, value) {
  if (value == "") {
    theThongBao.innerHTML = "Vui lòng k bỏ trống";
    return false;
  } else {
    theThongBao.innerHTML = "";
    return true;
  }
}
// check length value
function checkMinMaxLengthValue(theThongBao, value, min, max) {
  let doDai = value.length;
  if (doDai < min || doDai > max) {
    theThongBao.innerHTML = `Vui lòng nhập trong khoảng từ ${min} đến ${max} ký tự`;
    return false;
  } else {
    theThongBao.innerHTML = "";
    return true;
  }
}
// check giá trị
function checkMinMaxValue(theThongBao, value, min, max) {
  let giaTri = value * 1;
  if (giaTri < min || giaTri > max) {
    theThongBao.innerHTML = `Vui lòng nhập trong khoảng từ ${min} đến ${max}`;
    return false;
  } else {
    theThongBao.innerHTML = "";
    return true;
  }
}
// check email
function checkEmailValue(theThongBao, value) {
  let regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let checkEmail = regexEmail.test(value);
  if (checkEmail) {
    theThongBao.innerHTML = "";
    return true;
  } else {
    theThongBao.innerHTML = "Vui lòng nhập đúng định dạng email";
    return false;
  }
}
// check password
function checkPasswordValue(theThongBao, value) {
  let regexPassWord = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
  let checkPassword = regexPassWord.test(value);
  if (checkPassword) {
    theThongBao.innerHTML = "";
    return true;
  } else {
    theThongBao.innerHTML =
      "Vui lòng nhập mật khẩu có ít nhất 1 ký tự số, 1 ký tự viết hoa và 1 ký tự đặc biệt";
    return false;
  }
}
// check Họ tên
function checkNameValue(theThongBao, value) {
  let regexName = /^[A-Za-zÀ-ỹ\s]+$/;
  let checkName = regexName.test(value);
  if (checkName) {
    theThongBao.innerHTML = "";
    return true;
  } else {
    theThongBao.innerHTML = "Vui lòng nhập tên phải là chữ";
    return false;
  }
}
