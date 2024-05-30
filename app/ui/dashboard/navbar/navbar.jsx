"use client";
import React, { useState } from "react";
import styles from "./navbar.module.css";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import styles2 from "../navbar/sidebar/sidebar.module.css";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
// popover
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Button } from "@nextui-org/react";
import { MdLogout } from "react-icons/md";
import { IoPerson } from "react-icons/io5";

const Navbar = () => {
  const pathname = usePathname();
  let router = useRouter();
  // Logout Functionality
  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  // popover
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className={styles.container}>
      <div className={styles.title}>{pathname.split("/").pop()}</div>
      <div className={styles.menu}>
        <div className={styles.icons}>
          <Badge badgeContent={4} color="primary">
            <MailIcon color="success" />
          </Badge>
        </div>
        <div className={`${styles2.user}`}>
          {/* popover start here */}
          <div
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
            className={styles.popovercontainer}
          >
            <Image
              className={styles2.userImage}
              src="/noavatar.png"
              alt=""
              width="50"
              height="50"
            />
            <div className={styles2.userDetail}>
              <span className={styles2.username}>Anitha</span>
              <span className={styles2.userTitle}>Administrator</span>
            </div>
          </div>
          <Popover
            width="100%"
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography sx={{ p: 2 }}>
              <div className={`${styles2.user}`}>
                <Image
                  className={styles2.userImage}
                  src="/noavatar.png"
                  alt=""
                  width="50"
                  height="50"
                />
                <div className={styles2.userDetail}>
                  <span className={styles2.username}>Anitha</span>
                  <span className={styles2.userTitle}>Administrator</span>
                </div>
              </div>
              <hr />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  gap: "10px",
                  margin: "10px",
                }}
              >
                <Button
                  style={{
                    border: "none",
                    padding: "10px",
                    fontWeight: "bold",
                    alignItems: "center",
                    textAlign: "center",
                    cursor: "pointer",
                    maring: "10px",
                    borderRadius: "10px",
                  }}
                  onClick={logout}
                >
                  <MdLogout sx={{ fontWeight: "20px", padding: "5px" }} />
                  Log out
                </Button>

                <Button
                  style={{
                    borderRadius: "10px",
                    padding: "10px",
                    maring: "10px",
                    fontWeight: "bold",
                    alignItems: "center",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => router.push("/dashboard/account")}
                >
                  <IoPerson sx={{ fontWeight: "20px", padding: "5px" }} />
                  Profile
                </Button>
              </div>
            </Typography>
          </Popover>

          {/* popover end here */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
