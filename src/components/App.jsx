import { getSearchImageApi } from '../api';
import css from './App.module.css';
import Searchbar from './Searchbar/Seacrhbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Bars } from 'react-loader-spinner';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { useEffect, useState } from 'react';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(true);

  const handleSubmit = query => {
    setImages([]);
    setQuery(query);
    setPage(1);
  };

  useEffect(() => {
    getImageListOnQuery();

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page]);

  const getImageListOnQuery = async () => {
    if (query === '') return;
    setLoading(true);
    try {
      const { data } = await getSearchImageApi(query, page);
      setImages(prevImages => [...prevImages, ...data.hits]);
      checkEndImages(data.totalHits);
    } catch (error) {
      showMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const checkEndImages = total => {
    if (total === 0) {
      showMessage(`We found nothing(`);
    } else if (total < page * 12) {
      setLoadMore(false);
      showMessage(`You've reached the end of the images.`);
    }
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

  const handleLoadMoreClick = () => {
    setPage(page + 1);
  };

  return (
    <>
      <div className={css.App}>
        <Searchbar onSubmit={handleSubmit} />
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
          loadMore && <Button onLoadMoreClick={handleLoadMoreClick} />
        )}
      </div>
    </>
  );
};
