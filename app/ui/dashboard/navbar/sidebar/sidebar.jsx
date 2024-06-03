"use client"
import React from "react";
import styles from "./sidebar.module.css";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdOutlineSettings,
  MdLogout,
} from "react-icons/md";
import MenuLink from "./menuLink/menuLink";
import Image from "next/image";
import { useRouter } from "next/navigation";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Customers",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Technician/Staff",
        path: "/dashboard/technicians",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Installations",
        path: "/dashboard/installations",
        icon: <MdShoppingBag />,
      },
      {
        title: "ServiceCalls",
        path: "/dashboard/service",
        icon: <MdAttachMoney />,
      },
    ],
  },
  {
    title: "Completed",
    list: [
      {
        title: "Service Completed",
        path: "/dashboard/completed/service",
        icon: <MdWork />,
      },
      {
        title: "Installation Completed",
        path: "/dashboard/completed/installation",
        icon: <MdWork />,
      },
    ],
  },
  {
    title: "Pending",
    list: [
      {
        title: "Service Pending",
        path: "/dashboard/pending/service",
        icon: <MdAnalytics />,
      },
      {
        title: "Installation Pending",
        path: "/dashboard/pending/installation",
        icon: <MdAnalytics />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Account",
        path: "/dashboard/account",
        icon: <MdOutlineSettings />,
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <div className={styles.container} >
      <div className={styles.user}>
        <h6>Aqua Supreme Pure</h6>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat, idx) => (
          <li key={idx} >
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item, index) => (
              <MenuLink item={item} key={index} />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
