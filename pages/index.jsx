import { Button } from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import Layout from "../components/layout";
import About from "../components/pages/main/about";
import FirstSlider from "../components/pages/main/firstSlider";

export default function Home() {
  return (
    <>
      <Head>
        <title>InTheKost</title>
      </Head>
      <Layout>
        <FirstSlider />
        <About />
      </Layout>
    </>
  );
}
