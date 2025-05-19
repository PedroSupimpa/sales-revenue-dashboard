import {
  Card,
  CardBody,
  Flex,
  Text,
  Icon,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function ErrorDisplay({ error }) {
  const errorMessage = error.message || "An error occurred while fetching data";

  return (
    <Card
      bg={useColorModeValue("red.50", "rgba(254, 178, 178, 0.16)")}
      borderWidth="1px"
      borderColor={useColorModeValue("red.200", "red.800")}
      shadow="sm"
    >
      <CardBody>
        <Flex direction="column" align="center" justify="center" py={6}>
          <Icon as={AlertCircle} boxSize={8} color="red.500" mb={4} />
          <Text
            fontSize="lg"
            fontWeight="medium"
            color="red.500"
            mb={2}
            textAlign="center"
          >
            Oops! Something went wrong.
          </Text>
          <Text
            color={useColorModeValue("gray.600", "gray.300")}
            mb={4}
            textAlign="center"
          >
            {errorMessage}
          </Text>
          <Button
            leftIcon={<RefreshCw size={16} />}
            colorScheme="red"
            variant="outline"
            size="sm"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
}
