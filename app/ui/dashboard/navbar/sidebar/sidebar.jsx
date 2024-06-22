"use client";
import React, { useEffect, useState } from "react";
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
import { FaBars } from "react-icons/fa";
import { findingUser } from "@/service";
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
        title: "Service Reminder",
        path: "/dashboard/reminder",
        icon: <IoChatboxEllipses />,
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
    title: "Product",
    list: [
      {
        title: "Product",
        path: "/dashboard/product",
        icon: <FaAppStoreIos />,
      },
    ],
  },
  {
    title: "Spares",
    list: [
      {
        title: "Spares",
        path: "/dashboard/spares",
        icon: <FaAppStoreIos />,
      },
    ],
  },

  {
    title: "Service Engineers",
    list: [
      {
        title: "Service Engineers",
        path: "/dashboard/serviceEngineer",
        icon: <MdSupervisedUserCircle />,
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
    title: "Area",
    list: [
      {
        title: "Area",
        path: "/dashboard/area",
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
const ServiceEngineermenuItems = [
  {
    title: "Pages",
    list: [
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
  // {
  //   title: "Spares",
  //   list: [
  //     {
  //       title:"Spares",
  //       path:"/dashboard/spares",
  //       icon:<FaAppStoreIos />,
  //     },
  //   ],
  // },
];

const Sidebar = () => {
  let router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  // user type
  const [usertype, setUserType] = useState("Service Engineer");

  useEffect(() => {
    async function findUser() {
      let token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return null;
      }
      let res = await findingUser(token);
      if (res.type === "admin") {
        setUserType("Admin");
      } else if (res.type == "Owner") {
        setUserType("Owner");
      }
    }
    findUser();
  }, []);

  return (
    <>
      <button className={styles.hamburger} onClick={toggleSidebar}>
        <FaBars />
      </button>
      <div
        className={`${styles.overlay} ${isOpen ? styles.open : ""}`}
        onClick={toggleSidebar}
      ></div>
      <div className={`${styles.container} ${isOpen ? styles.open : ""}`}>
        <div className={styles.user}>
          <h4>Aqua Supreme Pure</h4>
        </div>
        <ul className={styles.list}>
          {usertype == "Service Engineer"
            ? ServiceEngineermenuItems.map((cat, idx) => (
                <li key={idx}>
                  <span className={styles.cat}>{cat.title}</span>
                  {cat.list.map((item, index) => (
                    <MenuLink item={item} key={index} />
                  ))}
                </li>
              ))
            : menuItems.map((cat, idx) => (
                <li key={idx}>
                  <span className={styles.cat}>{cat.title}</span>
                  {cat.list.map((item, index) => (
                    <MenuLink item={item} key={index} />
                  ))}
                </li>
              ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
