import axios from "axios";

// danh sach menu cha
export const getMenuAPI = async () => {
  const respone = await axios.get(`/v1/menus/list`);

  return respone.data;
};
// danh sach menu all
export const getMenuAllAPI = async () => {
  const respone = await axios.get(`/v1/menus/listall`);

  return respone.data;
};
//danh sach menu con
export const getMenuAllChildrentAPI = async () => {
  const respone = await axios.get(`/v1/menus/listallchild`);

  return respone.data;
};
//danh sach menu con theo menu cha
export const getMenuChildAPI = async (id) => {
  const respone = await axios.get(`/v1/menus/find/${id}`);

  return respone.data;
};

export const getSignInAPI = async (email, pass) => {
  try {
    const respone = await axios.post(
      `/v1/users/signin`,
      {
        email: email,
        pass: pass,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return respone.data;
  } catch (error) {
    if (error.response && error.response.data) {
      const { statusCode, message } = error.response.data;

      // In ra statusCode và message để kiểm tra
      console.error("Lỗi từ server:", message);

      // Ném lỗi với thông báo chi tiết
      throw new Error(message);
    } else {
      // Nếu không có phản hồi từ server, có thể là lỗi kết nối
      console.error("Lỗi kết nối:", error.message);
      throw new Error("Lỗi kết nối mạng hoặc không có phản hồi từ server");
    }
  }
};

export const getSignUpAPI = async (name, email, pass, address, phone) => {
  try {
    const respone = await axios.post(
      `/v1/users/signup`,
      {
        name: name,
        email: email,
        pass: pass,
        address: address,
        phone: phone,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return respone.data;
  } catch (error) {
    if (error.response && error.response.data) {
      const { statusCode, message } = error.response.data;

      // In ra statusCode và message để kiểm tra
      console.error("Lỗi từ server: " + message);

      // Ném lỗi với thông báo chi tiết
      throw new Error(message);
    } else {
      // Nếu không có phản hồi từ server, có thể là lỗi kết nối
      console.error("Lỗi kết nối:", error.message);
      throw new Error("Lỗi kết nối mạng hoặc không có phản hồi từ server");
    }
  }
};

export const getAllUserAPI = async () => {
  const respone = await axios.get(`/v1/users/list`);

  return respone.data;
};

export const getUserByIdAPI = async (id) => {
  const respone = await axios.get(`/v1/users/getOne/${id}`);

  return respone.data;
};

export const getProductAPI = async () => {
  const respone = await axios.get(`/v1/products/list`);

  return respone.data;
};

export const findOneProductAPI = async (id) => {
  const respone = await axios.get(`/v1/products/find/${id}`);

  return respone.data;
};

export const createNewOrder = async (
  name,
  email,
  phone,
  city,
  district,
  ward,
  address,
  total,
  products
) => {
  try {
    const respone = await axios.post(
      `/v1/orders/add`,
      {
        email: email,
        name: name,
        phone: phone,
        city: city,
        district: district,
        ward: ward,
        address: address,
        total: total,
        products: products,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return respone.data;
  } catch (error) {
    if (error.response && error.response.data) {
      const { statusCode, message } = error.response.data;

      // In ra statusCode và message để kiểm tra
      console.error("Lỗi từ server:", message);

      // Ném lỗi với thông báo chi tiết
      throw new Error(message);
    } else {
      // Nếu không có phản hồi từ server, có thể là lỗi kết nối
      console.error("Lỗi kết nối:", error.message);
      throw new Error("Lỗi kết nối mạng hoặc không có phản hồi từ server");
    }
  }
};

export const getAllOrderAPI = async () => {
  const respone = await axios.get("/v1/orders/list");

  return respone.data;
};

export const getOneMenuAPI = async (id) => {
  const respone = await axios.get(`/v1/menus/findOne/${id}`);

  return respone.data;
};

export const getProductByMenuIdAPI = async (id) => {
  const respone = await axios.get(`/v1/products/findMenuId/${id}`);

  return respone.data;
};
