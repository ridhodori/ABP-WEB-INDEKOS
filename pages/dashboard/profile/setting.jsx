import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  useToast
} from "@chakra-ui/react";
import Router from "next/router";
import Link from "next/link";
import DashboardHeader from "../../../components/header/dashboardHeader";
import DashboardLayout from "../../../components/layout/dashboardLayout";
import {useState, useEffect, useContext} from "react";
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

function Setting({users}) {
  const toast = useToast();
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
      else Router.push('/');
    }
    else if(login === false) Router.push('/');
  }, []);

  //pass edited profile data to api
  async function submitChange() {
    const response = await fetch('/api/user/editProfile', {
      method : 'POST',
      body : JSON.stringify(profile),
    });
    
    if(!response.ok) throw new Error(response.statusText);

    toast({
      title: 'data terubah',
      status: "success",
      isClosable: true,
    });

    Router.push('/dashboard/profile');   //redirect page to profile

    return await response.json();
  }

  return (
    <DashboardLayout>
      <DashboardHeader page="Profile Setting">
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
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href="/dashboard/profile/setting">
              Profile Setting
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </DashboardHeader>
      <main className="mt-5 mr-10 p-5 rounded-lg bg-slate-100">
        <h1 className="text-xl">Profile Setting</h1>
        <ul className="flex flex-col gap-2">
          <li>
            <strong>Email:</strong>
          </li>
          <li>
            <Input type="email" placeholder="Email" value={profile.email} onChange={e => setProfile({...profile, email : e.target.value})} />
          </li>
          <li>
            <strong>nama:</strong>
          </li>
          <li>
            <Input type="text" placeholder="Nama" value={profile.name} onChange={e => setProfile({...profile, name : e.target.value})}/>
          </li>
          <li>
            <strong>Phone:</strong>
          </li>
          <li>
            <InputGroup>
              <InputLeftAddon>+62</InputLeftAddon>
              <Input type="number" placeholder="Phone" value={profile.phone_num} onChange={e => setProfile({...profile, phone_num : e.target.value})}/>
            </InputGroup>
          </li>
          <li>
            <strong>Address:</strong>
          </li>
          <li>
            <Input type="text" placeholder="Address" value={profile.address} onChange={e => setProfile({...profile, address : e.target.value})}/>
          </li>
        </ul>
        <Button mt={5} backgroundColor='#222' color='#fff' onClick={() => submitChange() }>Submit Change</Button>
      </main>
    </DashboardLayout>
  );
}

export default Setting;
