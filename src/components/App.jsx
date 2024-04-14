import Searchbar from './Searchbar/Seacrhbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Bars } from 'react-loader-spinner';

import { Component } from 'react';
import { getSearchImageApi } from '../api';
import css from './App.module.css';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    loading: false,
    loadMore: true,
  };

  handleSubmit = query => {
    this.setState({ images: [], query, page: 1, loading: true });
  };

  getImageListOnQuery = async () => {
    const { data } = await getSearchImageApi(this.state.query, this.state.page);

    this.setState(prevState => ({
      images: prevState.images
        ? [...prevState.images, ...data.hits]
        : data.hits,
      loading: false,
    }));

    this.checkEndImages(data.totalHits);
  };

  checkEndImages(total) {
    if (total < this.state.page * 12) {
      this.setState({ loadMore: false });
    }
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
