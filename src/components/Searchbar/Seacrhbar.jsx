import { Component } from 'react';
import { FiSearch } from 'react-icons/fi';
import css from './Searchbar.module.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

class Searchbar extends Component {
  state = {
    query: '',
  };
  handleSubmit = e => {
    e.preventDefault();

    if (this.state.query.trim() === '') {
      this.showMessage('Please, enter your query!');
      return;
    }

    this.props.onSubmit(this.state.query);
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };
  showMessage(message) {
    iziToast.info({
      message: message,
      position: 'topLeft',
      closeOnClick: true,
      timeout: 2500,
      pauseOnHover: true,
    });
  }

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <FiSearch />
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
