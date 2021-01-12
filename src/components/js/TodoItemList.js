import React from "react";
import TodoItem from "./TodoItem";

class TodoItemList extends React.Component {
  render() {
    //todos= todo객체배열  ontoggle=체크박스 on/off  onRemove=todo 객체 삭제
    const { todos, onToggle, onRemove } = this.props;
    return (
      <div>
        <div>
          <TodoItem content="TodoItem1" />
          <TodoItem content="TodoItem2" />
          <TodoItem content="TodoItem3" />
        </div>
      </div>
    );
  }
}

export default TodoItemList;
