import {
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import DashboardHeader from "../../../components/header/dashboardHeader";
import DashboardLayout from "../../../components/layout/dashboardLayout";

function Profile() {
  return (
    <DashboardLayout>
      <DashboardHeader page="Your Profile">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href="/dashboard">
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href="/dashboard/profile">
              Profile
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </DashboardHeader>
      <main className="mt-5 mr-10 p-5 rounded-lg bg-slate-100">
        <h1 className="text-xl">Ditya Athallah</h1>
        <Avatar my={5} size={"2xl"} name="N" />
        <h2 className="text-gray">Kostan nomor 5, Taman Niaga</h2>
        <br />
        <ul>
          <li>
            <strong>Email:</strong> <span>dityaathallah107@gmail.com</span>
          </li>
          <li>
            <strong>Username:</strong> <span>dityath</span>
          </li>
          <li>
            <strong>Phone:</strong> <span>+62 812-898-9090</span>
          </li>
          <li>
            <strong>Address:</strong>{" "}
            <span>
              Jl. Raya Cikarang No.1, Cikarang Utara, Cikarang, Bekasi,
              Indonesia
            </span>
          </li>
        </ul>
      </main>
    </DashboardLayout>
  );
}

export default Profile;
