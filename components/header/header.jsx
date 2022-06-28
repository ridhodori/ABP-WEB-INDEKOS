import {useState, useRef, useContext} from "react";
import LoginContext from '../../contexts/loginContext'
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useToast,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Router, { useRouter } from "next/router";

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const usernameRef = useRef();
  const passRef = useRef();
  const toast = useToast();
  const router = useRouter();

  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false); //state for disable login button while validating username in database
  
  const handleClick = () => setShow(!show);

  const {login, setLogin, setLoggedUser} = useContext(LoginContext);
  
  const handleSubmit = async () => {
    const userLoginInput = { username , pass };
    setLoadingLogin(true);

    if (usernameRef.current.value === '' || passRef.current.value === '') {
      setLoadingLogin(false);
      toast({
        title:'username atau password kosong',
        status: "error",
        position: "top",
        isClosable: true,
      });
    }
    else {
      try {
        const response = await fetch("api/user/login", {
            method: "POST",
            body : JSON.stringify(userLoginInput),
        });
        //gak tau ini🔽 buat apa jadi dikomen aja dulu
        // if (response) {
        //   localStorage.setItem("userId", response.data.id);
        //   router.push("/footer/index.js");
        // }

        //if username and password correct -> login
        if(response.status === 200){
          setLoadingLogin(false);
          toast({
            title:`${username} login`,
            status: "success",
            position: "top",
            isClosable: true,
          });
          setLoggedUser(username);
          setLogin(true);
          localStorage.setItem("loggedUser", username);
          router.push('/dashboard');
        }
        //if username not found
        else if(response.status === 404){
          setLoadingLogin(false);
          toast({
            title:'username tidak ditemukan',
            status: "error",
            position: "top",
            isClosable: true,
          });
        }
        //if password incorrect
        else if(response.status === 401){
          setLoadingLogin(false);
          toast({
            title:'password salah',
            status: "error",
            position: "top",
            isClosable: true,
          });
        };
      
      // return await response.json(); <--gak tau ini buat apa jadi dikomen juga dulu
      }
      catch (error) {
        setLoadingLogin(false);
        console.log(error.response);
      }

    }
  };

  return (
    <>
      <header className="flex justify-center py-6 px-14">
        <navbar className="w-full max-w-6xl flex items-center justify-between">
          <Link href="/" passHref>
            <motion.a
              whileHover={{ opacity: 0.8, textDecorationLine: "underline" }}
              className="text-xl font-semibold"
            >
              InTheKost
            </motion.a>
          </Link>
          <nav className="flex gap-10 items-center">
            {login && <Link href="/dashboard">
              <a className="hover:opacity-60 transition duration-300">Menu</a>
            </Link>}
            {!login && <Link href="/daftar">
              <a className="hover:opacity-60 transition duration-300">Daftar</a>
            </Link>}
            {!login && <Button
              ref={btnRef}
              onClick={onOpen}
              colorScheme="gray"
              variant="outline"
            >
              Login
            </Button>}
          </nav>
        </navbar>
      </header>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Login</DrawerHeader>
          <DrawerBody>
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSubmit();
              }}
              className="flex flex-col gap-5"
            >
              <span>
                <label>Username</label>
                <Input
                  placeholder="Username"
                  ref={usernameRef}
                  onChange={(data) => setUsername(data.target.value)}
                />
              </span>
              <span>
                <label>Password</label>
                <InputGroup
                  size="md"
                  onChange={(data) => setPass(data.target.value)}
                >
                  <Input
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Password"
                    ref={passRef}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={handleClick}
                      variant="outline"
                    >
                      {show ? (
                        <Icon as={ViewOffIcon} />
                      ) : (
                        <Icon as={ViewIcon} />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </span>
              <Button mt="4" backgroundColor='#222' color='#fff' type="submit" disabled={!loadingLogin ? false : true} >
                {!loadingLogin ? "Login" : "loading..."} 
              </Button>
            </form>
          </DrawerBody>

          <DrawerFooter>
            <Button
              colorScheme="#000000"
              variant="outline"
              onClick={
                router.pathname == "/daftar"
                  ? onClose
                  : () => {
                      router.push("/daftar");
                    }
              }
            >
              Buat Akun
            </Button>
            <Button ml="2" colorScheme="gray" variant="outline">
              Lupa Password
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Header;
