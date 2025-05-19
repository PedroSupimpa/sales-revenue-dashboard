import { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Input,
  VStack,
  Text,
  Grid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
  FormControl,
  FormLabel,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { format } from "date-fns";
import {
  TrendingUp,
  DollarSign,
  BarChart2,
  PieChart as PieChartIcon,
} from "lucide-react";
import { GET_SALES_ANALYTICS } from "../graphql/queries";
import LoadingState from "../components/LoadingState";
import ErrorDisplay from "../components/ErrorDisplay";
import { formatCurrency } from "../utils/formatCurrency";

const chartColors = [
  "#3182CE",
  "#2B6CB0",
  "#63B3ED",
  "#4299E1",
  "#90CDF4",
  "#667EEA",
  "#5A67D8",
  "#4C51BF",
  "#48BB78",
  "#38A169",
];

export default function SalesAnalytics() {
  const [range, setRange] = useState({
    start: "2025-01-01",
    end: "2025-12-31",
  });

  const [chartType, setChartType] = useState("bar");

  const { data, loading, error } = useQuery(GET_SALES_ANALYTICS, {
    variables: { startDate: range.start, endDate: range.end },
  });

  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  if (loading) return <LoadingState />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <Box>
      <Card bg={cardBg} shadow="sm" mb={6}>
        <CardHeader>
          <Heading size="lg">Sales Analytics</Heading>
        </CardHeader>

        <CardBody>
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4} mb={6}>
            <FormControl>
              <FormLabel>Start Date</FormLabel>
              <Input
                type="date"
                value={range.start}
                onChange={(e) => setRange({ ...range, start: e.target.value })}
                bg={useColorModeValue("white", "gray.800")}
              />
            </FormControl>
            <FormControl>
              <FormLabel>End Date</FormLabel>
              <Input
                type="date"
                value={range.end}
                onChange={(e) => setRange({ ...range, end: e.target.value })}
                bg={useColorModeValue("white", "gray.800")}
              />
            </FormControl>
          </Grid>

          {data && (
            <VStack spacing={6} align="stretch">
              <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
                  <CardBody>
                    <Stat>
                      <StatLabel fontSize="sm" color="gray.500">
                        <DollarSign size={16} style={{ display: "inline" }} />{" "}
                        Total Revenue
                      </StatLabel>
                      <StatNumber fontSize="2xl">
                        {formatCurrency(data.getSalesAnalytics.totalRevenue)}
                      </StatNumber>
                    </Stat>
                  </CardBody>
                </Card>

                <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
                  <CardBody>
                    <Stat>
                      <StatLabel fontSize="sm" color="gray.500">
                        <TrendingUp size={16} style={{ display: "inline" }} />{" "}
                        Completed Orders
                      </StatLabel>
                      <StatNumber fontSize="2xl">
                        {data.getSalesAnalytics.completedOrders}
                      </StatNumber>
                    </Stat>
                  </CardBody>
                </Card>
              </Grid>

              <Card
                bg={cardBg}
                borderWidth="1px"
                borderColor={borderColor}
                p={4}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={4}
                >
                  <Heading size="md">Revenue by Category</Heading>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent={"space-between"}
                    gap={2}
                  >
                    <Text fontSize="sm" color="gray.500">
                      From {format(new Date(range.start), "MMM d, yyyy")}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      To {format(new Date(range.end), "MMM d, yyyy")}
                    </Text>
                    <ButtonGroup isAttached variant="outline" size="sm">
                      <IconButton
                        aria-label="Bar Chart"
                        icon={<BarChart2 size={18} />}
                        onClick={() => setChartType("bar")}
                        isActive={chartType === "bar"}
                      />
                      <IconButton
                        aria-label="Pie Chart"
                        icon={<PieChartIcon size={18} />}
                        onClick={() => setChartType("pie")}
                        isActive={chartType === "pie"}
                      />
                    </ButtonGroup>
                  </Box>
                </Box>

                <Box height="400px">
                  {chartType === "bar" ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={data.getSalesAnalytics.revenuePerCategory}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="category"
                          tick={{ fontSize: 12 }}
                          interval={0}
                          angle={-45}
                          textAnchor="end"
                          height={70}
                        />
                        <YAxis
                          tickFormatter={(value) => `$${value}`}
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip
                          formatter={(value) => [`$${value}`, "Revenue"]}
                          contentStyle={{
                            backgroundColor: useColorModeValue(
                              "#fff",
                              "#2D3748"
                            ),
                            border: "none",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                        <Bar
                          dataKey="revenue"
                          fill="#3182CE"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={data.getSalesAnalytics.revenuePerCategory}
                          dataKey="revenue"
                          nameKey="category"
                          outerRadius={150}
                          label
                        >
                          {data.getSalesAnalytics.revenuePerCategory.map(
                            (_, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={chartColors[index % chartColors.length]}
                              />
                            )
                          )}
                        </Pie>
                        <Legend />
                        <Tooltip
                          formatter={(value) => [`$${value}`, "Revenue"]}
                          contentStyle={{
                            backgroundColor: useColorModeValue(
                              "#fff",
                              "#2D3748"
                            ),
                            border: "none",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </Box>
              </Card>
            </VStack>
          )}
        </CardBody>
      </Card>
    </Box>
  );
}
