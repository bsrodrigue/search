import { useState } from 'react';
import './App.css';

interface Book {
  id: number;
  title: string;
  pages: number;
};

const initialData: Book[] = [
  {
    id: 0,
    title: 'La joie de vivre',
    pages: 345,
  },
  {
    id: 1,
    title: 'Le monde nouveau',
    pages: 345,
  },
  {
    id: 2,
    title: 'Bella',
    pages: 345,
  },
  {
    id: 3,
    title: 'Rodrigue est un boss',
    pages: 345,
  },
  {
    id: 4,
    title: 'Rechercher est passionnant',
    pages: 345,
  },
];



function App() {

  const [data, setData] = useState<Book[]>(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [newItemTitle, setNewItemTitle] = useState('');

  function createNewBook() {
    if (!newItemTitle) return;
    let lastItemId = null;
    if (data.length !== 0) {
      lastItemId = data[data.length - 1].id;
    } else {
      lastItemId = 0;
    }
    const newItem = {
      id: lastItemId + 1,
      title: newItemTitle,
      pages: 200,
    };
    setData((previousData) => {
      return [...previousData, newItem]
    });
    setNewItemTitle('');
  }

  function deleteBook(id: number) {
    const newData = data.filter((item) => {
      return item.id !== id;
    });
    setData(newData);
  }

  return (
    <>
      <div className="container material-shadow">
        <input className="searchbar" placeholder="Chercher un livre de la liste..." onChange={(e) => {
          setSearchTerm(e.target.value);
        }} type="text" value={searchTerm} name="search" id="search" />


        <ul className='data-list'>
          <hr />
          {
            data.filter((entry) => {
              return entry.title.includes(searchTerm);
            }).map((entry) => (
              <>
                <li key={entry.id}>
                  <div>
                    <p>{entry.title}</p>
                    <small style={{ color: 'dimgrey', fontStyle: 'italic' }}>{entry.pages} pages</small>
                  </div>
                  <button
                    className='delete-button round-button color-button'
                    onClick={() => { deleteBook(entry.id) }}
                  >Supprimer</button>
                </li>
                <hr />
              </>
            ))
          }
          <div className='list-end'></div>
        </ul>

        <div className='new-data-form'>
          <input onChange={(e) => {
            setNewItemTitle(e.target.value);
          }} value={newItemTitle} type="text" name="title" id="" placeholder='Entrer le titre du livre...' />
          <button onClick={createNewBook} className='create-button color-button'>
            Ajouter
          </button>
        </div>

      </div>

    </>
  );
}

export default App;
