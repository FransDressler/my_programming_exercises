import '../styles/styles.scss';

import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faSun
} from "@fortawesome/free-solid-svg-icons";
import { Josefin_Sans } from 'next/font/google';
 
// If loading a variable font, you don't need to specify the font weight
const josefin_Sans = Josefin_Sans({ subsets: ['latin'] })

type Todo = {
  text: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // const handleAddTodo = () => {
  //   if (inputValue.trim() !== '') {
  //     setTodos([...todos, { text: inputValue, completed: false }]);
  //     setInputValue('');
  //   }
  // };

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (inputValue.trim() !== '') {
          setTodos([...todos, { text: inputValue, completed: false }]);
          setInputValue('');
        }
  };


  const handleToggleCompleted = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleDeleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const remainingTasks = todos.filter((todo) => !todo.completed).length;

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return todo;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
  });

  

  return (
    <div className={josefin_Sans.className}>
    <div className={isDarkMode ? 'dark-mode page' : 'light-mode page'}>
    <div className={isDarkMode ? 'background-dark' : 'background-light'}></div>
    <div className="container">
      <div className="flex top-container">
        <h1>Todo</h1>
        <button onClick={toggleDarkMode} >
          {isDarkMode ? <FontAwesomeIcon
            icon={faSun} className="fa-3x"
          /> : <FontAwesomeIcon className="fa-3x"
          icon={faMoon}
        />}
        </button>
      </div>
      <form onSubmit={handleAddTodo}>
        <input className={josefin_Sans.className} type="text" placeholder="Create a todo..." value={inputValue} onChange={handleInputChange} />
        <button type="submit"><i className="fa-solid fa-plus"></i></button>
      </form>
        <ul>
          {filteredTodos.map((todo, index) => (
              <li key={index}>
                <button onClick={() => handleToggleCompleted(index)}>
                  {todo.completed ? <i className="fa-solid fa-check check-btn bg-gradient"></i> : <i className='check-btn'></i>}
                </button>
                <p className={todo.completed ? "todo-completed" : ""}>{todo.text}</p>
                <button onClick={() => handleDeleteTodo(index)}><i className="fa-solid fa-x delete-icon"></i></button>
              </li>
          ))}
        </ul>
        <div className="position-bottom">
          <div className='flex container-below'>
            <p>{remainingTasks} task(s) left</p>
            <button onClick={handleClearCompleted} className={josefin_Sans.className}>Clear Completed</button>
          </div>
          <div className='flex container-below select-toggles'>
            <button className={filter === 'all' ? 'active-filter' : ''} onClick={() => setFilter('all')}><p className={josefin_Sans.className}>All</p></button>
            <button className={filter === 'active' ? 'active-filter' : ''} onClick={() => setFilter('active')}><p className={josefin_Sans.className}>Active</p></button>
            <button className={filter === 'completed' ? 'active-filter' : ''} onClick={() => setFilter('completed')}><p className={josefin_Sans.className}>Completed</p></button>
          </div>
        </div>
    </div>
    </div>
    </div>
  );
}
