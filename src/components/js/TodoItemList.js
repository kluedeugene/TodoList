// todoitem 컴포넌트 여러개를 렌더링 해주는 역할
import React from "react";
import TodoItem from "./TodoItem";

class TodoItemList extends React.Component {
  // todos 값이 변경될 때 리렌더링이 일어나도록
  //this.props.todos 와 nextProps.todos 를 비교하여 이 값이 다를 경우에만 리렌더링
  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.props.todos !== nextProps.todos;
  // }

  render() {
    //todos= todo객체배열  ontoggle=체크박스 on/off  onRemove=todo 객체 삭제
    const { todos, onToggle, onRemove } = this.props;
    console.log(todos);

    const todoList = todos.map(({ id, content, isComplete }) => (
      <TodoItem
        id={id}
        content={content}
        isComplete={isComplete}
        onToggle={onToggle}
        onRemove={onRemove}
        key={id}
      />
    ));

    return <div>{todoList}</div>;
  }
}

export default TodoItemList;
