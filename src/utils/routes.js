import Candidates from "../pages/Candidates";
import Dashboard from "../pages/Dashboard";
import Employees from "../pages/Employees";
import Attendance from "../pages/Attendance";
import Leaves from "../pages/Leaves";
import { LucideAirVent, School, User, Users } from "lucide-react";

export const AppRoutes = [
  {
    title: "Candidates",
    hidden: true,
    children: [
      {
        label: "Candidates",
        path: "/candidates",
        index: true,
        component: Candidates,
        icon: User,
      },
    ],
  },
  {
    title: "Recruitment",
    children: [
      {
        label: "Candidates",
        path: "/candidates",
        component: Candidates,
        icon: User,
      },
    ],
  },
  {
    title: "Organization",
    children: [
      {
        label: "Employees",
        path: "/employees",
        component: Employees,
        icon: Users,
      },
      {
        label: "Attendance",
        path: "/attendance",
        component: Attendance,
        icon: School,
      },
      {
        label: "Leaves",
        path: "/leaves",
        component: Leaves,
        icon: LucideAirVent,
      },
    ],
  },
];

export const getLabelFromPath = (path) => {
  for (const route of AppRoutes) {
    if (route.children) {
      for (const child of route.children) {
        if (child.path === path) {
          return child.label;
        }
      }
    }
  }
  return null;
};
