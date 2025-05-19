import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Stack,
  Box,
  Text,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { TrendingUp, DollarSign, Calendar } from "lucide-react";

export default function CustomerStats({ data }) {
  const bgGradient = useColorModeValue(
    "linear(to-br, white, gray.50)",
    "linear(to-br, gray.700, gray.800)"
  );
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (timestamp) => {
    return new Date(parseInt(timestamp)).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card
      bgGradient={bgGradient}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="xl"
      overflow="hidden"
      variant="elevated"
    >
      <CardHeader pb={2}>
        <Heading size="md" fontWeight="semibold">
          Customer Spending Summary
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack spacing={6}>
          <Stat>
            <Box display="flex" alignItems="center">
              <Box p={2} borderRadius="md" bg="brand.500" color="white" mr={3}>
                <DollarSign size={20} />
              </Box>
              <Box>
                <StatLabel>Total Spent</StatLabel>
                <StatNumber fontWeight="bold">
                  {formatCurrency(data.totalSpent)}
                </StatNumber>
              </Box>
            </Box>
          </Stat>

          <Divider />

          <Stat>
            <Box display="flex" alignItems="center">
              <Box p={2} borderRadius="md" bg="accent.500" color="white" mr={3}>
                <TrendingUp size={20} />
              </Box>
              <Box>
                <StatLabel>Average Order</StatLabel>
                <StatNumber fontWeight="bold">
                  {formatCurrency(data.avgOrder)}
                </StatNumber>
                <StatHelpText>Per transaction</StatHelpText>
              </Box>
            </Box>
          </Stat>

          <Divider />

          <Stat>
            <Box display="flex" alignItems="center">
              <Box
                p={2}
                borderRadius="md"
                bg="success.500"
                color="white"
                mr={3}
              >
                <Calendar size={20} />
              </Box>
              <Box>
                <StatLabel>Last Order Date</StatLabel>
                <StatNumber fontSize="xl" fontWeight="bold">
                  {formatDate(data.lastOrderDate)}
                </StatNumber>
              </Box>
            </Box>
          </Stat>
        </Stack>
      </CardBody>
    </Card>
  );
}
