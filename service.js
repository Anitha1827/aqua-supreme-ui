import axios from "axios";

// let api_url = "http://localhost:7000/api";
let api_url = "https://aqua-supreme-api.vercel.app/api"

// Login functionality
const login = async (data) => {
  try {
    let response = await axios.post(`${api_url}/auth/login`, data);
    console.log("response", response);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    console.log(error);
    alert("Try again Later!");
  }
};

// Add New Customer
const addNewCustomer = async (data) => {
  try {
    let response = await axios.post(`${api_url}/customer/create`, data);
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.log(error);
    alert("Try again later!");
  }
};

// Add new Installation
const addNewInstallation = async (data) => {
  try {
    let res = await axios.post(`${api_url}/customer/create`, data);
    console.log(res.data);
    return res.data
  } catch (error) {
    console.log(error);
    alert("try again later")
  }
}
// Get Customer Details
const getCustomer = async () => {
  try {
    let response = await axios.get(`${api_url}/customer/get`);
    console.log(response.data, "responsefromservice");
    return response.data;
  } catch (error) {
    console.error(error);
    alert("Try again later!..");
  }
};

// Get Installation
const getInstallationDetails = async() => {
  try {
    let response = await axios.get(`${api_url}/customer/get`);
    console.log(response.data, "responsefromservice59");
    return response.data;
  } catch (error) {
    console.lor(error)
    alert("try again later")
  }
}

// Edit Customer
const editCustomer = async (data) => {
  try {
    let response = await axios.put(`${api_url}/customer/update`,data);
    console.log("service47", response.data);
    return response.data

  } catch (error) {
    console.error(error)
    alert("try again later")
  }
}

// Edit Installation
const editInstallation = async (data) => {
  try {
    let response = await axios.put(`${api_url}/customer/update`,data);
    console.log("service84", response.data);
    return response.data
  } catch (error) {
    console.error(error)
    alert("try again later")
  }
}
// Delete Customer
const deleteCustomer = async (id) => {
  try {
   let response = await axios.delete(`${api_url}/customer/cust-delete/${id}`);
   console.log(response.data);
    return response.data;
  
  } catch (error) {
    console.error(error);
    alert("try later")
  }
}


// Delete Installation
const deleteInstallation = async(id) => {
  try {
    let response = await axios.delete(`${api_url}/customer/cust-delete/${id}`);
    console.log(response.data);
     return response.data;
   
   } catch (error) {
     console.error(error);
     alert("try later")
   }
}
// Add new user
const addNewUser = async (data) => {
  try {
    let response = await axios.post(`${api_url}/user/add-new-user`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    alert("Try Again Later");
  }
};

// Get User Details
const getNewUser = async () => {
  try {
    let response = await axios.get(`${api_url}/user/get-user`);
    // console.log(response,"response")
    return response.data;
  } catch (error) {
    console.error(error);
    alert("Try Again Later");
  }
};

// Edit User
const editUser = async (data) => {
  try {
    let response = await axios.put(`${api_url}/user/edit-user`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    alert("Try again later");
  }
};

// Delete User
const deleteUser = async (id) => {
  try {
    let response = await axios.delete(`${api_url}/user/user-delete/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    alert("Try again later");
  }
};

// Add New Service
const addService = async (data) => {
  try {
    let response = await axios.post(`${api_url}/service/create`, data);
    console.log("resservice", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    alert("try again later");
  }
};

// Get Service details
const getService = async() => {
  try {
    let response = await axios.get(`${api_url}/service/get`);
    console.log("serv106", response)
    return response.data
  } catch (error) {
    console.error(error);
    alert("try again later")
  }
};

// Edit Service Details
const editService = async(data) => {
  try {
    let response = await axios.put(`${api_url}/service/edit`,data);
    console.log("sesrvice143", response.data)
    return response.data
  } catch (error) {
    console.log(error)
    alert("try again later")
  }
}

const deleteService = async(id) =>{
  try {
    let res = await axios.delete(`${api_url}/service/delete/${id}`);
    console.log("service153", res.data)
    return res.data;

  } catch (error) {
    console.error(error)
    alert("try again later")
  }
}


export {
  login,
  addNewCustomer,
  getCustomer,
  editCustomer,
  deleteCustomer,
  addNewInstallation,
  getInstallationDetails,
  editInstallation,
  deleteInstallation,
  addNewUser,
  getNewUser,
  editUser,
  deleteUser,
  addService,
  getService,
  editService,
  deleteService,
};
