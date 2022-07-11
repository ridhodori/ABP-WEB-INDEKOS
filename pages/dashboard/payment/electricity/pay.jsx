import {useState, useEffect, useContext} from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import Link from "next/link";
import DashboardHeader from "../../../../components/header/dashboardHeader";
import DashboardLayout from "../../../../components/layout/dashboardLayout";
import { PrismaClient } from "@prisma/client";
import LoginContext from "../../../../contexts/loginContext";

const prisma = new PrismaClient();

// get all user from db for currentUser validation
// get all electricity data to show in form
export async function getServerSideProps() {
  const users = await prisma.user.findMany();
  const electricities = await prisma.electricity.findMany();
  
  return {
    props: {
      users,
      electricities
    }
  }
}

function Pay({users, electricities}) {
  const toast = useToast();
  const router = useRouter();
  //states and variables for check and set logged user
  const {login, setLogin, loggedUser, setLoggedUser, setProfile} = useContext(LoginContext);
  let payments, usernames, currentUser;
  //states for store electricity later
  const [electricity, setElectricity] = useState([]);

  // get electricities data
  function getElectricities(id){
    fetch('/api/payment')
      .then(res => res.json())
      .then(paymentFromDB => {
        //select payment id with current user id
        payments = paymentFromDB.filter(pay => pay.user_id === id);
      })
      .then(()=>{
        //select electricity with current payment id
        const paymentsId = payments.map(py => py.id);
        setElectricity(electricities.filter(el => paymentsId.indexOf(el.payment_id) !== -1));
      })
  }

  //update payment data
  async function updatePayment(userInputData) {
    const response = await fetch(`/api/payment/electricity/pay`, {
      method : 'POST',
      body : JSON.stringify(userInputData),
    });
    
    if(!response.ok) throw new Error(response.statusText);

    router.push('/dashboard/payment/electricity');   //redirect page to home after registered

    return await response.json();
  }

  async function confirmation(formData) {
    const electricData = electricity.filter(el => el.electricity_periode === formData.electricity_periode);  //get db data similar to form data
    const id = electricData[0].id;
    const price = electricData.map(el => el.electric_price)[0]; 
    const pricePayed = electricData.map(el => el.electricity_payed)[0];
    const remainPayed = price - pricePayed;
    const formPrice = formData.electricity_payed;

    //if pay input bigger that price
    if (remainPayed - formPrice < 0) {
      toast({
        title: 'pembayaran lebih besar dari tagihan',
        status: "error",
        isClosable: true,
      });
    }
    //if pay input equal to price --bill in payed
    else if (remainPayed - formPrice === 0) {
      updatePayment({id: id, electricity_payed: pricePayed+formPrice, payment_status : 1});
      toast({
        title: 'pembayaran lunas',
        status: "success",
        isClosable: true,
      });
    }
    //if pay input smaller that price --bill in not fully payed
    else{
      updatePayment( {id: id, electricity_payed: pricePayed+formPrice, payment_status : 0 });
      toast({
        title: 'pembayaran terupdate',
        status: "success",
        isClosable: true,
      });
    }
  }
    
  //redirect to home if user not logged in and try to access dashboard from url
  useEffect(() => {
    if(loggedUser){
      usernames = users.map(user => user.username);
      currentUser = users.find(user => user.username === loggedUser);
      
      setProfile(currentUser);
      getElectricities(currentUser.id);
    }
    else if(localStorage.getItem("loggedUser")){
      usernames = users.map(user => user.username);
      if (usernames.includes(localStorage.getItem("loggedUser"))){
        setLogin(true);
        
        const getLocalStorageUser = localStorage.getItem("loggedUser");
        setLoggedUser(getLocalStorageUser);
        currentUser = users.find(user => user.username === getLocalStorageUser);
        
        setProfile(currentUser);
        getElectricities(currentUser.id);
      }
      else router.push('/');
    }
    else if(login === false) router.push('/');
  }, []);

  return (
    <DashboardLayout>
      <DashboardHeader>
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
            <BreadcrumbLink as={Link} href="/dashboard/payment/electricity">
              Electricity
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href="/dashboard/payment/electricity/pay">
              Pay
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </DashboardHeader>
      <main className="mt-5 mr-10 p-5 rounded-lg bg-slate-100">
        <Formik
          initialValues={{
            electricity_periode: '',
            electricity_payed: ''
          }}
          onSubmit={(val) => confirmation(val)}
        >
          <Form>
            <h1 className="text-xl">Pembayaran Listrik</h1>
            <ul className="mt-5 flex flex-col gap-3">
              <li>Pembayaran bulan:</li>
              <li>
                <Field as={Select} name="electricity_periode" placeholder="Pilih Bulan">
                  {electricity.filter(el => el.payment_status === 0).map(el => (
                    <option value={el.electricity_periode}>{el.electricity_periode}</option>
                  ))}
                </Field>
              </li>
              <li>Total yang ingin dibayar:</li>
              <li>
                <InputGroup>
                  <InputLeftAddon>
                    <span>Rp.</span>
                  </InputLeftAddon>
                  <Field as={Input} name="electricity_payed" type="number" required />
                </InputGroup>
              </li>
              <li>Bukti pembayaran:</li>
              <li>
                <Input type="file" placeholder="upload file" />
              </li>
              <li>Catatan:</li>
              <li>
                <Textarea placeholder="Catatan pembayaran" />
              </li>
            </ul>
            <div className="mt-5">
              <Button type="submit">Bayar</Button>
            </div>
          </Form>
        </Formik>
      </main>
    </DashboardLayout>
  );
}

export default Pay;
