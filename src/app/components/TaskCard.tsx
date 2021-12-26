import { DeleteIcon, HamburgerIcon, ViewIcon } from "@chakra-ui/icons";
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
import { removeTask, setOpenModal, Task } from "../slices/taskSlice";
import { useAppDispatch } from "../store";
import { Draggable } from "react-beautiful-dnd";

interface TaskCardProps {
  task: Task;
  index: number;
}

export default function TaskCard({ task, index }: TaskCardProps) {
  const dispatch = useAppDispatch();
  return (
    <Draggable draggableId={task.id?.toString() ?? ""} index={index}>
      {(provided, snapshot) => (
        <Flex
          width="100%"
          height="96px"
          borderRadius="sm"
          background="white"
          boxShadow="md"
          cursor="pointer"
          p="1rem"
          mt={2}
          justifyContent="space-between"
          _hover={{ background: "gray.200" }}
          onClick={(event) => {
            dispatch(setOpenModal({ isOpen: true, task }));
          }}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <Box>
            <Text fontSize="xl" fontWeight="bold" isTruncated>
              {task.title}
            </Text>
            <Text fontSize="lg" isTruncated>
              {task.description}
            </Text>
          </Box>
          <Menu autoSelect={false}>
            <MenuButton
              as={IconButton}
              aria-label="Sort data"
              icon={<HamburgerIcon />}
              onClick={(event) => {
                event.stopPropagation();
                return false;
              }}
              variant="ghost"
            />
            <MenuList>
              <MenuItem
                icon={<ViewIcon />}
                onClick={(event) => {
                  dispatch(setOpenModal({ isOpen: true, task }));
                }}
              >
                View Detail
              </MenuItem>
              <MenuItem
                icon={<DeleteIcon />}
                onClick={() => dispatch(removeTask(task))}
              >
                Remove Task
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      )}
    </Draggable>
  );
}
