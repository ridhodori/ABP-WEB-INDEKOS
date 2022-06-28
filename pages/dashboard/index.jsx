import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
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
import Link from "next/link";
import DashboardLayout from "../../components/layout/dashboardLayout";
import DashboardHeader from "../../components/header/dashboardHeader";

function Dashboard() {

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
    </DashboardLayout>
  );
}

export default Dashboard;
