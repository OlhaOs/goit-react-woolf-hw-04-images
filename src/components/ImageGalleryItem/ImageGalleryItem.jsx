import { useState } from 'react';
import css from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ smallUrl, alt, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <li className={css.ImageGalleryItem}>
        <img
          src={smallUrl}
          alt={alt}
          className={css.ImageGalleryItem_image}
          onClick={toggleModal}
        />
      </li>
      {showModal && (
        <Modal src={largeImageURL} alt={alt} onClose={toggleModal} />
      )}
    </>
  );
};
