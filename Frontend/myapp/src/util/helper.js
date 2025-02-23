const formatPrice = (price) => {
  return price.toLocaleString("vi-VN") + "đ";
};

const getProductByNameSize = (products, name, size) => {
  let product = {};
  for (const item of products)
    if (item.name == name && item.size == size) {
      product = item;
      return product;
    }
  return {};
};

const handelOnTop = (position) => {
  window.scrollTo({
    top: position,
    behavior: "smooth",
  });
};

const handleSaveOrder = (id) => {
  let orders = JSON.parse(localStorage.getItem("order")) || [];
  if (orders.length <= 0) {
    orders = [id];
  } else {
    orders.push(id);
  }
  localStorage.setItem("order", JSON.stringify(orders));
};

function removeVietnameseTones(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

function formattedDate(create_at) {
  return new Date(create_at).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export {
  formatPrice,
  getProductByNameSize,
  handelOnTop,
  handleSaveOrder,
  removeVietnameseTones,
  formattedDate
};
