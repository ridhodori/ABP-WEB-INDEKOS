import {
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import DashboardHeader from "../../../components/header/dashboardHeader";
import DashboardLayout from "../../../components/layout/dashboardLayout";
import {useContext, useEffect} from "react";
import LoginContext from "../../../contexts/loginContext";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// get all user from db for currentUser validation
export async function getServerSideProps() {
  const users = await prisma.user.findMany()
  
  return {
    props: {
      users
    }
  }
}

function Profile({users}) {
  //states and variables for check and set logged user
  const {login, setLogin, loggedUser, setLoggedUser , profile, setProfile} = useContext(LoginContext);
  let usernames, currentUser;

  //check if user already logged in/logged user data in local storage
  //redirect to home if user not logged in and try to access dashboard from url
  useEffect(() => {
    if(loggedUser){
      usernames = users.map(user => user.username);
      currentUser = users.find(user => user.username === loggedUser);
      setProfile(currentUser);
    }
    else if(localStorage.getItem("loggedUser")){
      usernames = users.map(user => user.username);
      if (usernames.includes(localStorage.getItem("loggedUser"))){
        const getLocalStorageUser = localStorage.getItem("loggedUser");
        setLogin(true);
        setLoggedUser(getLocalStorageUser);
        currentUser = users.find(user => user.username === getLocalStorageUser);
        setProfile(currentUser);
      }
      else router.push('/');
    }
    else if(login === false) router.push('/');
  }, [])

  return (
    <DashboardLayout>
      <DashboardHeader page="Your Profile">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href="/dashboard">
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href="/dashboard/profile">
              Profile
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </DashboardHeader>
      <main className="mt-5 mr-10 p-5 rounded-lg bg-slate-100">
        <h1 className="text-xl">{profile.name}</h1>
        <Avatar my={5} size={"2xl"} name="N" />
        <h2 className="text-gray">Kostan nomor 5, Taman Niaga</h2>
        <br />
        <ul>
          <li>
            <strong>Email:</strong> <span>{profile.email}</span>
          </li>
          <li>
            <strong>Username:</strong> <span>{profile.username}</span>
          </li>
          <li>
            <strong>Phone:</strong> <span>{profile.phone_num}</span>
          </li>
          <li>
            <strong>Address:</strong>{" "}
            <span>{profile.address}</span>
          </li>
        </ul>
      </main>
    </DashboardLayout>
  );
}

export default Profile;
