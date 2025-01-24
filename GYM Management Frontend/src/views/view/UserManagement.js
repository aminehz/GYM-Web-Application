import { useState, useEffect } from "react";
import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CForm,
  CFormInput,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import { toast, ToastContainer } from "react-toastify";
import CIcon from "@coreui/icons-react";
import { confirmAlert } from "react-confirm-alert";
import { cilPeople } from "@coreui/icons";
import axios from "axios";
import { axiosHeader } from "src/Constante";

const UserManagement = () => {
  const [tableData, setTableData] = useState([]);
  const [visibleLg, setVisibleLg] = useState(false);
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [roles, setRoles] = useState([]);
  const [formUsers, setFormUsers] = useState({
    username: "",
    email: "",
    password: "",
    roles: [{ role: "" }],
  });

  const handleRoleChange = (role) => {
    setFormUsers((prevFormUsers) => ({
      ...prevFormUsers,
      roles: [{ role: role }],
    }));
  };

  const handleFormUser = (event) => {
    event.preventDefault();
    const formData = new FormData();
    // formData.append("username", formUsers.username)
    // formData.append("email", formUsers.email)
    // formData.append("password", formUsers.password)
    formData.append(
      "appuser",
      new Blob(
        [
          JSON.stringify({
            email: formUsers.email,
            username: formUsers.username,
            password: formUsers.password,
            roles: formUsers.roles,
          }),
        ],
        { type: "application/json" }
      )
    );
    formData.append("file", avatar);
    axios
      .post("http://localhost:8080/addUser", formData, axiosHeader)
      .then((response) => {
        console.log("New user added successfully:", response.data);
        setVisible(false);
        toast.success("User added successfully");
      })
      .catch((error) => {
        console.error("Error adding new user:", error);
        toast.error("Failed to add user");
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/users", axiosHeader)
      .then((response) => {
        setTableData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    axios
      .get("http://localhost:8080/getRoles", axiosHeader)
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });

  useEffect(() => {
    console.log(formUsers);
  }, [formUsers]);

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const openModal = (userId) => {
    setSelectedUserId(userId);

    axios
      .get(`http://localhost:8080/getUser/${userId}`, axiosHeader)
      .then((response) => {
        const userData = response.data;

        setFormValues({
          username: userData.username,
          email: userData.email,
          password: userData.password,
        });
        setVisibleLg(true);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };
  const handleFormSubmit = () => {
    axios
      .put(
        `http://localhost:8080/updateUser/${selectedUserId}`,
        formValues,
        axiosHeader
      )
      .then((response) => {
        console.log("User updated successfully:", response.data);
        setVisibleLg(false);
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };
  const confirmDelete = (userId) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this user?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteUser(userId),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const deleteUser = (userId) => {
    axios
      .delete(`http://localhost:8080/deleteUser/${userId}`, axiosHeader)
      .then((response) => {
        const updatedTableData = tableData.filter(
          (item) => item.idUser !== userId
        );
        setTableData(updatedTableData);
        toast.success("User deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete user");
      });
  };

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardBody>
              <CButton
                color="primary"
                className="m-2"
                onClick={() => setVisible(true)}
              >
                Add New User
              </CButton>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>Username</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">
                      id
                    </CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell>Role</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">
                      Action
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableData.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar
                          size="md"
                          src={
                            item.avatar
                              ? `http://localhost:8080/photos/${item.avatar}`
                              : "placeholder.jpg"
                          }
                          status={item.avatar ? item.avatar.status : ""}
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.username}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.idUser}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.email}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.roles}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CButton
                          color="success"
                          className="m-2"
                          onClick={() => openModal(item.idUser)}
                        >
                          Edit
                        </CButton>
                        <CButton
                          color="danger"
                          onClick={() => confirmDelete(item.idUser)}
                        >
                          Delete
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CModal
        size="lg"
        visible={visibleLg}
        onClose={() => {
          setVisibleLg(false);
          setSelectedUserId(null);
        }}
        aria-labelledby="OptionalSizesExample2"
      >
        <CModalHeader>
          <CModalTitle id="OptionalSizesExample2">Update Profil</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleFormSubmit}>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              label="Username"
              value={formValues.username}
              placeholder="username"
              text="Must be 8-20 characters long."
              aria-describedby="exampleFormControlInputHelpInline"
              onChange={(e) =>
                setFormValues({ ...formValues, username: e.target.value })
              }
            />
            <CFormInput
              type="email"
              id="exampleFormControlInput1"
              label="email"
              value={formValues.email}
              placeholder="email"
              text="Must be 8-20 characters long."
              aria-describedby="exampleFormControlInputHelpInline"
              onChange={(e) =>
                setFormValues({ ...formValues, email: e.target.value })
              }
            />
            <CFormInput
              type="password"
              id="exampleFormControlInput1"
              label="password"
              value={formValues.password}
              placeholder="password"
              text="Password"
              aria-describedby="exampleFormControlInputHelpInline"
              onChange={(e) =>
                setFormValues({ ...formValues, password: e.target.value })
              }
            />
            <CButton color="primary" type="submit">
              Update
            </CButton>
          </CForm>
        </CModalBody>
      </CModal>

      <CModal
        size="lg"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="AddUserModal"
      >
        <CModalHeader>
          <CModalTitle id="AddUserModal">Add User</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleFormUser}>
            <CFormInput
              type="text"
              label="Username"
              value={formUsers.username}
              placeholder="Username"
              onChange={(e) =>
                setFormUsers({ ...formUsers, username: e.target.value })
              }
            />
            <CFormInput
              type="email"
              label="Email"
              value={formUsers.email}
              placeholder="Email"
              onChange={(e) =>
                setFormUsers({ ...formUsers, email: e.target.value })
              }
            />
            <CDropdown>
              <CDropdownToggle color="secondary">Select Role</CDropdownToggle>
              <CDropdownMenu>
                {roles?.map((role, idx) => (
                  <CDropdownItem
                    key={idx}
                    onClick={(e) => handleRoleChange(role.role)}
                    value={role.role}
                  >
                    {role.role}
                  </CDropdownItem>
                ))}
              </CDropdownMenu>
            </CDropdown>

            <CFormInput
              type="password"
              label="Password"
              value={formUsers.password}
              placeholder="Password"
              onChange={(e) =>
                setFormUsers({ ...formUsers, password: e.target.value })
              }
            />
            <CFormInput
              type="file"
              label="Avatar"
              onChange={(e) => setAvatar(e.target.files[0])}
            />
            <CButton color="primary" type="submit">
              Add User
            </CButton>
          </CForm>
        </CModalBody>
      </CModal>

      <ToastContainer />
    </>
  );
};

export default UserManagement;
