import { Box } from "@chakra-ui/react";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <Box display="flex" minH="100vh">
      <Sidebar />
      <Box flex="1" ml="240px" p={6} width="100%">
        {children}
      </Box>
    </Box>
  );
}
