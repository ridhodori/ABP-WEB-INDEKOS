import {
  Avatar,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext } from "react";
import LoginContext from "../../contexts/loginContext";

function DashboardHeader({ children, page }) {
  const {setLogin, loggedUser, setLoggedUser} = useContext(LoginContext);
  const router = useRouter();

  return (
    <>
      <Head>
          <title>dashboard - InTheKost</title>
      </Head>
      <header className="mt-[5vh] flex justify-between pr-10">
        <div>
          {children}
          <h1 className="text-xl mt-2">{page}</h1>
        </div>
        <Menu>
          <MenuButton
            textAlign="left"
            gap="4"
            _hover={{ bg: "purple.50" }}
            cursor="pointer"
            rounded="lg"
            p="2"
            ml="1"
          >
            <div className="flex gap-4">
              <Avatar name={`Nama`} size="sm" />
              <div>
                <p className="text-md leading-tight">{loggedUser}</p>
                <p className="text-xs leading-none">Taman Niaga</p>
              </div>
            </div>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => router.push("/")}>Home</MenuItem>
            <MenuDivider />
            <MenuItem onClick={() => router.push("/dashboard/profile")}>
              Profile
            </MenuItem>
            <MenuDivider />
            <MenuItem
              onClick={() => {
                // localStorage.removeItem("token");
                setLogin(false);
                setLoggedUser('');
                localStorage.removeItem('loggedUser');
                router.push("/");
              }}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </header>
    </>
  );
}

export default DashboardHeader;
