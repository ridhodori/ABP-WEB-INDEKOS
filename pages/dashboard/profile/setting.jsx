import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import DashboardHeader from "../../../components/header/dashboardHeader";
import DashboardLayout from "../../../components/layout/dashboardLayout";

function Setting() {
  return (
    <DashboardLayout>
      <DashboardHeader page="Profile Setting">
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
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href="/dashboard/profile/setting">
              Profile Setting
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </DashboardHeader>
      <main className="mt-5 mr-10 p-5 rounded-lg bg-slate-100">
        <h1 className="text-xl">Profile Setting</h1>
        <ul className="flex flex-col gap-2">
          <li>
            <strong>Email:</strong>
          </li>
          <li>
            <Input type="email" placeholder="Email" />
          </li>
          <li>
            <strong>Username:</strong>
          </li>
          <li>
            <Input type="text" placeholder="Username" />
          </li>
          <li>
            <strong>Phone:</strong>
          </li>
          <li>
            <InputGroup>
              <InputLeftAddon>+62</InputLeftAddon>
              <Input type="text" placeholder="Phone" />
            </InputGroup>
          </li>
          <li>
            <strong>Address:</strong>
          </li>
          <li>
            <Input type="text" placeholder="Address" />
          </li>
        </ul>
        <Button mt={5}>Submit</Button>
      </main>
    </DashboardLayout>
  );
}

export default Setting;
