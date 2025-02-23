import React, { useEffect, useRef, useState } from "react";
import "../cssReset.css";
import "./topCss.css";

const Top = () => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const data = [
    "ADIDAS - GIẢM ĐẾN 35%",
    "NIKE - GIẢM ĐẾN 40%",
    "UNDER ARMOUR - GIẢM ĐẾN 50%",
  ];

  useEffect(() => {
    scrollToIndex(currentIndex);
  }, []);
  //phải
  const nextSlide = () => {
    const totalItems = data.length;
    let newIndex = currentIndex + 1;
    if (newIndex >= totalItems) {
      newIndex = 0; // Quay lại đầu
    }
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };
  //trái
  const prevSlide = () => {
    const totalItems = data.length;
    let newIndex = currentIndex - 1; // Giúp tránh giá trị âm
    if (newIndex < 0) {
      newIndex = totalItems - 1; // Quay lại cuối
    }
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  // Cuộn đến chỉ mục mới
  const scrollToIndex = (index) => {
    if (carouselRef.current) {
      const itemWidth =
        carouselRef.current.querySelector(".top_item").clientWidth;
      carouselRef.current.scrollTo({
        left: itemWidth * index,
        behavior: "smooth", // Hiệu ứng cuộn mượt mà
      });
    }
  };

  return (
    <div className="top_container">
      <div className="caret left" onClick={prevSlide}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-chevron-left"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </div>

      <div className="caret right" onClick={nextSlide}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-chevron-right"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </div>

      <div className="carousel" ref={carouselRef}>
        {data.map((item, index) => (
          <div
            key={index}
            className={`top_item ${index === currentIndex ? "active" : ""}`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Top;
