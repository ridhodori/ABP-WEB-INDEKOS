import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
} from "@chakra-ui/react";
import {
  BsHouseFill,
  BsFillLightningChargeFill,
  BsWater,
  BsWallet2,
  BsColumnsGap,
  BsPerson,
  BsPersonSquare,
  BsNut,
} from "react-icons/bs";
import { useRouter } from "next/router";

function DashboardLayout({ children }) {
  const router = useRouter()
  return (
    <div className="flex">
      <div className="w-[20vw]">
        <aside className="flex flex-col gap-3 p-5 items-center fixed w-[15vw] rounded-2xl h-[90vh] bg-white shadow-lg top-[5vh] left-[2.5vw]">
          <motion.h1
            whileHover={{ opacity: 0.8 }}
            className="text-xl font-semibold mb-5"
          >
            InTheKost
          </motion.h1>
          <Button leftIcon={<BsColumnsGap />} w="full" colorScheme="gray" onClick={() => router.push("/dashboard")}>
            Dashboard
          </Button>
          <Accordion
            allowToggle
            w="full"
            padding="0"
            display="flex"
            flexDirection="column"
            gap="3"
          >
            <AccordionItem w="full" padding="0" border="none">
              <AccordionButton w="full" padding="0">
                <Button
                  leftIcon={<BsWallet2 />}
                  rightIcon={<AccordionIcon />}
                  w="full"
                  colorScheme="gray"
                >
                  Payment
                </Button>
              </AccordionButton>
              <AccordionPanel display="flex" flexDirection="column" gap="2">
                <Button
                  leftIcon={<BsFillLightningChargeFill />}
                  w="full"
                  variant="outline"
                  colorScheme="gray"
                  onClick={() => router.push("/dashboard/payment/electricity")}
                >
                  Electricity
                </Button>
                <Button
                  leftIcon={<BsWater />}
                  w="full"
                  variant="outline"
                  colorScheme="gray"
                  onClick={() => router.push("/dashboard/payment/water")}
                >
                  Water
                </Button>
                <Button
                  leftIcon={<BsHouseFill />}
                  w="full"
                  variant="outline"
                  colorScheme="gray"
                  onClick={() => router.push("/dashboard/payment/rent")}
                >
                  Rent
                </Button>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem w="full" padding="0" border="none">
              <AccordionButton w="full" padding="0">
                <Button
                  leftIcon={<BsPerson />}
                  rightIcon={<AccordionIcon />}
                  w="full"
                  colorScheme="gray"
                >
                  Profile
                </Button>
              </AccordionButton>
              <AccordionPanel display="flex" flexDirection="column" gap="2">
                <Button
                  leftIcon={<BsPersonSquare />}
                  w="full"
                  variant="outline"
                  colorScheme="gray"
                  onClick={() => router.push("/dashboard/profile")}
                >
                  Profile
                </Button>
                <Button
                  leftIcon={<BsNut />}
                  w="full"
                  variant="outline"
                  colorScheme="gray"
                  onClick={() => router.push("/dashboard/profile/setting")}
                >
                  Setting
                </Button>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </aside>
      </div>
      <div className="w-[80vw]">{children}</div>
    </div>
  );
}

export default DashboardLayout;
