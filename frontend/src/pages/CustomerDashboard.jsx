import {
  Box,
  Container,
  Heading,
  Text,
  useColorModeValue,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";
import { AlertCircle } from "lucide-react";
import SearchForm from "../components/SearchForm";

export default function CustomerDashboard() {
  const cardBg = useColorModeValue("white", "gray.700");

  return (
    <Card bg={cardBg} shadow="sm" mb={6}>
      <CardHeader>
        <Heading size="lg">Customer Dashboard</Heading>
      </CardHeader>
      <CardBody>
        <Container maxW="container.md">
          <Box
            bg={useColorModeValue("white", "gray.700")}
            shadow="lg"
            borderRadius="xl"
            p={8}
            position="relative"
            overflow="hidden"
          >
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              height="8px"
              bgGradient="linear(to-r, brand.500, accent.500)"
            />

            <Box textAlign="center" mb={8}>
              <Heading
                size="xl"
                fontWeight="bold"
                color={useColorModeValue("gray.800", "white")}
                mb={2}
              >
                Customer Dashboard
              </Heading>
              <Text color={useColorModeValue("gray.600", "gray.300")}>
                Search for customer spending information
              </Text>
            </Box>

            <SearchForm />
          </Box>

          <Box mt={4} textAlign="center">
            <Text
              fontSize="sm"
              color={useColorModeValue("gray.500", "gray.400")}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <AlertCircle size={14} style={{ marginRight: "6px" }} />
              Use any valid customer ID to view spending statistics
            </Text>
          </Box>
        </Container>
      </CardBody>
    </Card>
  );
}
