import { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import Modal from 'components/Modal/Modal';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  render() {
    const { smallUrl, alt, largeImageURL } = this.props;
    return (
      <>
        <li className={css.ImageGalleryItem}>
          <img
            src={smallUrl}
            alt={alt}
            className={css.ImageGalleryItem_image}
            onClick={this.toggleModal}
          />
        </li>
        {this.state.showModal && (
          <Modal src={largeImageURL} alt={alt} onClose={this.toggleModal} />
        )}
      </>
    );
  }
}

export default ImageGalleryItem;
