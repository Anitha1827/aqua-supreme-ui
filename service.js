import axios from "axios";

let api_url = "http://localhost:7000/api";
// let api_url = "https://aqua-supreme-api.vercel.app/api"

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

// Reset password  // data = {newpassword,oldpassword}
const resetPassword = async (data) => {
  try {
    let response = await axios.put(`${api_url}/auth/reset-password`, data);
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.log(error);
    alert("try again later");
  }
};

// Add New Customer
const addNewCustomer = async (data) => {
  try {
    console.log("servicedata37", data);
    let response = await axios.post(
      `${api_url}/customer/createnew-customer`,
      data
    );
    console.log("response38", response);
    return response.data;
  } catch (error) {
    console.log(error);
    alert("Try again later!");
  }
};

// Edit Customer
const editCustomer = async (data) => {
  try {
    let response = await axios.put(`${api_url}/customer/update`, data);
    console.log("service47", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    alert("try again later");
  }
};

//update customer duedate
const updateduedate = async(data) => {
  try {
    let res = await axios.put(`${api_url}/customer/update-duedate`, data);
    console.log("duedate65", res.data);
    return res.data;
  } catch (error) {
    console.error(error);
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
    alert("try later");
  }
};

// Add new Installation
const addNewInstallation = async (data) => {
  try {
    let res = await axios.post(`${api_url}/customer/create`, data);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    alert("try again later");
  }
};
// Get Customer Details for Installation page
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

//get service reminder customer details
const getServiceReminderCustomer = async () => {
  try {
    let response = await axios.get(`${api_url}/customer/service-reminder`);
    console.log(response.data, "responsefromservice");
    return response.data;
  } catch (error) {
    console.error(error);
    alert("Try again later!..");
  }
};

// for customer page
const getAllCustomer = async () => {
  try {
    let response = await axios.get(`${api_url}/customer/getAll`);
    console.log(response.data, "respservice94");
    return response.data;
  } catch (error) {
    console.error(error);
    alert("Try again later!");
  }
};

// Get details by id
const getCustomerDetailsById = async (id) => {
  try {
    let response = await axios.get(`${api_url}/customer/get-by-id/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    alert("try again later");
  }
};

// Assign technician
const assignTechnician = async (id, isInstallationAssignTo) => {
  try {
    let response = await axios.put(
      `${api_url}/customer/assign-technician/${id}`,
      { isInstallationAssignTo }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    alert("try again later");
  }
};

// Get Installation
const getInstallationDetails = async () => {
  try {
    let response = await axios.get(`${api_url}/customer/get`);
    console.log(response.data, "responsefromservice59");
    return response.data;
  } catch (error) {
    console.log(error);
    alert("try again later");
  }
};

// Edit Installation
const editInstallation = async (data) => {
  try {
    let response = await axios.put(`${api_url}/customer/update`, data);
    console.log("service84", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    alert("try again later");
  }
};

// Update Installation data
const updateInstallationData = async (id, data) => {
  let response = await axios.put(
    `${api_url}/customer/installation-status/${id}`,
    data
  );
  console.log("service133", response.data);
  return response.data;
};

// get Installtion completed data
const installationCompleted = async () => {
  let response = await axios.get(
    `${api_url}/customer/installation-completed-data`
  );
  console.log("serviceline143", response.data);
  return response.data;
};

// Get Installation Pending data
const installationPending = async () => {
  let response = await axios.get(
    `${api_url}/customer/installation-pending-data`
  );
  console.log("servicepending150", response.data);
  return response.data;
};

// Delete Installation
const deleteInstallation = async (id) => {
  try {
    let response = await axios.delete(`${api_url}/customer/cust-delete/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    alert("try later");
  }
};
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
const getService = async () => {
  try {
    let response = await axios.get(`${api_url}/service/get`);
    console.log("serv106", response);
    return response.data;
  } catch (error) {
    console.error(error);
    alert("try again later");
  }
};

// Get Service details by id
const getServiceDetailsById = async (id) => {
  try {
    let response = await axios.get(`${api_url}/service/get-by-id/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    alert("try again later");
  }
};

// Assign technician
const assignServiceTechnician = async (id, serviceAssignTo) => {
  try {
    let response = await axios.put(
      `${api_url}/service/assign-technician/${id}`,
      { serviceAssignTo }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    alert("try again later");
  }
};

// update service status
const updateServiceStatus = async (id, data) => {
  try {
    let response = await axios.put(
      `${api_url}/service/service-status/${id}`,
      data
    );
    console.log("serviceline241", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    alert("try again later");
  }
};

// Get service Completed details
const getServiceCompleted = async () => {
  try {
    let response = await axios.get(`${api_url}/service/get-completed`);
    console.log("getcompleted253", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    alert("try again later");
  }
};

// Get Service Pending Details
const getServicePendingData = async () => {
  try {
    let response = await axios.get(`${api_url}/service/get-pending`);
    console.log("getpendingdata", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    alert("try again later");
  }
};

// Edit Service Details
const editService = async (data) => {
  try {
    let response = await axios.put(`${api_url}/service/edit-phone`, data);
    console.log("sesrvice143", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    alert("try again later");
  }
};

// Edit Duedate
const editDuedate = async (data) => {
  try {
    let response = await axios.put(`${api_url}/service/edit-duedate`, data);
    console.log("sesrvice344", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    alert("try again later");
  }
};
const deleteService = async (id) => {
  try {
    let res = await axios.delete(`${api_url}/service/delete/${id}`);
    console.log("service153", res.data);
    return res.data;
  } catch (error) {
    console.error(error);
    alert("try again later");
  }
};

// Get Products Details
const getAllProduct = async (data) => {
  try {
    let res = await axios.get(`${api_url}/product/getproduct`, data);
    return res.data;
  } catch (error) {
    console.error(error);
    alert("try again later");
  }
};

// Create a Product in DB
const addProduct = async (data) => {
  try {
    let resp = await axios.post(`${api_url}/product/create`, data);
    console.log("addprodservice393", resp.data);
    return resp.data;
  } catch (error) {
    console.log(error);
    alert("Please try again later");
  }
};

// Delete a Product
const deleteProduct = async (id) => {
  try {
    console.log("serviceid405", id);
    let response = await axios.delete(`${api_url}/product/deleteproduct/${id}`);
    console.log("servicedele406", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    alert("try again later");
  }
};

// Edit Product
const editProduct = async (data) => {
  try {
    let response = await axios.put(`${api_url}/product/update-product`, data);
    console.log("editdata418", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    alert("try again later!");
  }
};



export {
  login,
  resetPassword,
  addNewCustomer,
  getCustomer,
  getAllCustomer,
  editCustomer,
  updateduedate,
  deleteCustomer,
  getServiceReminderCustomer,
  addNewInstallation,
  getInstallationDetails,
  assignTechnician,
  getCustomerDetailsById,
  editInstallation,
  deleteInstallation,
  updateInstallationData,
  installationCompleted,
  installationPending,
  addNewUser,
  getNewUser,
  editUser,
  deleteUser,
  addService,
  getService,
  editService,
  deleteService,
  getServiceDetailsById,
  assignServiceTechnician,
  updateServiceStatus,
  getServiceCompleted,
  getServicePendingData,
  editDuedate,
  getAllProduct,
  addProduct,
  deleteProduct,
  editProduct,
};
