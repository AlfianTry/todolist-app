import { SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
import TaskList from "./app/components/TaskList";
import TaskModal from "./app/components/TaskModal";
import { getDefaultTasks } from "./app/services/taskApi";
import { taskStatus, updateTaskStatus } from "./app/slices/taskSlice";
import { useAppDispatch } from "./app/store";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getDefaultTasks());
  }, []);
  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;
    dispatch(updateTaskStatus([draggableId, destination.droppableId]));
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <SimpleGrid columns={2} backgroundColor="blue.300" height="100vh">
        <TaskList status={taskStatus.todo} />
        <TaskList status={taskStatus.done} />
      </SimpleGrid>
      <TaskModal />
    </DragDropContext>
  );
}

export default App;
