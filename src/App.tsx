import { SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
import TaskList from "./app/components/TaskList";
import TaskModal from "./app/components/TaskModal";
import { getDefaultTasks } from "./app/services/taskApi";
import { taskStatus } from "./app/slices/taskSlice";
import { useAppDispatch } from "./app/store";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getDefaultTasks());
  }, []);
  return (
    <>
      <SimpleGrid columns={2} backgroundColor="blue.300" height="100vh">
        <TaskList status={taskStatus.todo} />
        <TaskList status={taskStatus.done} />
      </SimpleGrid>
      <TaskModal />
    </>
  );
}

export default App;
