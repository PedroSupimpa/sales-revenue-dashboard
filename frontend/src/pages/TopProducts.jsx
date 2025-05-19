import { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Select,
  Badge,
  Text,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { TrendingUp, Package } from "lucide-react";
import { GET_TOP_SELLING_PRODUCTS } from "../graphql/queries";
import LoadingState from "../components/LoadingState";
import ErrorDisplay from "../components/ErrorDisplay";

export default function TopProducts() {
  const [limit, setLimit] = useState(5);
  const { data, loading, error } = useQuery(GET_TOP_SELLING_PRODUCTS, {
    variables: { limit },
  });

  const cardBg = useColorModeValue("white", "gray.700");
  const tableBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <Card bg={cardBg} shadow="sm">
      <CardHeader>
        <HStack justify="space-between" align="center">
          <Heading size="lg" display="flex" alignItems="center" gap={2}>
            <Package size={24} /> Top Selling Products
          </Heading>
          <Select
            width="auto"
            value={String(limit)}
            onChange={(e) => setLimit(Number(e.target.value))}
            size="sm"
            borderColor={borderColor}
          >
            {[5, 10, 25].map((n) => (
              <option key={n} value={n}>
                Top {n} Products
              </option>
            ))}
          </Select>
        </HStack>
      </CardHeader>

      <CardBody>
        {data && data.getTopSellingProducts.length > 0 ? (
          <Box overflowX="auto">
            <Table variant="simple" bg={tableBg}>
              <Thead>
                <Tr>
                  <Th>Rank</Th>
                  <Th>Name</Th>
                  <Th isNumeric>Quantity Sold</Th>
                  <Th isNumeric>Price</Th>
                  <Th isNumeric>Total Revenue</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.getTopSellingProducts.map((product, i) => (
                  <Tr key={i}>
                    <Td>
                      <Badge
                        colorScheme={i < 3 ? "green" : "gray"}
                        variant={i < 3 ? "solid" : "subtle"}
                        borderRadius="full"
                        px={3}
                      >
                        #{i + 1}
                      </Badge>
                    </Td>
                    <Td fontWeight="medium">{product.name}</Td>
                    <Td isNumeric>
                      <HStack justify="flex-end" spacing={1}>
                        <TrendingUp size={16} />
                        <Text>{product.quantitySold}</Text>
                      </HStack>
                    </Td>
                    <Td isNumeric>{formatCurrency(product.price)}</Td>
                    <Td isNumeric fontWeight="bold">
                      {formatCurrency(product.price * product.quantitySold)}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        ) : (
          <Box textAlign="center" py={8}>
            <Text color="gray.500">No products data available</Text>
          </Box>
        )}
      </CardBody>
    </Card>
  );
}
