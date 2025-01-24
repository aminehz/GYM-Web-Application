import { useState, useEffect } from "react";

import {
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
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from "@coreui/react";
import { toast, ToastContainer } from "react-toastify";
import CIcon from "@coreui/icons-react";
import { confirmAlert } from "react-confirm-alert";
import { cilTag } from "@coreui/icons";
import axios from "axios";
import { axiosHeader } from "src/Constante";

const MembershipManagement = () => {
  const [tableData, setTableData] = useState([]);
  const [visibleLg, setVisibleLg] = useState(false);
  const [visibleAddSubscriptionModal, setVisibleAddSubscriptionModal] =
    useState(false);
  const [subscriptionList, setSubscriptionList] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState(null);
  const [dateAbonnement, setDateAbonnement] = useState("");
  const [dateExpiration, setDateExpiration] = useState("");
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/users", axiosHeader)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/subscription", axiosHeader)
      .then((response) => {
        setSubscriptionList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching subscription data:", error);
      });
  }, []);
  const formatDate = (date) => {
    const formattedDate = new Date(date).toISOString().slice(0, 10);
    return formattedDate;
  };
  useEffect(() => {
    axios
      .get("http://localhost:8080/membership", axiosHeader)
      .then((response) => {
        setTableData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleFormSubmit = () => {
    const membershipData = {
      dateAbonnement: formatDate(dateAbonnement),
      dateExpiration: formatDate(dateExpiration),
    };
    axios
      .post(
        `http://localhost:8080/addMembership/${selectedUserId}/${selectedSubscriptionId}`,
        membershipData,
        axiosHeader
      )
      .then((response) => {
        console.log("Subscription updated successfully:", response.data);
        setVisibleLg(false);
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  const confirmDelete = (membershipId) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this user?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteMembership(membershipId),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const deleteMembership = (membershipId) => {
    axios
      .delete(
        `http://localhost:8080/deleteMembership/${membershipId}`,
        axiosHeader
      )
      .then((response) => {
        const updatedTableData = tableData.filter(
          (item) => item.idMemebership !== membershipId
        );
        setTableData(updatedTableData);
        toast.success("Membership deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting membership:", error);
        toast.error("Failed to delete membership");
      });
  };
  const userData = JSON.parse(localStorage.getItem("user"));
  const userRole = userData?.roles[0]?.role || "";

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardBody>
              {userRole === "ADMIN" && (
                <CButton
                  color="primary"
                  className="m-2"
                  onClick={() => setVisibleLg(true)}
                >
                  Add Membership
                </CButton>
              )}

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilTag} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>date Subscription</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">
                      date Expiration
                    </CTableHeaderCell>
                    <CTableHeaderCell>Member </CTableHeaderCell>
                    <CTableHeaderCell>Subscription</CTableHeaderCell>
                    {userRole === "ADMIN" && (
                      <CTableHeaderCell className="text-center">
                        Action
                      </CTableHeaderCell>
                    )}
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableData?.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell className="text-center">
                        <div>{item.idMemebership}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.dateAbonnement}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.dateExpiration}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>
                          {item.appUserDTO
                            ? item.appUserDTO.username
                            : "No Member"}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>
                          {item.subscriptionDTO
                            ? item.subscriptionDTO.duree
                            : "No subcription"}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {userRole === "ADMIN" && (
                          <CButton
                            color="danger"
                            onClick={() => confirmDelete(item.idMemebership)}
                          >
                            Delete
                          </CButton>
                        )}
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
        onClose={() => setVisibleLg(false)}
        aria-labelledby="AddSubscriptionModal"
      >
        <CModalHeader>
          <CModalTitle id="AddSubscriptionModal">Add Subscription</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CDropdown>
              <CDropdownToggle color="secondary">Select User</CDropdownToggle>
              <CDropdownMenu>
                {users.map((user, idx) => (
                  <CDropdownItem
                    key={idx}
                    onClick={() => setSelectedUserId(user.idUser)}
                    value={user.idUser}
                  >
                    {user.username}
                  </CDropdownItem>
                ))}
              </CDropdownMenu>
            </CDropdown>

            <CDropdown>
              <CDropdownToggle color="secondary">
                Select Subscription
              </CDropdownToggle>
              <CDropdownMenu>
                {subscriptionList.map((subscription, idx) => (
                  <CDropdownItem
                    key={idx}
                    onClick={() =>
                      setSelectedSubscriptionId(subscription.idAbonnement)
                    }
                    value={subscription.idAbonnement}
                  >
                    {subscription.duree}
                  </CDropdownItem>
                ))}
              </CDropdownMenu>
            </CDropdown>
            <CFormInput
              type="date"
              value={dateAbonnement}
              onChange={(e) => setDateAbonnement(e.target.value)}
              placeholder="Date Abonnement"
            />
            <CFormInput
              type="date"
              value={dateExpiration}
              onChange={(e) => setDateExpiration(e.target.value)}
              placeholder="Date Expiration"
            />
            <CButton color="primary" onClick={handleFormSubmit}>
              Add Subscription
            </CButton>
          </CForm>
        </CModalBody>
      </CModal>
      <ToastContainer />
    </>
  );
};

export default MembershipManagement;
