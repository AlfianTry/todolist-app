import {
  ArrowDownIcon,
  ArrowUpIcon,
  DeleteIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { taskStatus } from "../slices/taskSlice";
import { RootState, useAppSelector } from "../store";
import AddTask from "./AddTask";
import TaskCard from "./TaskCard";

interface ITaskListProps {
  status: taskStatus;
}

export default function TaskList({ status }: ITaskListProps) {
  const tasks = useAppSelector((state: RootState) => state.task.tasks);
  return (
    <Flex
      m="2rem 1rem"
      p="1rem"
      flexDirection="column"
      backgroundColor="gray.300"
      height="fit-content"
      maxHeight="92vh"
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
      <Box overflow="auto" mb={2}>
        {tasks
          ?.filter((task) => task.status === status)
          .sort((valueA, valueB) => {
            let dateA = valueA.createdAt;
            let dateB = valueB.createdAt;
            if (status === taskStatus.done) {
              [dateA, dateB] = [dateB, dateA];
            }
            return dateA.getTime() - dateB.getTime();
          })
          .map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
      </Box>
      <AddTask status={status} />
    </Flex>
  );
}
