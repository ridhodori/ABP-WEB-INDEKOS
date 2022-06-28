import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import api from "../../../client/api";

const BreadCum = ({ number }) => {
  return (
    <motion.div
      initial={{
        opacity: 0.2,
        y: 5,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
    >
      <Breadcrumb separator={<ChevronRightIcon color="gray.500" />}>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <span
              className={
                number == 1
                  ? "bg-[#2C2C2C] text-white rounded-md p-2"
                  : "p-2 no-underline"
              }
            >
              Username & Password
            </span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <span
              className={
                number == 2
                  ? "bg-[#2C2C2C] text-white rounded-md p-2"
                  : "p-2 no-underline"
              }
            >
              Biodata Diri
            </span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <span
              className={
                number == 3
                  ? "bg-[#2C2C2C] text-white rounded-md p-2"
                  : "p-2 no-underline"
              }
            >
              Dokumen
            </span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <span
              className={
                number == 4
                  ? "bg-[#2C2C2C] text-white rounded-md p-2"
                  : "p-2 no-underline"
              }
            >
              Tinjau Ulang
            </span>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </motion.div>
  );
};

export default BreadCum;
