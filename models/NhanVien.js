class NhanVien {
  tknv = "";
  name = "";
  email = "";
  password = "";
  datepicker = "";
  luongCB = "";
  chucvu = "";
  gioLam = "";
  tinhLuong = function () {
    if (this.chucvu == "Sếp") {
      return this.luongCB * 3 * this.gioLam;
    } else if (this.chucvu == "Trưởng Phòng") {
      return this.luongCB * 2 * this.gioLam;
    } else {
      return this.luongCB * this.gioLam;
    }
  };
  xepLoai = function () {
    if (this.gioLam < 160) {
      return "nhân viên trung bình";
    } else if (160 <= this.gioLam && this.gioLam < 176) {
      return "nhân viên khá";
    } else if (176 <= this.gioLam && this.gioLam < 192) {
      return "nhân viên giỏi";
    } else if (this.gioLam >= 192) {
      return "nhân viên xuất sắc";
    }
  };
}
