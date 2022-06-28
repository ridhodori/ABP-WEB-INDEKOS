import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import DashboardHeader from "../../../../components/header/dashboardHeader";
import DashboardLayout from "../../../../components/layout/dashboardLayout";

function Water() {
  const router = useRouter();

  return (
    <DashboardLayout>
      <DashboardHeader page="Water">
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
            <BreadcrumbLink as={Link} href="/dashboard/payment/water">
              Water
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </DashboardHeader>
      <main className="mt-5 mr-10 p-5 rounded-lg bg-slate-100">
        <h1 className="text-xl">History Pembayaran Air</h1>
        <TableContainer my={5}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Bulan</Th>
                <Th>Status</Th>
                <Th isNumeric>Total Pembayaran</Th>
                <Th isNumeric>Sudah Dibayar</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Januari</Td>
                <Td color="green">Lunas</Td>
                <Td isNumeric>Rp.200.000</Td>
                <Td isNumeric>Rp.200.000</Td>
                <Td>
                  <Button
                    size="sm"
                    onClick={() => router.push("/dashboard/payment/water/pay")}
                  >
                    Bayar
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td>Februari</Td>
                <Td color="red">Belum lunas</Td>
                <Td isNumeric>Rp.200.000</Td>
                <Td isNumeric>Rp.100.000</Td>
                <Td>
                  <Button
                    size="sm"
                    onClick={() => router.push("/dashboard/payment/water/pay")}
                  >
                    Bayar
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td>Maret</Td>
                <Td color="green">Lunas</Td>
                <Td isNumeric>Rp.200.000</Td>
                <Td isNumeric>Rp.200.000</Td>
                <Td>
                  <Button
                    size="sm"
                    onClick={() => router.push("/dashboard/payment/water/pay")}
                  >
                    Bayar
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td>April</Td>
                <Td color="red">Belum lunas</Td>
                <Td isNumeric>Rp.200.000</Td>
                <Td isNumeric>Rp.100.000</Td>
                <Td>
                  <Button
                    size="sm"
                    onClick={() => router.push("/dashboard/payment/water/pay")}
                  >
                    Bayar
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td>Mei</Td>
                <Td color="green">Lunas</Td>
                <Td isNumeric>Rp.200.000</Td>
                <Td isNumeric>Rp.200.000</Td>
                <Td>
                  <Button
                    size="sm"
                    onClick={() => router.push("/dashboard/payment/water/pay")}
                  >
                    Bayar
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td>Juni</Td>
                <Td color="red">Belum lunas</Td>
                <Td isNumeric>Rp.200.000</Td>
                <Td isNumeric>Rp.100.000</Td>
                <Td>
                  <Button
                    size="sm"
                    onClick={() => router.push("/dashboard/payment/water/pay")}
                  >
                    Bayar
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td>Juli</Td>
                <Td color="green">Lunas</Td>
                <Td isNumeric>Rp.200.000</Td>
                <Td isNumeric>Rp.200.000</Td>
                <Td>
                  <Button
                    size="sm"
                    onClick={() => router.push("/dashboard/payment/water/pay")}
                  >
                    Bayar
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td>Agustus</Td>
                <Td color="red">Belum lunas</Td>
                <Td isNumeric>Rp.200.000</Td>
                <Td isNumeric>Rp.100.000</Td>
                <Td>
                  <Button
                    size="sm"
                    onClick={() => router.push("/dashboard/payment/water/pay")}
                  >
                    Bayar
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td>September</Td>
                <Td color="green">Lunas</Td>
                <Td isNumeric>Rp.200.000</Td>
                <Td isNumeric>Rp.200.000</Td>
                <Td>
                  <Button
                    size="sm"
                    onClick={() => router.push("/dashboard/payment/water/pay")}
                  >
                    Bayar
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td>Oktober</Td>
                <Td color="red">Belum lunas</Td>
                <Td isNumeric>Rp.200.000</Td>
                <Td isNumeric>Rp.100.000</Td>
                <Td>
                  <Button
                    size="sm"
                    onClick={() => router.push("/dashboard/payment/water/pay")}
                  >
                    Bayar
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td>November</Td>
                <Td color="green">Lunas</Td>
                <Td isNumeric>Rp.200.000</Td>
                <Td isNumeric>Rp.200.000</Td>
                <Td>
                  <Button
                    size="sm"
                    onClick={() => router.push("/dashboard/payment/water/pay")}
                  >
                    Bayar
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td>Desember</Td>
                <Td color="red">Belum lunas</Td>
                <Td isNumeric>Rp.200.000</Td>
                <Td isNumeric>Rp.100.000</Td>
                <Td>
                  <Button
                    size="sm"
                    onClick={() => router.push("/dashboard/payment/water/pay")}
                  >
                    Bayar
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

export default Water;
