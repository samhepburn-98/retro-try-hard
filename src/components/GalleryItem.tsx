import * as React from "react";
import img1 from "../images/1.jpg";

import "./demo1.css";

const GalleryItem = () => {
    return (
        <figure className="gallery__item">
            <div className="gallery__item-img" >
                <div className="gallery__item-imginner" style={{ backgroundImage: `url(${img1})` }}></div>
            </div>
            <figcaption className="gallery__item-caption">
                <h2 className="gallery__item-title" data-scroll data-scroll-speed="2">Sommerset</h2>
                <span className="gallery__item-number">01</span>
                <p className="gallery__item-text">Amalia Lynn</p>
                <p className="gallery__item-text">1988</p>
            </figcaption>
        </figure>

    );
};

export default GalleryItem;
