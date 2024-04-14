import { Component } from 'react';
import { getSearchImageApi } from '../api';
import css from './App.module.css';
import Searchbar from './Searchbar/Seacrhbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Bars } from 'react-loader-spinner';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    loading: false,
    loadMore: true,
    error: '',
  };

  handleSubmit = query => {
    this.setState({ images: [], query, page: 1, loading: true });
  };

  getImageListOnQuery = async () => {
    try {
      this.setState({ loading: true, error: '' });
      const { data } = await getSearchImageApi(
        this.state.query,
        this.state.page
      );
      this.setState(prevState => ({
        images: prevState.images
          ? [...prevState.images, ...data.hits]
          : data.hits,
        loading: false,
      }));

      this.checkEndImages(data.totalHits);
    } catch (error) {
      this.setState({ error: error.message, loading: false });
      this.showMessage(error.message);
    }
  };

  checkEndImages(total) {
    if (total === 0) {
      this.showMessage(`We found nothing(`);
    } else if (total < this.state.page * 12) {
      this.setState({ loadMore: false });
      this.showMessage(`You've reached the end of the images.`);
    }
  }
  showMessage(message) {
    iziToast.info({
      message: message,
      position: 'topLeft',
      closeOnClick: true,
      timeout: 2500,
      pauseOnHover: true,
    });
  }

  componentDidUpdate(_, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      this.getImageListOnQuery();
      this.setState({ loading: true });
    }

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  handleLoadMoreClick = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1, loading: true };
    });
  };

  render() {
    const { images, loadMore, loading } = this.state;

    return (
      <>
        <div className={css.App}>
          <Searchbar onSubmit={this.handleSubmit} />
          <ImageGallery images={images} />
          {loading ? (
            <Bars
              height="60"
              width="120"
              color="#3f51b5"
              ariaLabel="bars-loading"
              wrapperClass={css.loader}
              visible={true}
            />
          ) : (
            images.length > 0 &&
            loadMore && <Button onLoadMoreClick={this.handleLoadMoreClick} />
          )}
        </div>
      </>
    );
  }
}
