import { Download, Menu, Plus, Search, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import CustomModal from "../components/CustomModal";
import CustomMenu from "../components/CustomMenu";
import CustomButton from "../components/CustomButton";
import ModalHeading from "../components/ModalHeading";
import { Edit2, MoreVertical } from "lucide-react";
import * as employeeService from "../services/employees/index";
import { BACKEND_API } from "../../constants";

const Employees = () => {
  const [editEmployee, setEditEmployee] = useState(null);
  const [menu, setMenu] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({});
  const [employees, setEmployees] = useState([]);
  const [employeeForm, setEmployeeForm] = useState({
    e_name: "",
    e_email: "",
    e_phone: "",
    e_position: "",
    e_dept: "",
    e_joiningdate: "",
    pic: null,
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        console.log("Fetching employees...");
        const data = await employeeService.listEmployees({
          filter,
          search: searchTerm,
        });
        setEmployees(data);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };

    fetchEmployees();
  }, [filter, searchTerm]);

  const handleDelete = async (id) => {
    setMenu(null);
    try {
      await employeeService.deleteEmployee(id);
      setEmployees(employees.filter((employee) => employee._id !== id));
      setMenu(null);
    } catch (error) {
      console.error("Failed to delete employee:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      formData.append("e_name", employeeForm.e_name);
      formData.append("e_email", employeeForm.e_email);
      formData.append("e_phone", employeeForm.e_phone);
      formData.append("e_position", employeeForm.e_position);
      formData.append("e_dept", employeeForm.e_dept);
      formData.append("e_joiningdate", employeeForm.e_joiningdate);

      if (employeeForm.pic) {
        formData.append("pic", employeeForm.pic);
      }

      const updatedEmployee = await employeeService.updateEmployee(
        editEmployee,
        formData
      );

      setEmployees(
        employees.map((employee) =>
          employee._id === editEmployee ? updatedEmployee : employee
        )
      );
      setEditEmployee(null);
      setEmployeeForm({
        e_name: "",
        e_email: "",
        e_phone: "",
        e_position: "",
        e_dept: "",
        e_joiningdate: "",
        pic: null,
      });
    } catch (error) {
      console.error("Failed to update employee:", error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEmployeeForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEmployeeForm((prevForm) => ({
        ...prevForm,
        pic: file,
      }));
    }
  };

  const handleEdit = (employee) => {
    setMenu(null);
    setEditEmployee(employee._id);
    setEmployeeForm({
      e_name: employee.e_name,
      e_email: employee.e_email,
      e_phone: employee.e_phone,
      e_position: employee.e_position,
      e_dept: employee.e_dept,
      e_joiningdate: employee.e_joiningdate,
      pic: employee.pic,
    });
  };

  return (
    <div className="candidate-management">
      <div className="header">
        <div className="filters">
          <select
            className="filter-select"
            value={filter.e_dept}
            onChange={(e) => {
              setFilter({
                ...filter,
                e_dept:
                  e?.target?.value === "All" ? undefined : e?.target?.value,
              });
            }}
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
        </div>
      </div>
      <table className="candidate-table">
        <thead>
          <tr>
            <th>Profile</th>
            <th>Employee Name</th>
            <th>Email Address</th>
            <th>Phone Number</th>
            <th>Position</th>
            <th>Department</th>
            <th>Date of Joining</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>
                <div className="profile-cell">
                  <img
                    src={
                      employee.pic
                        ? `${BACKEND_API}/${employee.pic}`
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s"
                    }
                    alt={employee.e_name}
                    width={40}
                    height={40}
                    className="profile-image"
                  />
                </div>
              </td>
              <td>{employee.e_name}</td>
              <td>{employee.e_email}</td>
              <td>{employee.e_phone}</td>
              <td>{employee.e_dept}</td>
              <td>
                <span className="department-tag">{employee.e_dept}</span>
              </td>
              <td>{new Date(employee.e_joiningdate)?.toLocaleString()}</td>
              <td>
                <CustomMenu
                  open={menu === employee._id}
                  button={
                    <button
                      onClick={() =>
                        menu === employee._id
                          ? setMenu(null)
                          : setMenu(employee._id)
                      }
                      className="edit-button"
                    >
                      <MoreVertical color="gray" size={20} />
                    </button>
                  }
                >
                  <li
                    className="menu-item"
                    onClick={() => handleEdit(employee)}
                  >
                    Edit
                  </li>
                  <li
                    className="menu-item"
                    onClick={() => handleDelete(employee._id)}
                  >
                    Delete
                  </li>
                </CustomMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <CustomModal open={!!editEmployee} onClose={() => setEditEmployee(null)}>
        <ModalHeading onClose={() => setEditEmployee(null)}>
          Edit Employee Details
        </ModalHeading>
        <div className="modal-body" id="addCandidateForm">
          <div className="flex-row-wrap">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <label htmlFor="">User Photo</label>
              <input
                type="file"
                className="input-primary"
                name="pic"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
            <input
              type="text"
              className="input-primary"
              name="e_name"
              value={employeeForm.e_name}
              onChange={handleFormChange}
              placeholder="Full Name"
            />
            <input
              type="email"
              className="input-primary"
              name="e_email"
              value={employeeForm.e_email}
              onChange={handleFormChange}
              placeholder="Email Address"
            />
            <input
              type="tel"
              className="input-primary"
              name="e_phone"
              value={employeeForm.e_phone}
              onChange={handleFormChange}
              placeholder="Phone Number"
            />
            <input
              type="text"
              className="input-primary"
              name="e_position"
              value={employeeForm.e_position}
              onChange={handleFormChange}
              placeholder="Position"
            />
            <input
              type="text"
              className="input-primary"
              name="e_dept"
              value={employeeForm.e_dept}
              onChange={handleFormChange}
              placeholder="Department"
            />
            <input
              type="date"
              className="input-primary"
              name="e_joiningdate"
              value={employeeForm.e_joiningdate}
              onChange={handleFormChange}
              placeholder="Date of Joining"
            />
          </div>
          <CustomButton onClick={handleUpdate}>Save</CustomButton>
        </div>
      </CustomModal>
    </div>
  );
};

export default Employees;
