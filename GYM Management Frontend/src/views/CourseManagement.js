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
import { AUTH_TOKEN, axiosHeader } from "src/Constante";

const CourseManagement = () => {
  const [tableData, setTableData] = useState([]);
  const [visibleLg, setVisibleLg] = useState(false);
  const [VisibleTrainerModal, setVisibleTrainerModal] = useState(false);
  const [visibleAddMemberModal, setVisibleAddMemberModal] = useState(false);
  const [filteredTrainers, setFilteredTrainers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [selectedTrainerId, setSelectedTrainerId] = useState("");
  const [selectedCourseID_test, setSelectedCourseID] = useState("");
  const [selectedMemberIdCourse, setSelectedMemberIdCourse] = useState("");
  const [selectedCourseIdForAddMember, setSelectedCourseIdForAddMember] =
    useState("");
  const [visibleAddCourseModal, setVisibleAddCourseModal] = useState(false);
  const [newCourse, setNewCourse] = useState({ nom: "", horaire: "" });

  const userData = JSON.parse(localStorage.getItem("user"));
  const userRole = userData?.roles[0]?.role || "";

  useEffect(() => {
    const hasReloaded = sessionStorage.getItem("hasReloaded");

    if (!hasReloaded) {
      sessionStorage.setItem("hasReloaded", "true");
      window.location.reload();
    }
  }, []);


  const handleAddCourse = () => {
    axios
      .post("http://localhost:8080/addCourse", newCourse, axiosHeader)
      .then((response) => {
        console.log("Course added successfully:", response.data);
        setVisibleAddCourseModal(false);
      })
      .catch((error) => {
        console.error("Error adding course:", error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/courses", axiosHeader)
      .then((response) => {
        if (userRole === "ADMIN") {
          setTableData(response.data);
        } else {
          const userIdFromLocalStorage = userData?.idUser;
          const filteredCourses = response.data.filter((course) =>
            course.appUserList.some(
              (user) => user.idUser === userIdFromLocalStorage
            )
          );
          setTableData(filteredCourses);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });
  console.log(tableData);
  useEffect(() => {
    axios
      .get("http://localhost:8080/users", axiosHeader)
      .then((response) => {
        const trainers = response.data.filter((user) =>
          user.roles.includes("TRAINER")
        );
        const members = response.data.filter((user) =>
          user.roles.includes("MEMBER")
        );
        setFilteredTrainers(trainers);

        setFilteredMembers(members);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const [selectedCourseId, setselectedCourseId] = useState(null);
  const [formValues, setFormValues] = useState({
    nom: "",
    horaire: "",
    appUser: "",
    appUserList: "",
  });

  const openModal = (courseId) => {
    setselectedCourseId(courseId);

    axios
      .get(`http://localhost:8080/course/${courseId}`, axiosHeader)
      .then((response) => {
        const courseData = response.data;

        setFormValues({
          nom: courseData.nom,
          horaire: courseData.horaire,
          appUser: courseData.appUser,
          appUserList: courseData.appUserList,
        });
        setVisibleLg(true);
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
      });
  };
  const handleFormSubmit = () => {
    axios
      .put(
        `http://localhost:8080/updateCourse/${selectedCourseId}`,
        formValues,
        axiosHeader
      )
      .then((response) => {
        console.log("course updated successfully:", response.data);
        setVisibleLg(false);
      })
      .catch((error) => {
        console.error("Error updating course data:", error);
      });
  };

  const handleFormAddTrainer = () => {
    console.log("trainer", selectedTrainerId);
    console.log("course", selectedCourseID_test);
    axios
      .post(
        `http://localhost:8080/addTrainerToCourse/${selectedTrainerId}/${selectedCourseID_test}`,
        {},
        axiosHeader
      )
      .then((response) => {
        console.log("Trainer added successfully:", response.data);
        setVisibleTrainerModal(false);
      })
      .catch((error) => {
        console.error("Error updating course data:", error);
      });
  };

  const handleFormAddMember = () => {
    axios
      .post(
        `http://localhost:8080/addMemberToCourse/${selectedMemberIdCourse}/${selectedCourseIdForAddMember}`,
        {},
        axiosHeader
      )
      .then((response) => {
        console.log("Member added successfully:", response);
        setVisibleAddMemberModal(false);
      })
      .catch((error) => {
        console.error("Error adding member to the course:", error);
      });
  };

  const confirmDelete = (courseId) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this course?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteCourse(courseId),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const deleteCourse = (courseId) => {
    axios
      .delete(`http://localhost:8080/deleteCourse/${courseId}`, axiosHeader)
      .then((response) => {
        const updatedTableData = tableData.filter(
          (item) => item.idCourse !== courseId
        );
        setTableData(updatedTableData);
        toast.success("course deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting course:", error);
        toast.error("Failed to delete course");
      });
  };

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardBody>
              {userRole === "ADMIN" && (
                <>
                  <CButton
                    color="primary"
                    className="m-2"
                    onClick={() => setVisibleTrainerModal(true)}
                  >
                    Select Trainer
                  </CButton>
                  <CButton
                    color="primary"
                    onClick={() => setVisibleAddMemberModal(true)}
                  >
                    Add Member List
                  </CButton>
                  <CButton
                    color="success"
                    className="m-2"
                    onClick={() => setVisibleAddCourseModal(true)}
                  >
                    Add New Course
                  </CButton>
                </>
              )}

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilTag} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>Course Name</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">
                      Time
                    </CTableHeaderCell>
                    <CTableHeaderCell className="text-center">
                      Trainer Name
                    </CTableHeaderCell>
                    {userRole === "ADMIN" && (
                      <CTableHeaderCell className="text-center">
                        Members
                      </CTableHeaderCell>
                    )}

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
                        <div>{item.idCourse}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.nom}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.horaire}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>
                          {item.appUser ? item.appUser.username : "No Trainer"}
                        </div>
                      </CTableDataCell>
                      {userRole === "ADMIN" && (
                        <CTableDataCell>
                          {item.appUserList ? (
                            <CDropdown>
                              <CDropdownToggle color="secondary">
                                List of Participant
                              </CDropdownToggle>
                              <CDropdownMenu>
                                {item.appUserList.map((user, idx) => (
                                  <CDropdownItem
                                    key={idx}
                                    href="#"
                                    value={user.idUser}
                                  >
                                    {user.username}
                                  </CDropdownItem>
                                ))}
                              </CDropdownMenu>
                            </CDropdown>
                          ) : (
                            <div>No Members</div>
                          )}
                        </CTableDataCell>
                      )}

                      {userRole === "ADMIN" && (
                        <CTableDataCell className="text-center">
                          <CButton
                            color="success"
                            className="m-2"
                            onClick={() => openModal(item.idCourse)}
                          >
                            Edit
                          </CButton>
                          <CButton
                            color="danger"
                            onClick={() => confirmDelete(item.idCourse)}
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
        onClose={() => {
          setVisibleLg(false);
          setselectedCourseId(null);
        }}
        aria-labelledby="OptionalSizesExample2"
      >
        <CModalHeader>
          <CModalTitle id="OptionalSizesExample2">Update Course</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleFormSubmit}>
            <CFormInput
              type="datetime-local"
              id="courseTime"
              label="Course Time"
              placeholder="Select course time"
              value={formValues.horaire}
              onChange={(e) =>
                setFormValues({ ...formValues, horaire: e.target.value })
              }
            />
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              label="Name of Course"
              value={formValues.nom}
              placeholder="Name of Course"
              text="Must be 8-20 characters long."
              aria-describedby="exampleFormControlInputHelpInline"
              onChange={(e) =>
                setFormValues({ ...formValues, nom: e.target.value })
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
        visible={VisibleTrainerModal}
        onClose={() => {
          setVisibleTrainerModal(false);
        }}
        aria-labelledby="OptionalSizesExample2"
      >
        <CModalHeader>
          <CModalTitle id="OptionalSizesExample2">Add Trainer</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleFormAddTrainer}>
            <CDropdown>
              <CDropdownToggle color="secondary">
                Select Trainer
              </CDropdownToggle>
              <CDropdownMenu>
                {filteredTrainers.map((trainer, idx) => (
                  <CDropdownItem
                    key={idx}
                    onClick={() => setSelectedTrainerId(trainer.idUser)}
                    value={trainer.idUser}
                  >
                    {trainer.username}
                  </CDropdownItem>
                ))}
              </CDropdownMenu>
            </CDropdown>

            <CDropdown>
              <CDropdownToggle color="secondary">Select Course</CDropdownToggle>
              <CDropdownMenu>
                {tableData?.map((course, idx) => (
                  <CDropdownItem
                    key={idx}
                    onClick={() => setSelectedCourseID(course.idCourse)}
                    value={course.idCourse}
                  >
                    {course.nom}
                  </CDropdownItem>
                ))}
              </CDropdownMenu>
            </CDropdown>

            <CButton color="primary" type="submit">
              Update
            </CButton>
          </CForm>
        </CModalBody>
      </CModal>

      <CModal
        size="lg"
        visible={visibleAddMemberModal}
        onClose={() => {
          setVisibleAddMemberModal(false);
        }}
        aria-labelledby="AddMemberToCourseModal"
      >
        <CModalHeader closeButton>
          <CModalTitle id="AddMemberToCourseModal">
            Add Member to Course
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleFormAddMember}>
            <CDropdown>
              <CDropdownToggle color="secondary">Select Member</CDropdownToggle>
              <CDropdownMenu>
                {filteredMembers.map((member, idx) => (
                  <CDropdownItem
                    key={idx}
                    onClick={() => setSelectedMemberIdCourse(member.idUser)}
                    value={member.idUser}
                  >
                    {member.username}
                  </CDropdownItem>
                ))}
              </CDropdownMenu>
            </CDropdown>

            <CDropdown>
              <CDropdownToggle color="secondary">Select Course</CDropdownToggle>
              <CDropdownMenu>
                {tableData?.map((course, idx) => (
                  <CDropdownItem
                    key={idx}
                    onClick={() =>
                      setSelectedCourseIdForAddMember(course.idCourse)
                    }
                    value={course.idCourse}
                  >
                    {course.nom}
                  </CDropdownItem>
                ))}
              </CDropdownMenu>
            </CDropdown>

            <CButton color="primary" type="submit">
              Add Member to Course
            </CButton>
          </CForm>
        </CModalBody>
      </CModal>

      <CModal
        size="lg"
        visible={visibleAddCourseModal}
        onClose={() => setVisibleAddCourseModal(false)}
        aria-labelledby="AddCourseModal"
      >
        <CModalHeader closeButton>
          <CModalTitle id="AddCourseModal">Add New Course</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm
            onSubmit={(e) => {
              e.preventDefault();
              handleAddCourse();
            }}
          >
            <CFormInput
              type="text"
              id="courseName"
              label="Course Name"
              placeholder="Enter course name"
              value={newCourse.nom}
              onChange={(e) =>
                setNewCourse({ ...newCourse, nom: e.target.value })
              }
            />
            <CFormInput
              type="datetime-local"
              id="courseTime"
              label="Course Time"
              placeholder="Select course time"
              value={newCourse.horaire}
              onChange={(e) =>
                setNewCourse({ ...newCourse, horaire: e.target.value })
              }
            />

            <CButton color="primary" type="submit">
              Add Course
            </CButton>
          </CForm>
        </CModalBody>
      </CModal>

      <ToastContainer />
    </>
  );
};

export default CourseManagement;
