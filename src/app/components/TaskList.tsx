import { Flex, Text } from "@chakra-ui/react";
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
      </Flex>
    </Flex>
  );
}
