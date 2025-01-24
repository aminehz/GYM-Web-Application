import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilPeople,
  cilTask,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

// Get the current user data from localStorage
const userData = JSON.parse(localStorage.getItem("user"));
const userRole = userData?.roles[0]?.role || "";

// Log to check the role value
console.log("User Role:", userRole);

const _nav = [
  // If the user role is "ADMIN", show "User Management"
  ...(userRole === "ADMIN"
    ? [
        {
          component: CNavItem,
          name: "User Management",
          to: "/UserManagement",
          icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
        },
      ]
    : []),

  {
    component: CNavItem,
    name: "Course Management",
    to: "/CourseManagement",
    icon: <CIcon icon={cilTask} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Membership Management",
    to: "/MembershipManagement",
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Subscription Management",
    to: "/SubscriptionManagement",
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
];

// You can log _nav to ensure it contains the correct menu items
console.log(_nav);

export default _nav;
