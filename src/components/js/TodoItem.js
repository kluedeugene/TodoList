import React from "react";
import "../css/TodoItem.css";

class TodoItem extends React.Component {
  render() {
    const { content, isComplete, id, onToggle, onRemove } = this.props;
    console.log(id);
    return (
      <div className="todo-item" onClick={() => onToggle(id)}>
        <div
          className="todo-item-remove"
          onClick={(e) => {
            e.stopPropagation(); // onToggle 이 실행되지 않도록 함(이벤트의 확산을 막는다. 부모이벤트까지전달되지않게)
            onRemove(id);
          }}
        >
          &times;
        </div>
        <div className={`todo-item-content ${isComplete ? "isComplete" : ""}`}>
          <div>{content}</div>
        </div>
        {isComplete && <div className="isComplete-mark">✔</div>}
      </div>
    );
  }
}

export default TodoItem;
