import { Button } from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useContext } from "react";
import Layout from "../components/layout";
import About from "../components/pages/main/about";
import FirstSlider from "../components/pages/main/firstSlider";
import LoginContext from "../contexts/loginContext";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//get all user from db for validation
export async function getServerSideProps() {
  const users = await prisma.user.findMany()
  
  return {
    props: {
      users
    }
  }
}

export default function Home({users}) {
  //state to check logged user
  const {setLogin, loggedUser, setLoggedUser, setProfile} = useContext(LoginContext);
  const usernames = users.map(user => user.username);
  //set currentUser state for profile page to loggedUser
  const currentUser = users.find(user => user.username === loggedUser);
  setProfile(currentUser);

  //check if user already logged in with localStorage
  useEffect(() => {
    if(localStorage.getItem("loggedUser") && usernames.includes(localStorage.getItem("loggedUser"))){
      setLogin(true);
      setLoggedUser(localStorage.getItem("loggedUser"));
      setProfile(currentUser);
    }
  }, []);

  return (
    <>
      <Head>
        <title>InTheKost</title>
      </Head>
      <Layout>
        <FirstSlider />
        <About />
      </Layout>
    </>
  );
}
