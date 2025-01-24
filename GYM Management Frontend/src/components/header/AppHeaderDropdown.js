import React from "react";
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CForm,
} from "@coreui/react";
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";

import avatar8 from "./../../assets/images/avatars/8.jpg";
import axios from "axios";

const AppHeaderDropdown = () => {
  const handleLogoutClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:8080/logout");
      localStorage.setItem("token", "");
      localStorage.setItem("user", "");
      localStorage.setItem("userRole", "");
      console.log("Logout successful", response.data);
      window.location.href= "#/login";
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const userData= JSON.parse(localStorage.getItem("user")) || {};
  const avatarUrl = userData.avatar || avatar8;
 

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={`http://localhost:8080/photos/${avatarUrl}`} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">
          Account
        </CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>

        <CDropdownDivider />

        <CDropdownItem onClick={handleLogoutClick}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
