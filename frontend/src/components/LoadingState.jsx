import {
  Card,
  CardBody,
  Flex,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function LoadingState() {
  return (
    <Card
      bg={useColorModeValue("white", "gray.700")}
      borderRadius="lg"
      boxShadow="md"
      overflow="hidden"
      borderWidth="1px"
      borderColor={useColorModeValue("gray.200", "gray.600")}
    >
      <CardBody>
        <Flex
          direction="column"
          align="center"
          justify="center"
          py={8}
          opacity={0.8}
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor={useColorModeValue("gray.200", "gray.600")}
            color="brand.500"
            size="xl"
            mb={4}
          />
          <Text
            color={useColorModeValue("gray.600", "gray.300")}
            fontWeight="medium"
          >
            Fetching customer data...
          </Text>
        </Flex>
      </CardBody>
    </Card>
  );
}
