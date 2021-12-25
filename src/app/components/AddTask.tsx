import { Box, Button, HStack, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addTask, taskStatus } from "../slices/taskSlice";
import { useAppDispatch } from "../store";

interface AddTaskProps {
  status: taskStatus;
}

export default function AddTask({ status }: AddTaskProps) {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset } = useForm();
  const [isInputMode, setIsInputMode] = useState(false);
  useEffect(() => {
    if (!isInputMode) reset();
  }, [isInputMode]);
  return isInputMode ? (
    <Box>
      <Textarea
        variant="filled"
        size="lg"
        placeholder="Enter a title for this task"
        {...register("title", {
          required: "This is required",
        })}
      />
      <HStack mt="1rem">
        <Button
          flex="1"
          p="2rem"
          fontSize="xl"
          onClick={handleSubmit((data) => {
            dispatch(
              addTask({
                title: data.title,
                status,
                createdAt: new Date(),
              })
            );
            setIsInputMode(false);
          })}
        >
          Add
        </Button>
        <Button
          flex="1"
          p="2rem"
          fontSize="xl"
          onClick={() => setIsInputMode(false)}
        >
          Cancel
        </Button>
      </HStack>
    </Box>
  ) : (
    <Button p="2rem" fontSize="xl" onClick={() => setIsInputMode(true)}>
      Add Task
    </Button>
  );
}
