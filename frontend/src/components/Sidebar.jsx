import {
  Box,
  Flex,
  Icon,
  IconButton,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { FiHome, FiBarChart2, FiShoppingBag } from "react-icons/fi";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useUIStore } from "../store/uiStore";

const navItems = [
  { label: "Dashboard", icon: FiHome, path: "/" },
  { label: "Top Products", icon: FiShoppingBag, path: "/top-products" },
  { label: "Sales Analytics", icon: FiBarChart2, path: "/sales-analytics" },
];

export default function Sidebar() {
  const isSidebarOpen = useUIStore((s) => s.isSidebarOpen);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const bg = useColorModeValue("white", "gray.900");
  const activeBg = useColorModeValue("gray.100", "gray.700");

  return (
    <Box position="fixed" top="0" left="0" h="100vh" zIndex="overlay">
      {/* Sidebar panel */}
      <Box
        bg={bg}
        w="240px"
        h="100%"
        boxShadow="md"
        transform={isSidebarOpen ? "translateX(0)" : "translateX(-100%)"}
        transition="transform 0.3s ease"
        position="absolute"
        top={0}
        left={0}
      >
        <Flex align="center" justify="space-between" px={4} pt={4} mb={6}>
          <Text fontSize="lg" fontWeight="bold">
            Sales & Revenue
          </Text>
        </Flex>

        <VStack align="stretch" spacing={1} px={2}>
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} end>
              {({ isActive }) => (
                <Flex
                  align="center"
                  gap={3}
                  py={2}
                  px={3}
                  borderRadius="md"
                  bg={isActive ? activeBg : "transparent"}
                  _hover={{ bg: activeBg }}
                  fontWeight={isActive ? "bold" : "medium"}
                  color={isActive ? "blue.500" : "inherit"}
                  transition="all 0.2s"
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      useUIStore.getState().closeSidebar();
                    }
                  }}
                >
                  <Icon as={item.icon} boxSize={5} />
                  <Text>{item.label}</Text>
                </Flex>
              )}
            </NavLink>
          ))}
        </VStack>
      </Box>

      <IconButton
        icon={<HamburgerIcon />}
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
        position="absolute"
        top="1rem"
        left={isSidebarOpen ? "240px" : "0.5rem"}
        transform={isSidebarOpen ? "none" : "translateX(0)"}
        transition="left 0.3s ease"
        zIndex="popover"
        variant="outline"
        size="sm"
        bg="white"
        boxShadow="md"
      />
    </Box>
  );
}
