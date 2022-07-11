import {useState, useEffect, useContext} from "react";
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
import DashboardLayout from "../../components/layout/dashboardLayout";
import DashboardHeader from "../../components/header/dashboardHeader";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import LoginContext from "../../contexts/loginContext";

const prisma = new PrismaClient();

// get all user from db for currentUser validation
// get all electricity-rent-water to get unpayed data
export async function getServerSideProps() {
  const users = await prisma.user.findMany()
  const electricities = await prisma.electricity.findMany();
  const rents = await prisma.rent.findMany();
  const waters = await prisma.water.findMany();

  return {
    props: {
      users,
      electricities,
      rents,
      waters
    }
  }
}

function Dashboard({users, electricities, rents, waters}) {
  const router = useRouter();
  //states and variables for check and set logged user
  const {login, setLogin, loggedUser, setLoggedUser , setProfile} = useContext(LoginContext);   //states for check loggedUser and profile data
  let usernames, currentUser, payments;
  //states for store unpayed electricity-rent-water later
  const [electricity, setElectricity] = useState([]);
  const [water, setWater] = useState([]);
  const [rent, setRent] = useState([]);

  // get unpayed data
  function getNotPayed(id){
    fetch('/api/payment')
    .then(res => res.json())
    .then(paymentFromDB => {
        payments = paymentFromDB.filter(pay => pay.user_id === id); //select data with current user id
      })
      .then(()=>{
        //select data with current payment id
        const paymentsId = payments.map(py => py.id);

        const getElectricity = electricities.filter(el => paymentsId.indexOf(el.payment_id) !== -1);
        const getWater = waters.filter(wt => paymentsId.indexOf(wt.payment_id) !== -1);
        const getRent = rents.filter(rt => paymentsId.indexOf(rt.payment_id) !== -1);
        //select unpayed data
        const unpayedElectric = getElectricity.filter(el => el.payment_status === 0);
        const unpayedWater = getWater.filter(wt => wt.payment_status === 0);
        const unpayedRent = getRent.filter(rt => rt.payment_status === 0);
        
        setElectricity(unpayedElectric);
        setWater(unpayedWater);
        setRent(unpayedRent);
      })
  }

  //redirect to home if user not logged in and try to access dashboard from url
  useEffect(() => {
    if(loggedUser){
      usernames = users.map(user => user.username);
      currentUser = users.find(user => user.username === loggedUser);

      setProfile(currentUser);
      getNotPayed(currentUser.id);
    }
    if(localStorage.getItem("loggedUser")){
      usernames = users.map(user => user.username);
      if (usernames.includes(localStorage.getItem("loggedUser"))){
        setLogin(true);

        const getLocalStorageUser = localStorage.getItem("loggedUser");
        setLoggedUser(getLocalStorageUser);
        currentUser = users.find(user => user.username === getLocalStorageUser);

        setProfile(currentUser);
        getNotPayed(currentUser.id);
      }
    }
    else if(login === false) router.push('/');
  }, []);
  
  
  return (
    <DashboardLayout>
      <DashboardHeader page="Dashboard" >
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href="/dashboard">
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </DashboardHeader>
      <main className="mt-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold">Halo {currentUser ? currentUser.name : loggedUser}</h1>
        <h2 className="text-2xl font-semibold">Selamat datang di dashboard</h2>
        <div className="relative w-[80%] h-[300px] overflow-y-scroll">
        <TableContainer my={5}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Tagihan</Th>
                <Th>Bulan</Th>
                <Th>Status</Th>
                <Th isNumeric>Total Pembayaran</Th>
                <Th isNumeric>Sudah Dibayar</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {electricity.map(el => (
                <Tr>
                <Td>{Object.keys(el)[5].split("_")[0]}</Td>
                <Td>{el.electricity_periode}</Td>
                <Td color="red">Belum lunas</Td>
                <Td isNumeric>Rp.{el.electric_price}</Td>
                <Td isNumeric>Rp.{el.electricity_payed}</Td>
                <Td>
                  <Button
                    size="sm"
                    backgroundColor="#222"
                    color="white"
                    onClick={() => router.push(`/dashboard/payment/${Object.keys(el)[5].split("_")[0]}/pay`)}
                  >
                    Bayar
                  </Button>
                </Td>
              </Tr>
              ))}
              {rent.map(rt => (
                <Tr>
                <Td>{Object.keys(rt)[3].split("_")[0]}</Td>
                <Td>{rt.rent_periode}</Td>
                <Td color="red">Belum lunas</Td>
                <Td isNumeric>Rp.{rt.rent_prices}</Td>
                <Td isNumeric>Rp.{rt.rent_payed}</Td>
                <Td>
                  <Button
                    size="sm"
                    backgroundColor="#222"
                    color="white"
                    onClick={() => router.push(`/dashboard/payment/${Object.keys(rt)[3].split("_")[0]}/pay`)}
                  >
                    Bayar
                  </Button>
                </Td>
              </Tr>
              ))}
              {water.map(wt => (
                <Tr>
                <Td>{Object.keys(wt)[3].split("_")[0]}</Td>
                <Td>{Object.values(wt)[3]}</Td>
                <Td color="red">Belum lunas</Td>
                <Td isNumeric>Rp.{Object.values(wt)[4]}</Td>
                <Td isNumeric>Rp.{Object.values(wt)[5]}</Td>
                <Td>
                  <Button
                    size="sm"
                    backgroundColor="#222"
                    color="white"
                    onClick={() => router.push(`/dashboard/payment/${Object.keys(wt)[3].split("_")[0]}/pay`)}
                  >
                    Bayar
                  </Button>
                </Td>
              </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        </div>
        <div className="mt-5 flex gap-5">
          <Button
            backgroundColor='#222' color='#fff'
            onClick={() => router.push("/dashboard/payment")}
          >
            Lihat pembayaran
          </Button>
          <Button
            colorScheme="blackAlpha"
            variant="outline"
            onClick={() => router.push("/daftar")}
          >
            Buat akun
          </Button>
        </div>
      </main>
    </DashboardLayout>
  );
}

export default Dashboard;
