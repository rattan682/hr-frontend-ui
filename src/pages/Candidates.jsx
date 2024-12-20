import { Download, Plus, Search, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomModal from "../components/CustomModal";
import CustomButton from "../components/CustomButton";
import ModalHeading from "../components/ModalHeading";
import * as candidateServices from "../services/candidates/index";
import { BACKEND_API } from "../../constants";

const CandidateManagement = () => {
  const [addNew, setAddNew] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Tracks search term
  const [filter, setFilter] = useState({}); // Tracks department filter

  const [newCandidate, setNewCandidate] = useState({
    c_name: "",
    c_email: "",
    c_phone: "",
    c_position: "",
    c_status: "New",
    c_experience: "",
    c_resume: null, // Initially, the resume is null
  });

  // Fetch all candidates
  useEffect(() => {
    fetchCandidates();
  }, [filter, searchTerm]);

  const fetchCandidates = async () => {
    try {
      console.log("Fetching candidates...");
      const data = await candidateServices.listCandidates({
        filter,
        search: searchTerm,
      }); // Fetch candidates
      setCandidates(data); // Update candidates state with fetched data
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  // Add a new candidate
  const addCandidate = async () => {
    try {
      const formData = new FormData();
      formData.append("c_name", newCandidate.c_name); // Name
      formData.append("c_email", newCandidate.c_email); // Email
      formData.append("c_phone", newCandidate.c_phone); // Phone number
      formData.append("c_position", newCandidate.c_position); // Position
      formData.append("c_status", newCandidate.c_status); // Status
      formData.append("c_experience", newCandidate.c_experience); // Experience

      if (newCandidate.c_resume) {
        formData.append("resume", newCandidate.c_resume); // Resume file
      }

      const data = await candidateServices.newCandidate(formData, true);
      setCandidates([...candidates, data.details]);
      setAddNew(false);
    } catch (error) {
      console.error("Error adding candidate:", error);
    }
  };

  // Update a candidate's status
  const updateCandidateStatus = async (id, newStatus) => {
    try {
      await candidateServices.updateCandidate(id, { c_status: newStatus });
      const updatedCandidates = candidates.map((candidate) =>
        candidate._id === id ? { ...candidate, c_status: newStatus } : candidate
      );
      setCandidates(updatedCandidates);
    } catch (error) {
      console.error("Error updating candidate status:", error);
    }
  };

  // Delete a candidate
  const deleteCandidate = async (id) => {
    try {
      await candidateServices.deleteCandidate(id);
      const filteredCandidates = candidates.filter(
        (candidate) => candidate._id !== id
      );
      setCandidates(filteredCandidates);
      alert("Delete Successfully");
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  };

  return (
    <div className="candidate-management">
      <div className="header">
        <div className="filters">
          <select
            onChange={(e) => {
              setFilter({
                ...filter,
                c_status:
                  e?.target?.value == "All" ? undefined : e?.target?.value,
              });
            }}
            className="filter-select"
          >
            <option value="All">All</option>
            <option value="Schedules">Schedules</option>
            <option value="Rejected">Rejected</option>
            <option value="New">Ongoing</option>
            <option value="Selected">Selected</option>
          </select>
          <select
            onChange={(e) => {
              setFilter({
                ...filter,
                c_position:
                  e?.target?.value == "All" ? undefined : e?.target?.value,
              });
            }}
            className="filter-select"
          >
            <option value="All">All</option>
            <option value="Designer">Designer</option>
            <option value="Developer">Developer</option>
            <option value="Human Resource">Human Resource</option>
          </select>
        </div>
        <div className="right">
          <div className="search-add">
            <Search color="gray" size={20} />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button onClick={() => setAddNew(true)} className="add-button">
            Add New Candidate
          </button>
        </div>
      </div>

      <table className="candidate-table">
        <thead>
          <tr>
            <th>Sr no.</th>
            <th>Candidates Name</th>
            <th>Email Address</th>
            <th>Phone Number</th>
            <th>Position</th>
            <th>Status</th>
            <th>Experience</th>
            <th>Resume</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => (
            <tr key={candidate.id} className={candidate.c_status.toLowerCase()}>
              <td>{String(index + 1).padStart(2, "0")}</td>
              <td>{candidate.c_name}</td>
              <td>{candidate.c_email}</td>
              <td>{candidate.c_phone}</td>
              <td>{candidate.c_position}</td>
              <td>
                <select
                  className="filter-select no-border"
                  value={candidate.c_status}
                  onChange={(e) =>
                    updateCandidateStatus(candidate._id, e.target.value)
                  }
                >
                  <option value="New">New</option>
                  <option value="Schedules">Schedules</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Selected">Selected</option>
                </select>
              </td>
              <td>{candidate.c_experience} years</td>
              <td>
                <button className="download-button">
                  <Download
                    onClick={() => {
                      const resumeUrl = BACKEND_API + "/" + candidate?.c_resume;
                      window.open(resumeUrl, "_blank");
                    }}
                    className={candidate.c_status.toLowerCase()}
                  />
                </button>
              </td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => deleteCandidate(candidate._id)}
                >
                  <Trash2 color="gray" size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <CustomModal open={addNew} onClose={() => setAddNew(false)}>
        <ModalHeading onClose={() => setAddNew(false)}>
          Add New Candidate
        </ModalHeading>
        <div className="modal-body" id="addCandidateForm">
          <div className="flex-row-wrap">
            <input
              type="text"
              className="input-primary"
              placeholder="Full Name"
              value={newCandidate.c_name}
              onChange={(e) =>
                setNewCandidate({ ...newCandidate, c_name: e.target.value })
              }
            />
            <input
              type="email"
              className="input-primary"
              placeholder="Email"
              value={newCandidate.c_email}
              onChange={(e) =>
                setNewCandidate({ ...newCandidate, c_email: e.target.value })
              }
            />
            <input
              type="text"
              className="input-primary"
              placeholder="Phone Number"
              value={newCandidate.c_phone}
              onChange={(e) =>
                setNewCandidate({ ...newCandidate, c_phone: e.target.value })
              }
            />
            <select
              onChange={(e) =>
                setNewCandidate({ ...newCandidate, c_position: e.target.value })
              }
              className="filter-select"
            >
              <option value="Designer">Designer</option>
              <option value="Developer">Developer</option>
              <option value="Human Resource">Human Resource</option>
            </select>
            <input
              type="text"
              className="input-primary"
              placeholder="Experience"
              value={newCandidate.c_experience}
              onChange={(e) =>
                setNewCandidate({
                  ...newCandidate,
                  c_experience: e.target.value,
                })
              }
            />
            <input
              type="file"
              className="input-primary"
              onChange={(e) =>
                setNewCandidate({
                  ...newCandidate,
                  c_resume: e.target.files[0],
                })
              }
            />
          </div>
          <div className="checkbox-wrapper">
            <input type="checkbox" id="checkbox1" />
            <label htmlFor="checkbox1">
              I hereby declare that the above information is true to the best of
              my knowledge and belief.
            </label>
          </div>
          <CustomButton onClick={addCandidate}>Save</CustomButton>
        </div>
      </CustomModal>
    </div>
  );
};

export default CandidateManagement;
