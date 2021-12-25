import { Button, HStack, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddTask() {
  const { register, handleSubmit, reset } = useForm();
  const [inputMode, setInputMode] = useState(false);
  return inputMode ? (
    <>
      <Input
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
          onClick={handleSubmit((data) => console.log(data))}
        >
          Add
        </Button>
        <Button
          flex="1"
          p="2rem"
          fontSize="xl"
          onClick={() => {
            setInputMode(false);
            reset();
          }}
        >
          Cancel
        </Button>
      </HStack>
    </>
  ) : (
    <Button p="2rem" fontSize="xl" onClick={() => setInputMode(true)}>
      Add Task
    </Button>
  );
}
