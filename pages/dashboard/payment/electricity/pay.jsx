import React from "react";
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
} from "@chakra-ui/react";
import Link from "next/link";
import DashboardHeader from "../../../../components/header/dashboardHeader";
import DashboardLayout from "../../../../components/layout/dashboardLayout";

function Pay() {
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
        <h1 className="text-xl">Pembayaran Listrik</h1>
        <ul className="mt-5 flex flex-col gap-3">
          <li>Pembayaran bulan:</li>
          <li>
            <Select placeholder="Pilih Bulan">
              <option>Januari</option>
              <option>Februari</option>
              <option>Maret</option>
              <option>April</option>
              <option>Mei</option>
              <option>Juni</option>
              <option>Juli</option>
              <option>Agustus</option>
              <option>September</option>
              <option>Oktober</option>
              <option>November</option>
              <option>Desember</option>
            </Select>
          </li>
          <li>Total yang ingin dibayar:</li>
          <li>
            <InputGroup>
              <InputLeftAddon>
                <span>Rp.</span>
              </InputLeftAddon>
              <Input placeholder="Total bayar" />
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
          <Button>Bayar</Button>
        </div>
      </main>
    </DashboardLayout>
  );
}

export default Pay;
