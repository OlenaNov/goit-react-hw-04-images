import Modal from "components/Modal";

import { Item, Image } from "./ImageGalleryItem.styled";
import { useState } from "react";

function ImageGalleryItem({ item }) {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(s => !s);
      };

        return (
            <>
            <Item 
                onClick={toggleModal}
            >
                <Image src={item.webformatURL} alt={item.tags} />
            </Item>
            {showModal && 
                <Modal 
                    onClose={toggleModal} 
                    children={() => <img src={item.largeImageURL} alt={item.tags} />} />}
            </>
        );
};

export default ImageGalleryItem;