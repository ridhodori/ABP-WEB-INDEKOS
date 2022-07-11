import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import {useState, useEffect, useContext} from "react";
import { PrismaClient } from "@prisma/client";
import LoginContext from "../../../../contexts/loginContext";
import DashboardHeader from "../../../../components/header/dashboardHeader";
import DashboardLayout from "../../../../components/layout/dashboardLayout";

const prisma = new PrismaClient();

// get all user from db for currentUser validation
// get all water data to show in table
export async function getServerSideProps() {
  const users = await prisma.user.findMany();
  const waters = await prisma.water.findMany();
  
  return {
    props: {
      users,
      waters
    }
  }
}

function Water({users, waters}) {
  const router = useRouter();
  //states and variables for check and set logged user
  const {login, setLogin, loggedUser, setLoggedUser, setProfile} = useContext(LoginContext);
  let payments, usernames, currentUser;
  //states for store water later
  const [water, setWater] = useState([]);
  
  // get water data
  function getWater(id){
    fetch('/api/payment')
      .then(res => res.json())
      .then(paymentFromDB => {
        //select payment with current user id
        payments = paymentFromDB.filter(pay => pay.user_id === id);
      })
      .then(()=>{
        //select water with current payment id
        const paymentsId = payments.map(py => py.id);
        setWater(waters.filter(wt => paymentsId.indexOf(wt.payment_id) !== -1));
      })
  }

  //redirect to home if user not logged in and try to access dashboard from url
  useEffect(() => {
    if(loggedUser){
      usernames = users.map(user => user.username);
      currentUser = users.find(user => user.username === loggedUser);

      setProfile(currentUser);
      getWater(currentUser.id);
    }
    else if(localStorage.getItem("loggedUser")){
      usernames = users.map(user => user.username);
      if (usernames.includes(localStorage.getItem("loggedUser"))){
        setLogin(true);

        const getLocalStorageUser = localStorage.getItem("loggedUser");
        setLoggedUser(getLocalStorageUser);
        currentUser = users.find(user => user.username === getLocalStorageUser);

        setProfile(currentUser);
        getWater(currentUser.id);
      }
      else router.push('/');
    }
    else if(login === false) router.push('/');
  }, []);
  
  return (
    <DashboardLayout>
      <DashboardHeader page="Water">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href="/dashboard">
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href="/dashboard/payment">
              Payment
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href="/dashboard/payment/water">
              Water
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </DashboardHeader>
      <main className="mt-5 mr-10 p-5 rounded-lg bg-slate-100">
        <h1 className="text-xl">History Pembayaran Air</h1>
        <TableContainer my={5}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Bulan</Th>
                <Th>Status</Th>
                <Th isNumeric>Total Pembayaran</Th>
                <Th isNumeric>Sudah Dibayar</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {water.map(wt => (
                <Tr>
                  <Td>{wt.water_periode}</Td>
                  <Td color={wt.payment_status ? "green" : "red"}>{wt.payment_status ? "Lunas" : "Belum lunas"}</Td>
                  <Td isNumeric>Rp.{wt.water_price}</Td>
                  <Td isNumeric>Rp.{wt.water_payed}</Td>
                  <Td>
                    <Button
                      size="sm"
                      backgroundColor="#222"
                      color="white"
                      onClick={() => router.push("/dashboard/payment/water/pay")}
                      disabled={wt.payment_status ? true : false}
                    >
                      {wt.payment_status ? "Lunas" : "Bayar"}
                    </Button>
                  </Td>
                </Tr>  
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </main>
    </DashboardLayout>
  );
}

export default Water;
