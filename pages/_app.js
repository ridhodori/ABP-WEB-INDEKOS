import "../styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChakraProvider } from "@chakra-ui/react";
import { LoginProvider } from '../contexts/loginContext';

function MyApp({ Component, pageProps }) {
  return (
    <LoginProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </LoginProvider>
  );
}

export default MyApp;
