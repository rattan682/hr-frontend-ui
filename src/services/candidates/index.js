import { apiClient } from "../../utils/apiClient";
import { apiRoutes } from "../../utils/apiRoutes";

export const listCandidates = async (data) => {
  let response = await apiClient({
    method: "POST",
    url: apiRoutes.listCandidates,
    data,
  });
  return response?.data?.details || [];
};

export const newCandidate = async (data, isMulti) => {
  console.log({ data });
  let response = await apiClient({
    method: "POST",
    url: apiRoutes.addCandidates,
    data,
    isMulti,
  });
  return response?.data;
};

export const deleteCandidate = async (id) => {
  let response = await apiClient({
    method: "DELETE",
    url: `${apiRoutes.deleteCandidates}/${id}`,
  });
  return response?.data;
};

export const updateCandidate = async (id, data) => {
  let response = await apiClient({
    method: "PATCH",
    url: `${apiRoutes.updateCandidates}/${id}`,
    data,
  });
  return response?.data;
};
