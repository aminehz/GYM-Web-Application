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
} from "@coreui/react";
import { toast, ToastContainer } from "react-toastify";
import CIcon from "@coreui/icons-react";
import { confirmAlert } from "react-confirm-alert";
import { cilTag } from "@coreui/icons";
import axios from "axios";
import { axiosHeader } from "src/Constante";

const SubscriptionManagement = () => {
  const [tableData, setTableData] = useState([]);
  const [visibleLg, setVisibleLg] = useState(false);

  const [duree, setduree] = useState("");
  const [prix, setprix] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/subscription", axiosHeader)
      .then((response) => {
        setTableData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching subscription data:", error);
      });
  });

  const handleFormSubmit = () => {
    const subscriptionData = {
      duree: duree,
      prix: prix,
    };
    axios
      .post(
        `http://localhost:8080/addSubscription`,
        subscriptionData,
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

  const confirmDelete = (SubscriptionID) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this user?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteMembership(SubscriptionID),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const deleteMembership = (SubscriptionID) => {
    axios
      .delete(
        `http://localhost:8080/deleteSubscription/${SubscriptionID}`,
        axiosHeader
      )
      .then((response) => {
        const updatedTableData = tableData.filter(
          (item) => item.idAbonnement !== SubscriptionID
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
              {userRole  === "ADMIN" && (
                <CButton
                  color="primary"
                  className="m-2"
                  onClick={() => setVisibleLg(true)}
                >
                  Add Subscription
                </CButton>
              )}

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilTag} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>Subscription Duration</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">
                      Subscription prix
                    </CTableHeaderCell>
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
                        <div>{item.idAbonnement}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.duree}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.prix}</div>
                      </CTableDataCell>
                      {userRole === "ADMIN" && (
                        <CTableDataCell className="text-center">
                          <CButton
                            color="danger"
                            onClick={() => confirmDelete(item.idAbonnement)}
                          >
                            Delete
                          </CButton>
                        </CTableDataCell>
                      )}
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
            <CFormInput
              type="text"
              value={duree}
              onChange={(e) => setduree(e.target.value)}
              placeholder="Date Abonnement"
            />
            <CFormInput
              type="number"
              value={prix}
              onChange={(e) => setprix(e.target.value)}
              placeholder="Enter the subscription prix"
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

export default SubscriptionManagement;
