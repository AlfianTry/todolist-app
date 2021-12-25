import { SimpleGrid } from "@chakra-ui/react";
import TaskList from "./app/components/TaskList";
import { taskStatus } from "./app/slices/taskSlice";

function App() {
  return (
    <SimpleGrid columns={2} backgroundColor="blue.300" height="100vh">
      <TaskList status={taskStatus.todo} />
      <TaskList status={taskStatus.done} />
    </SimpleGrid>
  );
}

export default App;
