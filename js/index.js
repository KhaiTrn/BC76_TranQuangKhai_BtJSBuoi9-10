let arrNV = [];
// Thêm Sinh viên
document.getElementById("btnThemNV").onclick = function () {
  let nhanVien = getValueForm();
  let date = document.getElementById("datepicker").value;
  console.log(date);
  if (!nhanVien) {
    return;
  }
  arrNV.push(nhanVien);
  setLocalStorage("arrNV", arrNV);
  renderDataNV();
  document.getElementById("QLNV").reset();
};
document.getElementById("btnThem").onclick = function () {
  document.getElementById("QLNV").reset();
  let email = document.getElementById("email");
  email.readOnly = false;
};
// lấy dữ liệu nhân viên và kiểm tra validation
function getValueForm() {
  let nhanVien = new NhanVien();
  let arrField = document.querySelectorAll("#QLNV input,#QLNV select");
  let flag = true;
  for (let field of arrField) {
    let { value, id } = field;
    nhanVien[id] = value;
    let theThongBao =
      field.parentElement.parentElement.querySelector("span.sp-thongbao");
    if (!checkEmptyValue(theThongBao, value)) {
      flag = false;
    } else {
      let dataValue = field.getAttribute("data-validation");
      let dataMin = field.getAttribute("data-min");
      let dataMax = field.getAttribute("data-max");
      if (dataValue == "name" && !checkNameValue(theThongBao, value)) {
        flag = false;
      } else if (dataValue == "email" && !checkEmailValue(theThongBao, value)) {
        flag = false;
      } else if (
        dataValue == "minMaxLength" &&
        !checkMinMaxLengthValue(theThongBao, value, +dataMin, +dataMax)
      ) {
        flag = false;
      } else if (
        dataValue == "minMaxValue" &&
        !checkMinMaxValue(theThongBao, value, +dataMin, +dataMax)
      ) {
        flag = false;
      } else if (
        dataValue == "password" &&
        (!checkMinMaxLengthValue(theThongBao, value, +dataMin, +dataMax) ||
          !checkPasswordValue(theThongBao, value))
      ) {
        flag = false;
      }
    }
  }
  return flag ? nhanVien : null;
}

// render table
function renderDataNV(arr = arrNV) {
  let content = "";
  for (let nhanVien of arr) {
    let newNhanVien = new NhanVien();
    Object.assign(newNhanVien, nhanVien);
    let { tknv, name, email, datepicker, chucvu } = newNhanVien;
    content += `<tr>
  <td>${tknv}</td>
  <td>${name}</td>
  <td>${email}</td>
  <td>${datepicker}</td>
  <td>${chucvu}</td>
  <td>${newNhanVien.tinhLuong()}</td>
  <td>${newNhanVien.xepLoai()}</td>
  <td><button onclick = "deleteNV('${tknv}')" type = "button" class = "btn btn-danger">Xóa</button>
  <button onclick = "getInfoNV('${tknv}')" class = "btn btn-warning" data-toggle="modal" data-target="#myModal">Sửa</button>
  </tr>`;
  }
  document.getElementById("tableDanhSach").innerHTML = content;
}
// lưu dữ liệu khi onload trang
window.onload = function () {
  let dataLocal = getLocalStorage("arrNV");
  if (dataLocal) {
    arrNV = dataLocal.map((item) => {
      let nhanVien = new NhanVien();
      return Object.assign(nhanVien, item); // Khôi phục lại thành đối tượng NhanVien
    });
    renderDataNV();
  }
};
// set dữ liệu lên localStorage
function setLocalStorage(key, value) {
  let dataString = JSON.stringify(value);
  localStorage.setItem(key, dataString);
}
// lấy dữ liệu từ localStorage
function getLocalStorage(key) {
  let dataLocal = localStorage.getItem(key);
  return dataLocal ? JSON.parse(dataLocal) : null;
}
// deleteNV
function deleteNV(maNV) {
  let index = arrNV.findIndex((item, i) => item.tknv == maNV);
  if (index != -1) {
    arrNV.splice(index, 1);
    renderDataNV();
    setLocalStorage("arrNV", arrNV);
  }
}
// Cập nhật Nhân viên
function getInfoNV(maNV) {
  let nhanVien = arrNV.find((item, index) => item.tknv == maNV);
  if (nhanVien) {
    let arrField = document.querySelectorAll("#QLNV input,#QLNV select");
    for (field of arrField) {
      field.value = nhanVien[field.id];
      if (field.id == "email") {
        field.readOnly = true;
      }
    }
  }
}
document.getElementById("btnCapNhat").onclick = function () {
  let nhanVien = getValueForm();
  if (nhanVien) {
    let index = arrNV.findIndex((item, i) => item.email == nhanVien.email);
    if (index != -1) {
      arrNV[index] = nhanVien;
      renderDataNV();
      setLocalStorage("arrNV", arrNV);
      document.getElementById("email").readOnly = false;
      document.getElementById("QLNV").reset();
    }
  }
};
// Tìm NV theo loại
document.getElementById("searchName").oninput = function (event) {
  let keyWord = event.target.value.trim().toLowerCase();
  let newKeyWord = removeVietnameseTones(keyWord);
  let arrSearch = arrNV.filter((item, index) => {
    let newXepLoaiNV = removeVietnameseTones(
      item.xepLoai().trim().toLowerCase()
    );
    return newXepLoaiNV.includes(newKeyWord);
  });
  renderDataNV(arrSearch);
};
