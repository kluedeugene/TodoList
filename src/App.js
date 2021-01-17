import React from "react";
import TodoListTemplate from "./components/js/TodoListTemplate";
import TodoItemList from "./components/js/TodoItemList";
import Form from "./components/js/Form";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.id = 0;
    this.state = {
      //Form.js에서 Hook(usestate)사용으로 인해 제거.
      // input: "",
      todos: [],
    };
    // this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    // this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.hadleInitinfo = this.hadleInitinfo.bind(this);
  }

  componentDidMount() {
    this.hadleInitinfo();
  }

  hadleInitinfo() {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((todos) => this.setState({ todos: todos }))
      .catch((err) => console.log(err));
  }

  //Form.js에서 hook 사용으로 인해 제거
  // handleChange(event) {
  //   this.setState({
  //     input: event.target.value,
  //   });
  // }

  //Form.js 에서 Hook 사용으로 인해 statedptj input을 제외하고
  //parameter로 받는다.
  //등록
  handleCreate(inputValue) {
    const { todos } = this.state;
    if (inputValue === "") {
      alert("오늘 할일을 입력해주세요.");
      return;
    }
    //화면에서 먼저 변경사항을 보여주는 방법으로 이용
    this.setState({
      input: "",
      todos: todos.concat({
        //배열안에 데이터를 추가한다. 새배열을 만든다.
        id: this.id++,
        content: inputValue,
        isComplete: false,
      }),
    });

    const data = {
      bodu: JSON.stringify({ contet: inputValue }),
      headers: { "Content-Type": "application/json" },
      method: "post",
    };
    fetch("/api/todos", data)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        } else {
          return this.handleInitinfo();
        }
      })
      .catch((err) => console.log(err));
  }

  //Form.js에서 hook 사용으로 인해 제거
  // handleKeyPress(event) {
  //   if (event.key === "Enter") {
  //     this.handleCreate();
  //   }
  // }

  handleToggle(id) {
    const { todos } = this.state;
    const isComplete = todos.find((todo) => todo.id === id).isComplete;
    if (
      !window.confirm(
        isComplete ? "미완료 처리 하시겠습니까?" : "완료 처리 하시겠습니까?"
      )
    ) {
      return;
    }
    //인자로 받은 id를 몇번째 아이템인지 찾는다.
    const index = todos.findIndex((todo) => todo.id === id);
    //선택한 객체를 저장한다.
    const selected = todos[index];
    //배열을 복사한다.
    const nextTodos = [...todos];

    //기존의 값을 복사하고 isComplete 값을 덮어쓴다.
    nextTodos[index] = {
      ...selected,
      isComplete: !selected.isComplete,
    };

    this.setState({
      todos: nextTodos,
    });
    const data = {
      headers: { "Content-Type": "application/json" },
      method: "put",
    };
    fetch("api/todos/" + id, data)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        } else {
          return this.handleInitinfo();
        }
      })
      .catch((err) => console.log(err));
  }

  handleRemove(id) {
    const { todos } = this.state;
    const removeContent = todos.find((todo) => todo.id === id).content;
    if (!window.confirm("" + removeContent + "을 삭제하시겠습니까?")) {
      return;
    }

    this.setState({
      todos: todos.filter((todo) => todo.id !== id),
    });

    const data = {
      headers: { "Content-Type": "application/json" },
      method: "delete",
    };
    fetch("/api/todos/" + id, data)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        } else {
          return this.handleInitInfo();
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <TodoListTemplate
        form={
          <Form
            //Hook사용으로 제거
            // value={this.state.input}
            // onChange={this.handleChange}
            // onKeyPress={this.handleKeyPress}
            onCreate={this.handleCreate}
          />
        }
      >
        <TodoItemList
          todos={this.state.todos}
          onToggle={this.handleToggle}
          onRemove={this.handleRemove}
        />
      </TodoListTemplate>
    );
  }
}

export default App;
