import React from "react";
import Footer from "../footer";
import Header from "../header/header";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <div className="font-roboto text-[#333333]">
      <Header />
      <main className="flex justify-center px-14 my-5">
        <motion.div
          key={router.route}
          initial="initial"
          animate="animate"
          variants={{
            initial: {
              opacity: 0,
            },
            animate: {
              opacity: 1,
            },
          }}
          transition={{ duration: 0.15 }}
          className="w-full max-w-6xl"
        >
          {children}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
