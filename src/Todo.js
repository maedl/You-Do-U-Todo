// TODO: expand class

class Todo {
  constructor(title, category, dueDate, completed) {
    this.title = title;
    this.category = category;
    this.dueDate = dueDate;
    this.completed = completed;
  }
  toggleComplete() {
    if (this.completed === false) {
      this.completed = true;
    }
    else {
      this.completed = false;
    }
  }
}
export default Todo;
