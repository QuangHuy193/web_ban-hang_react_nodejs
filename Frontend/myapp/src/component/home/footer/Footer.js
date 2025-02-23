import React from "react";
import "../cssReset.css";
import "./footerCss.css";

const Footer = () => {
  return (
    <div className="footer_content_container">
      {/* 1 */}
      <div className="footer_content_item">
        <div className="footer_content_item_title">
          CÔNG TY TNHH MTV THƯƠNG MẠI THỜI TRANG TỔNG HỢP (GTF)
        </div>

        <div className="footer_content_item_info">
          <strong>Văn phòng:</strong> Số 163, Phan Đăng Lưu, Phường 01, Phú
          Nhuận, Hồ Chí Minh, Việt Nam
        </div>
        <div className="footer_content_item_info">
          <strong>Địa chỉ kho:</strong> 14 Đường Phan Đăng Lưu, Khu phố 7,
          Phường Long Bình, TP. Biên Hòa, Tỉnh ĐồngNai
        </div>
        <div className="footer_content_item_info">
          <strong>Tổng đài:</strong> 1900 63 64 01
        </div>
        <div className="footer_content_item_info">
          <strong>Mã số Doanh Nghiệp:</strong> 0314635071, đăng ký thay đổi ngày
          20 tháng 04 năm 2020
        </div>
      </div>
      {/* 2 */}
      <div className="footer_content_item">
        <div className="footer_content_item_title">VỀ SUPERSPORTS</div>

        <div className="footer_content_item_info">Giới thiệu</div>
        <div className="footer_content_item_info">Hệ thống cửa hàng</div>
        <div className="footer_content_item_info">Thông tin liên hệ</div>
        <div className="footer_content_item_info">
          Các điều khoản và điều kiện
        </div>
      </div>
      {/* 3 */}
      <div className="footer_content_item">
        <div className="footer_content_item_title">Hỗ trợ khách hàng</div>

        <div className="footer_content_item_info">Chính sách giao hàng</div>
        <div className="footer_content_item_info">
          Chính sách đổi trả hàng - Bảo hành
        </div>
        <div className="footer_content_item_info">Chính sách trả góp</div>
        <div className="footer_content_item_info">Chính sách bảo mật</div>
        <div className="footer_content_item_info">
          Hỗ trợ và giải đáp thắc mắc
        </div>
        <div className="footer_content_item_info">Hướng dẫn mua hàng</div>
        <div className="footer_content_item_info">Hướng dẫn chọn size</div>
      </div>
      {/* 4 */}
      <div className="footer_content_item">
        <div className="footer_content_item_title">Group Business</div>

        <div className="footer_content_item_info">Nguyễn Kim</div>
        <div className="footer_content_item_info">Big C</div>
      </div>
      {/* 5 */}
      <div className="footer_content_item">
        <div className="footer_content_item_title">PHƯƠNG THỨC THANH TOÁN</div>

        <div className="footer_content_item_info">
          <img src="/images/ICON_PAYMENT_VN.avif" />
        </div>
        <div className="footer_content_item_info" style={{height: "55px", width: "140px"}}>
          <img src="/images/BO_CONG_THUONG.avif" />
        </div>
        <div className="footer_content_item_info">
          <img src="/images/dmca_protected_sml_120m.png" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
