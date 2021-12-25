import {
  HamburgerIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { taskStatus } from "../slices/taskSlice";

interface ITaskListProps {
  status: taskStatus;
}

export default function TaskList({ status }: ITaskListProps) {
  return (
    <Flex
      m="2rem 1rem 1rem 2rem"
      p="1rem"
      flexDirection="column"
      backgroundColor="gray.300"
      height="fit-content"
    >
      <Flex justifyContent="space-between" alignItems="center" mb="1rem">
        <Text fontSize="4xl" fontWeight="bold">
          {status === taskStatus.todo ? "To Do" : "Done"}
        </Text>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Sort data"
            icon={<HamburgerIcon />}
            variant="ghost"
          />
          <MenuList>
            <MenuItem icon={<ArrowUpIcon />}>Sort Oldest to Newest</MenuItem>
            <MenuItem icon={<ArrowDownIcon />}>Sort Newest to Oldest</MenuItem>
            <MenuItem icon={<DeleteIcon />}>Remove All Tasks</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}
