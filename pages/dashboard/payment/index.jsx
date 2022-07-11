import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import LoginContext from "../../../contexts/loginContext";
import { PrismaClient } from "@prisma/client";
import DashboardHeader from "../../../components/header/dashboardHeader";
import DashboardLayout from "../../../components/layout/dashboardLayout";

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const users = await prisma.user.findMany();
  const electricities = await prisma.electricity.findMany();
  const waters = await prisma.water.findMany();
  const rents = await prisma.rent.findMany();
  
  return {
    props: {
      users,
      electricities,
      waters,
      rents
    }
  }
}

function Payment({users, electricities, waters, rents}) {
  const router = useRouter();

  const {login, setLogin, loggedUser, setLoggedUser, setProfile} = useContext(LoginContext);
  let usernames, currentUser;
  let payments, electricity, water,  rent;
  const [totalElectricity, setTotalElectricity] = useState(0);
  const [totalWater, setTotalWater] = useState(0);
  const [totalRent, setTotalRent] = useState(0);

  const [payedElectricity, setPayedElectricity] = useState(0);
  const [payedWater, setPayedWater] = useState(0);
  const [payedRent, setPayedRent] = useState(0);

  const [electricLunas, setElectricLunas] = useState(false);
  const [waterLunas, setWaterLunas] = useState(false);
  const [rentLunas, setRentLunas] = useState(false);

  function getPayment(id){
    fetch('/api/payment')
      .then(res => res.json())
      .then(paymentFromDB => {
        payments = paymentFromDB.filter(pay => pay.user_id === id);
      })
      .then(()=>{
        const paymentsId = payments.map(py => py.id);
        
        electricity = electricities.filter(el => paymentsId.indexOf(el.payment_id) !== -1);
        water = waters.filter(wt => paymentsId.indexOf(wt.payment_id) !== -1);
        rent = rents.filter(rt => paymentsId.indexOf(rt.payment_id) !== -1);

        const getTotalElectricity = electricity.map(el => el.electric_price).reduce((total, el) =>  total + el );
        const getTotalWater = water.map(wt => wt.water_price).reduce((total, wt) =>  total + wt );
        const getTotalRent = rent.map(rt => rt.rent_prices).reduce((total, rt) =>  total + rt );

        const getPayedElectricity = electricity.map(el => el.electricity_payed).reduce((total, el) =>  total + el )
        const getPayedWater = water.map(wt => wt.water_payed).reduce((total, wt) =>  total + wt )
        const getPayedRent = rent.map(rt => rt.rent_payed).reduce((total, rt) =>  total + rt )

        setTotalElectricity(getTotalElectricity);
        setTotalWater(getTotalWater);
        setTotalRent(getTotalRent);

        setPayedElectricity(getPayedElectricity);
        setPayedWater(getPayedWater);
        setPayedRent(getPayedRent);

        if (getTotalElectricity === getPayedElectricity) setElectricLunas(true);
        if (getTotalWater === getPayedWater) setWaterLunas(true);
        if (getTotalRent === getPayedRent) setRentLunas(true);
      })
      .catch(()=>{
        //jika gk ada data di db
        setTotalElectricity(0);
        setTotalWater(0);
        setTotalRent(0);

        setPayedElectricity(0);
        setPayedWater(0);
        setPayedRent(0);
      });
  }

  useEffect(() => {
    if(loggedUser){
      usernames = users.map(user => user.username);
      currentUser = users.find(user => user.username === loggedUser);

      setProfile(currentUser);
      getPayment(currentUser.id);
    }
    else if(localStorage.getItem("loggedUser")){
      usernames = users.map(user => user.username);
      if (usernames.includes(localStorage.getItem("loggedUser"))){
        setLogin(true);

        const getLocalStorageUser = localStorage.getItem("loggedUser");
        setLoggedUser(getLocalStorageUser);
        currentUser = users.find(user => user.username === getLocalStorageUser);

        setProfile(currentUser);
        getPayment(currentUser.id);
      }
      else router.push('/');
    }
    else if(login === false) router.push('/');
  }, []);
  

  return (
    <DashboardLayout>
      <DashboardHeader page="Payment">
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
        </Breadcrumb>
      </DashboardHeader>
      <main className="mt-5 mr-10 p-5 rounded-lg bg-slate-100">
        <h1 className="text-xl">Lihat History Pembayaranmu</h1>
        <p className="mt-3">Pembayaran bulan ini:</p>
        <TableContainer mt={5}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Jenis Pembayaran</Th>
                <Th>Status bulan ini</Th>
                <Th isNumeric>Total Pembayaran</Th>
                <Th isNumeric>Sudah Dibayar</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Listrik (Electricity)</Td>
                <Td color={electricLunas ? "green" : "red"}>{electricLunas ? "Lunas" : "Belum lunas"}</Td>
                <Td isNumeric>Rp.{totalElectricity}</Td>
                <Td isNumeric>Rp.{payedElectricity}</Td>
                <Td>
                  <Button
                    size="sm"
                    onClick={() =>
                      router.push("/dashboard/payment/electricity")
                    }
                  >
                    Detail
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td>Air (Water)</Td>
                <Td color={waterLunas ? "green" : "red"}>{waterLunas ? "Lunas" : "Belum lunas"}</Td>
                <Td isNumeric>Rp.{totalWater}</Td>
                <Td isNumeric>Rp.{payedWater}</Td>
                <Td>
                  <Button
                    size="sm"
                    onClick={() => router.push("/dashboard/payment/water")}
                  >
                    Detail
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td>Sewa (Rent)</Td>
                <Td color={rentLunas ? "green" : "red"}>{rentLunas ? "Lunas" : "Belum lunas"}</Td>
                <Td isNumeric>Rp.{totalRent}</Td>
                <Td isNumeric>Rp.{payedRent}</Td>
                <Td>
                  <Button
                    size="sm"
                    onClick={() => router.push("/dashboard/payment/rent")}
                  >
                    Detail
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </main>
    </DashboardLayout>
  );
}

export default Payment;
