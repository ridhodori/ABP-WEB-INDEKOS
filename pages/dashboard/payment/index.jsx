import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import DashboardHeader from "../../../components/header/dashboardHeader";
import DashboardLayout from "../../../components/layout/dashboardLayout";

function Payment() {
  const router = useRouter();

  return (
    <DashboardLayout>
      <DashboardHeader page="Payment">
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
        </Breadcrumb>
      </DashboardHeader>
      <main className="mt-5 mr-10 p-5 rounded-lg bg-slate-100">
        <h1 className="text-xl">Lihat History Pembayaranmu</h1>
        <p className="mt-3">Pembayaran bulan ini:</p>
        <TableContainer mt={5}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Jenis Pembayaran</Th>
                <Th>Status bulan ini</Th>
                <Th isNumeric>Total Pembayaran</Th>
                <Th isNumeric>Sudah Dibayar</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Listrik (Electricity)</Td>
                <Td color="green">Lunas</Td>
                <Td isNumeric>Rp.200.000</Td>
                <Td isNumeric>Rp.200.000</Td>
                <Td>
                  <Button
                    size="sm"
                    onClick={() =>
                      router.push("/dashboard/payment/electricity")
                    }
                  >
                    Detail
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td>Air (Water)</Td>
                <Td color="red">Belum lunas</Td>
                <Td isNumeric>Rp.150.000</Td>
                <Td isNumeric>Rp.100.000</Td>
                <Td>
                  <Button
                    size="sm"
                    onClick={() => router.push("/dashboard/payment/water")}
                  >
                    Detail
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td>Sewa (Rent)</Td>
                <Td color="green">Lunas</Td>
                <Td isNumeric>Rp.800.000</Td>
                <Td isNumeric>Rp.800.000</Td>
                <Td>
                  <Button
                    size="sm"
                    onClick={() => router.push("/dashboard/payment/rent")}
                  >
                    Detail
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </main>
    </DashboardLayout>
  );
}

export default Payment;
