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
    this.completed === false ? (this.completed = true) : (this.completed = false);
  }
  logTimeAdded() {
    console.log(this.timeAdded);
  }
}
export default Todo;
