import { apiClient } from "../../utils/apiClient";
import { apiRoutes } from "../../utils/apiRoutes";

export const listEmployees = async (data) => {
  console.log("List employees");
  let response = await apiClient({
    method: "POST",
    url: apiRoutes.listEmployees,
    data,
  });
  return response?.data?.details || [];
};

export const newEmployee = async (data) => {
  let response = await apiClient({
    method: "POST",
    url: apiRoutes.addEmployees,
    data,
  });
  return response?.data;
};

export const deleteEmployee = async (id) => {
  let response = await apiClient({
    method: "DELETE",
    url: `${apiRoutes.deleteEmployees}/${id}`,
  });
  return response?.data;
};

export const updateEmployee = async (id, data) => {
  let response = await apiClient({
    method: "PATCH",
    url: `${apiRoutes.updateEmployees}/${id}`,
    data,
  });
  return response?.data?.details;
};
