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
import { useState } from "react";
import { removeAllTasks, taskStatus } from "../slices/taskSlice";
import { RootState, useAppDispatch, useAppSelector } from "../store";
import AddTask from "./AddTask";
import TaskCard from "./TaskCard";
import { Droppable } from "react-beautiful-dnd";

interface ITaskListProps {
  status: taskStatus;
}

enum order {
  asc = "asc",
  desc = "desc",
}

export default function TaskList({ status }: ITaskListProps) {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state: RootState) => state.task.tasks);
  const [listOrder, setListOrder] = useState(
    status === taskStatus.todo ? order.asc : order.desc
  );
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
        <Menu autoSelect={false}>
          <MenuButton
            as={IconButton}
            aria-label="Sort data"
            icon={<HamburgerIcon />}
            variant="ghost"
          />
          <MenuList>
            <MenuItem
              icon={<ArrowUpIcon />}
              onClick={() => setListOrder(order.asc)}
            >
              Sort Oldest to Newest
            </MenuItem>
            <MenuItem
              icon={<ArrowDownIcon />}
              onClick={() => setListOrder(order.desc)}
            >
              Sort Newest to Oldest
            </MenuItem>
            <MenuItem
              icon={<DeleteIcon />}
              onClick={() => dispatch(removeAllTasks(status))}
            >
              Remove All Tasks
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Droppable droppableId={status.toString()}>
        {(provided, snapshot) => (
          <Box
            overflow="auto"
            mb={2}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks
              ?.filter((task) => task.status === status)
              .sort((valueA, valueB) => {
                let dateA = valueA.createdAt;
                let dateB = valueB.createdAt;
                if (listOrder === "desc") {
                  [dateA, dateB] = [dateB, dateA];
                }
                return dateA.getTime() - dateB.getTime();
              })
              .map((task, index) => (
                <TaskCard key={task.id} task={task} index={index} />
              ))}
          </Box>
        )}
      </Droppable>
      <AddTask status={status} />
    </Flex>
  );
}
