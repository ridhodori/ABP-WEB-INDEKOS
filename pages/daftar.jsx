import React, { useState } from "react";
import Head from "next/head";
import Layout from "../components/layout";
import { motion } from "framer-motion";
import BreadCum from "../components/pages/daftar/breadCum";
import {
  Button,
  Input,
  PinInput,
  PinInputField,
  Radio,
  RadioGroup,
  useToast,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  toast,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import Router from "next/router";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//get all registered username on DB
export async function getServerSideProps(){
  const usernames = await prisma.user.findMany({
    select : {
      username : true,
    }
  })
  const emails = await prisma.user.findMany({
    select : {
      email : true,
    }
  })

  return {
    props : {
      usernames,
      emails
    }
  }
}

const Daftar = ({usernames, emails}) => {
  const [number, setNumber] = useState(0);
  const [pin, setPin] = useState("");
  const [data, setData] = useState({});

  const toast = useToast();

  console.log(usernames);
  
  //convert usernames in DB from arrayOfObject to array so it can be used for .include function below
  const usernameArr = usernames.map(user => user.username);
  //convert emails in DB from arrayOfObject to array so it can be used for .include function below
  const emailArr = emails.map(mail => mail.email);

  function formStepTwo(val){
    //check if email is already taken
    if(emailArr.includes(val.email)){
      toast({
        title: 'email telah diambil',
        status: "error",
        isClosable: true,
      });
    }
    //check if username is already taken
    else if(usernameArr.includes(val.username)){
      toast({
        title: 'username telah diambil',
        status: "error",
        isClosable: true,
      });
    }
    //check password and passwordConfirm similarity
    else if(val.password !== val.passwordConfirm){
      toast({
        title: 'password konfirmasi tidak sama',
        status: "error",
        isClosable: true,
      });
    }
    else {
      setData(val);
      setNumber(number + 1);
    }
  }

  //pass user register data to register.js api
  async function saveUser(userInputData) {
    const response = await fetch('/api/user/register', {
      method : 'POST',
      body : JSON.stringify(userInputData),
    });
    
    if(!response.ok) throw new Error(response.statusText);

    toast({
      title: 'user teregistrasi',
      status: "success",
      isClosable: true,
    });

    Router.push('/');   //redirect page to home after registered

    return await response.json();
  }

  return (
    <>
      <Head>
        <title>register - InTheKost</title>
      </Head>

      <Layout>
        <div className="mb-20">
          <motion.h1
            whileHover={{
              scale: 1.1,
            }}
            className="text-6xl font-light text-[#BDBDBD]"
          >
            Daftar
          </motion.h1>
          <motion.h2
            whileHover={{
              scale: 1.1,
            }}
            className="text-5xl font-bold"
          >
            Daftar untuk Kosan
          </motion.h2>
        </div>
        <div className="flex items-center flex-col w-full gap-20 mb-40 h-96">
          {number === 0 ? "" : <BreadCum number={number} />}
          {number == 0 ? (
            <motion.div
              initial={{
                opacity: 0.2,
                y: 5,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="flex flex-col gap-5"
            >
              <h3 className="text-center text-lg font-bold">
                Masukkan Kode Konfirmasi
              </h3>
              <p className="w-96 text-center">
                Kode konfirmasi akan diberikan oleh pemilik kosan setelah
                pendaftaran telah disetujui. Chat melalui WA untuk informasi lebih
                lanjut.
              </p>
              <span className="flex justify-center gap-2">
                <PinInput
                  value={pin}
                  onChange={(val) => setPin(val)}
                  name="pin"
                  label="pin"
                >
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </span>
              <div className="flex justify-center gap-5 mt-5">
                <Button
                  colorScheme="gray"
                  variant="outline"
                  onClick={() => {
                    pin.match("^([0-9]{4})$")
                      ? (console.log({
                          pin: pin,
                        }),
                        setNumber(number + 1))
                      : toast({
                          title: "Silahkan isi penuh kolom Kode konfirmasi",
                          status: "error",
                          isClosable: true,
                        });
                  }}
                >
                  Selanjutnya
                </Button>
              </div>
            </motion.div>
          ) : (
            ""
          )}
          {number == 1 ? (
            <motion.div
              initial={{
                opacity: 0.2,
                y: 5,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              <Formik
                initialValues={{
                  email: "",
                  username: "",
                  password: "",
                  passwordConfirm: "",
                  nama: "",
                  kelamin: "",
                  nomorHp: "",
                  fotoKtp: null,
                  fotoKk: null,
                }}
                onSubmit={(val) => formStepTwo(val) }
              >
                <Form className="flex flex-col gap-5">
                  <span>
                    <label>Email</label>
                    <Field as={Input} name="email" type="email" required />
                  </span>
                  <span>
                    <label>Username</label>
                    <Field as={Input} name="username" type="text" required />
                  </span>
                  <span>
                    <label>Password</label>
                    <Field as={Input} name="password" type="password" required />
                  </span>
                  <span>
                    <label>Konfirmasi Password</label>
                    <Field as={Input} name="passwordConfirm" type="password" required />
                  </span>
                  <div className="flex justify-center gap-5 mt-5">
                    <Popover>
                      <PopoverTrigger>
                        <Button colorScheme="gray" variant="outline" type="button">
                          Kembali
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Konfirmasi!</PopoverHeader>
                        <PopoverBody>
                          Data yang sudah ditulis mungkin akan hilang, apakah anda
                          yakin?
                        </PopoverBody>
                        <PopoverFooter>
                          <Button
                            colorScheme="gray"
                            variant="outline"
                            type="button"
                            onClick={() => setNumber(number - 1)}
                          >
                            Ya, saya yakin
                          </Button>
                        </PopoverFooter>
                      </PopoverContent>
                    </Popover>
                    <Button colorScheme="gray" type="submit">
                      Selanjutnya
                    </Button>
                  </div>
                </Form>
              </Formik>
            </motion.div>
          ) : (
            ""
          )}
          {number == 2 ? (
            <motion.div
              initial={{
                opacity: 0.2,
                y: 5,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              <Formik
                enableReinitialize
                initialValues={data}
                onSubmit={(val) => {
                  setData(val);
                  setNumber(number + 1);
                }}
              >
                <Form className="flex flex-col gap-5">
                  <span>
                    <label>Nama Lengkap</label>
                    <Field as={Input} name="nama" type="text" required />
                  </span>
                  <span>
                    <label>Jenis Kelamin</label>
                    <br />
                    <RadioGroup display="flex" gap="5" marginTop="2">
                      <Field as={Radio} name="kelamin" value="laki-laki">
                        Laki-laki
                      </Field>
                      <Field as={Radio} name="kelamin" value="perempuan">
                        Perempuan
                      </Field>
                    </RadioGroup>
                  </span>
                  <span>
                    <label>Nomor Hp</label>
                    <Field as={Input} name="nomorHp" type="text" required />
                  </span>
                  <div className="flex justify-center gap-5 mt-5">
                    <Popover>
                      <PopoverTrigger>
                        <Button
                          colorScheme="gray"
                          variant="outline"
                          type="button"
                        >
                          Kembali
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Konfirmasi!</PopoverHeader>
                        <PopoverBody>
                          Data yang sudah ditulis mungkin akan hilang, apakah anda
                          yakin?
                        </PopoverBody>
                        <PopoverFooter>
                          <Button
                            colorScheme="gray"
                            variant="outline"
                            type="button"
                            onClick={() => setNumber(number - 1)}
                          >
                            Ya, saya yakin
                          </Button>
                        </PopoverFooter>
                      </PopoverContent>
                    </Popover>
                    <Button colorScheme="gray" type="submit">
                      Selanjutnya
                    </Button>
                  </div>
                </Form>
              </Formik>
            </motion.div>
          ) : (
            ""
          )}
          {number == 3 ? (
            <motion.div
              initial={{
                opacity: 0.2,
                y: 5,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              <Formik
                enableReinitialize
                initialValues={data}
                onSubmit={(val) => {
                  setData(val);
                  setNumber(number + 1);
                }}
              >
                <Form className="flex flex-col gap-5">
                  <span>
                    <label>Unggah Foto KTP</label>
                    <Field as={Input} name="fotoKtp" type="file" />
                  </span>
                  <span>
                    <label>Unggah Foto KK</label>
                    <Field as={Input} name="fotoKk" type="file" />
                  </span>
                  <div className="flex justify-center gap-5 mt-5">
                    <Popover>
                      <PopoverTrigger>
                        <Button
                          colorScheme="gray"
                          variant="outline"
                          type="button"
                        >
                          Kembali
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Konfirmasi!</PopoverHeader>
                        <PopoverBody>
                          Data yang sudah ditulis mungkin akan hilang, apakah anda
                          yakin?
                        </PopoverBody>
                        <PopoverFooter>
                          <Button
                            colorScheme="gray"
                            variant="outline"
                            type="button"
                            onClick={() => setNumber(number - 1)}
                          >
                            Ya, saya yakin
                          </Button>
                        </PopoverFooter>
                      </PopoverContent>
                    </Popover>
                    <Button colorScheme="gray" type="submit">
                      Selanjutnya
                    </Button>
                  </div>
                </Form>
              </Formik>
            </motion.div>
          ) : (
            ""
          )}
          {number == 4 ? (
            <div className="flex flex-col gap-5 justify-center">
              <h3 className="text-center text-lg font-bold">Konfirmasi Data</h3>
              <p className="w-96 text-center">
                Silahkan pastikan kembali data anda sudah benar.
              </p>
              <TableContainer>
                <Table variant="simple">
                  <Tbody>
                    <Tr>
                      <Td>Nama Lengkap: </Td>
                      <Td>{data.nama}</Td>
                    </Tr>
                    <Tr>
                      <Td>Email: </Td>
                      <Td>{data.email}</Td>
                    </Tr>
                    <Tr>
                      <Td>Username</Td>
                      <Td>{data.username}</Td>
                    </Tr>
                    <Tr>
                      <Td>Nomor Handphone</Td>
                      <Td>{data.nomorHp}</Td>
                    </Tr>
                    <Tr>
                      <Td>Jenis Kelamin</Td>
                      <Td>{data.kelamin}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
              <div className="flex justify-center gap-5 mt-5">
                <Popover>
                  <PopoverTrigger>
                    <Button colorScheme="gray" variant="outline" type="button">
                      Reset dan ulangi kembali
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Konfirmasi!</PopoverHeader>
                    <PopoverBody>
                      Data yang sudah ditulis akan hilang dan anda harus mengisi
                      kembali dari awal, apakah anda yakin?
                    </PopoverBody>
                    <PopoverFooter>
                      <Button
                        colorScheme="gray"
                        variant="outline"
                        type="button"
                        onClick={() => {
                          setNumber(1);
                          setData("");
                        }}
                      >
                        Ya, saya yakin
                      </Button>
                    </PopoverFooter>
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger>
                    <Button colorScheme="gray" variant="outline" type="button">
                      Kembali
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Konfirmasi!</PopoverHeader>
                    <PopoverBody>
                      Data yang sudah ditulis mungkin akan hilang, apakah anda
                      yakin?
                    </PopoverBody>
                    <PopoverFooter>
                      <Button
                        colorScheme="gray"
                        variant="outline"
                        type="button"
                        onClick={() => setNumber(number - 1)}
                      >
                        Ya, saya yakin
                      </Button>
                    </PopoverFooter>
                  </PopoverContent>
                </Popover>
                <Button
                  colorScheme="gray"
                  onClick={async () => await saveUser(data)}    //run function to pass user register data in line 33
                >
                  Data Benar
                </Button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </Layout>
    </>
  );
};

export default Daftar;
