import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthProvider from "../context/AuthProvider";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
