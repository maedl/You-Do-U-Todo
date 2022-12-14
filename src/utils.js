/**
 * testar layout med 8 exempel-todos
 */
export function addExampleTodos(element) {
  let todoSection = element;
  todoSection.innerHTML = `
  <h2>
    To do:
  </h2>
  `;

  for (let i = 0; i < 8; i++) {
    todoSection.innerHTML += `
    <div class="todo">
    <div class="left-grid">
      <input type="checkbox">
    </div>
    <div class="middle-grid">
      <p>Gör en todo-app</p>
      <div class="date-section">Datum</div>
    </div>
    <div class="right-grid">
      <div class="icon1">1</div>
      <div class="icon2">2</div>
    </div>
    `;
  }
}
