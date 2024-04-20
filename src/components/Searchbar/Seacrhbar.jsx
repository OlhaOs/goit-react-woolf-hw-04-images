import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import css from './Searchbar.module.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      showMessage('Please, enter your query!');
      return;
    }

    onSubmit(query);
    setQuery('');
  };

  const handleChange = e => {
    setQuery(e.target.value);
  };
  const showMessage = message => {
    iziToast.info({
      message: message,
      position: 'topLeft',
      closeOnClick: true,
      timeout: 2500,
      pauseOnHover: true,
    });
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <FiSearch />
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

export default Searchbar;
