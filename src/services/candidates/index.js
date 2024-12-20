import { apiClient } from "../../utils/apiClient";
import { apiRoutes } from "../../utils/apiRoutes";

// List all candidates
export const listCandidates = async (data) => {
  let response = await apiClient({
    method: "POST",
    url: apiRoutes.listCandidates,
    data, // Send filter and searchTerm as query params
  });
  return response?.data?.details || [];
};

// Add a new candidate
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

// Delete a candidate
export const deleteCandidate = async (id) => {
  let response = await apiClient({
    method: "DELETE",
    url: `${apiRoutes.deleteCandidates}/${id}`,
  });
  return response?.data;
};

// Update a candidate
export const updateCandidate = async (id, data) => {
  let response = await apiClient({
    method: "PATCH",
    url: `${apiRoutes.updateCandidates}/${id}`,
    data,
  });
  return response?.data;
};
