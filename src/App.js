import React from "react";
import TodoListTemplate from "./components/js/TodoListTemplate";
import TodoItemList from "./components/js/TodoItemList";
import Form from "./components/js/Form";
class App extends React.Component {
  render() {
    return (
      <TodoListTemplate form={<Form />}>
        <TodoItemList />
      </TodoListTemplate>
    );
  }
}

export default App;
