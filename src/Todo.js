// TODO: expand class

class Todo {
  constructor(title, category, dueDate, timeAdded, completed) {
    this.title = title;
    this.category = category;
    this.dueDate = dueDate;
    this.timeAdded = timeAdded;
    this.completed = completed;
  }
  toggleComplete() {
    this.completed = this.completed ? false : true;
  }
}
export default Todo;
