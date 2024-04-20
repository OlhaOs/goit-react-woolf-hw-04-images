import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images }) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          smallUrl={image.webformatURL}
          largeImageURL={image.largeImageURL}
          alt={image.tags}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
