import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { Search, X } from "lucide-react";
import { GET_CUSTOMER_SPENDING } from "../graphql/queries";
import CustomerStats from "../components/CostumerStats";
import ErrorDisplay from "../components/ErrorDisplay";
import LoadingState from "../components/LoadingState";

export default function SearchForm() {
  const [customerId, setCustomerId] = useState("");
  const [submittedId, setSubmittedId] = useState(null);

  const { data, loading, error } = useQuery(GET_CUSTOMER_SPENDING, {
    variables: { customerId: submittedId || "" },
    skip: !submittedId,
  });

  const handleSearch = () => {
    if (customerId.trim()) {
      setSubmittedId(customerId);
    }
  };

  const clearSearch = () => {
    setCustomerId("");
    setSubmittedId(null);
  };

  return (
    <VStack spacing={6} align="stretch">
      <FormControl>
        <FormLabel fontWeight="medium">Customer ID</FormLabel>
        <InputGroup size="lg">
          <Input
            placeholder="Enter Customer ID"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            pr="4.5rem"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          {customerId && (
            <InputRightElement width="2.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={clearSearch}
                variant="ghost"
                color="gray.500"
              >
                <X size={16} />
              </Button>
            </InputRightElement>
          )}
        </InputGroup>
      </FormControl>

      <Button
        leftIcon={<Search size={18} />}
        onClick={handleSearch}
        isDisabled={!customerId.trim()}
        size="lg"
        w="full"
        isLoading={loading}
        loadingText="Searching..."
      >
        Search
      </Button>

      <Box mt={4}>
        {loading && <LoadingState />}
        {error && <ErrorDisplay error={error} />}
        {data && <CustomerStats data={data.getCustomerSpending} />}
      </Box>
    </VStack>
  );
}
