import React from "react";
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
import Link from "next/link";
import DashboardLayout from "../../components/layout/dashboardLayout";
import DashboardHeader from "../../components/header/dashboardHeader";
import Image from "next/image";
import { useRouter } from "next/router";

function Dashboard() {
  const router = useRouter();

  return (
    <DashboardLayout>
      <DashboardHeader page="Dashboard">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href="/dashboard">
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </DashboardHeader>
      <main className="mt-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold">Halo Ditya Athallah..</h1>
        <h2 className="text-2xl font-semibold">Selamat datang di dashboard</h2>
        <div className="relative w-[400px] h-[300px]">
          <Image
            src="/dashboard-illu.png"
            alt=""
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="mt-5 flex gap-5">
          <Button
            colorScheme="blackAlpha"
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
