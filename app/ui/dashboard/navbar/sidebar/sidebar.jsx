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
} from "react-icons/md";
import { FaAppStoreIos } from "react-icons/fa6";
import MenuLink from "./menuLink/menuLink";
import { IoChatboxEllipses } from "react-icons/io5";


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
        title: "Installations",
        path: "/dashboard/installations",
        icon: <MdShoppingBag />,
      },
      {
        title: "Service Calls",
        path: "/dashboard/service",
        icon: <MdAttachMoney />,
      },
      {
        title:"Product",
        path:"/dashboard/product",
        icon:<FaAppStoreIos />,
      },
      {
        title:"Service Reminder",
        path:"/dashboard/reminder",
        icon:<IoChatboxEllipses />,
      },
      {
        title: "Service Engineers",
        path: "/dashboard/serviceEngineer",
        icon: <MdSupervisedUserCircle />,
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
    title: "Leads",
    list: [
      {
        title: "Lead",
        path: "/dashboard/lead",
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
        <h4>Aqua Supreme Pure</h4>
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
