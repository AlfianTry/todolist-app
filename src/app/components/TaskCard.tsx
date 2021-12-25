import { Box, Text } from "@chakra-ui/react";
import { Task } from "../services/taskApi";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <Box
      width="100%"
      height="96px"
      borderRadius="sm"
      background="white"
      boxShadow="md"
      cursor="pointer"
      p="1rem"
      mt={2}
      _hover={{ background: "gray.200" }}
    >
      <Text fontSize="xl" fontWeight="bold" isTruncated>
        {task.title}
      </Text>
      <Text fontSize="lg" isTruncated>
        {task.description}
      </Text>
    </Box>
  );
}
