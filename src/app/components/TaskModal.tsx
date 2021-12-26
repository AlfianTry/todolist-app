import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Input,
  Select,
  VStack,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  removeTask,
  setOpenModal,
  Task,
  taskStatus,
  updateTask,
} from "../slices/taskSlice";
import { RootState, useAppDispatch, useAppSelector } from "../store";

export default function TaskModal() {
  const dispatch = useAppDispatch();
  const { isOpen, task } = useAppSelector(
    (state: RootState) => state.task.modalState
  );
  const { register, handleSubmit, control, reset } = useForm<Task>({
    defaultValues: {
      title: task?.title,
      status: task?.status,
      description: task?.description,
    },
  });
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsUpdate(false);
      reset();
    }
  }, [isOpen]);

  return (
    <Modal
      id={task?.id?.toString()}
      isOpen={isOpen}
      size="xl"
      onClose={() => dispatch(setOpenModal({ isOpen: false }))}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isUpdate ? (
            <VStack>
              <Input
                placeholder="Input task title here"
                size="lg"
                defaultValue={task?.title}
                {...register("title", {
                  required: "This is required",
                })}
              />
              <Controller
                control={control}
                name="status"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Select
                    defaultValue={task?.status}
                    value={value}
                    onChange={onChange}
                  >
                    <option value={taskStatus.todo}>To Do</option>
                    <option value={taskStatus.done}>Done</option>
                  </Select>
                )}
              />
            </VStack>
          ) : (
            <>
              <Text fontSize="2xl">{task?.title}</Text>
              <Text fontSize="lg" fontWeight="light">
                in list {task?.status === taskStatus.todo ? "To Do" : "Done"} |
                Created at {task?.createdAt.toLocaleDateString()}
              </Text>
            </>
          )}
        </ModalHeader>
        {!isUpdate && <ModalCloseButton />}
        <ModalBody>
          <Text fontSize="xl" fontWeight="bold">
            Description
          </Text>
          {!isUpdate ? (
            <Text>{task?.description}</Text>
          ) : (
            <Textarea
              size="lg"
              defaultValue={task?.description}
              placeholder="Enter description for this task"
              {...register("description", {
                required: false,
              })}
            />
          )}
        </ModalBody>

        <ModalFooter>
          {isUpdate ? (
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                setIsUpdate(false);
                reset();
              }}
            >
              Cancel
            </Button>
          ) : (
            task?.status === taskStatus.todo && (
              <Button
                colorScheme="red"
                mr={3}
                onClick={() => {
                  dispatch(removeTask(task));
                  dispatch(setOpenModal({ isOpen: false }));
                }}
              >
                Remove
              </Button>
            )
          )}
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              if (isUpdate) {
                handleSubmit((data: any) => {
                  console.log(data);
                  dispatch(
                    updateTask({
                      id: task?.id,
                      title: data.title ?? "",
                      description: data.description,
                      status: data.status
                        ? parseInt(data.status)
                        : task?.status ?? 0,
                      createdAt: new Date(),
                    })
                  );
                  setIsUpdate(false);
                  reset();
                })();
              } else {
                setIsUpdate(true);
              }
            }}
          >
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
