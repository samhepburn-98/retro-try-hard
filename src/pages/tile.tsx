import * as React from "react";
import { useRef } from "react";

import "../components/tile.css";
// <img alt="" src={img8} className="example"/>
import img1 from "../images/1.jpg";
import img2 from "../images/2.jpg";
import img3 from "../images/3.jpg";
import img4 from "../images/4.jpg";
import img5 from "../images/5.jpg";
import img101 from "../images/1.01.jpg";
import img201 from "../images/2.01.jpg";
import img301 from "../images/3.01.jpg";
import img401 from "../images/4.01.jpg";
import img501 from "../images/5.01.jpg";
import { useLocomotiveScroll } from "../hooks/useLocomotiveScroll";

const getRandomInteger = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

const imgs = [img1, img2, img3, img4, img5, img101, img201, img301, img401, img501];

const Tile = () => {

    const headerRef = useRef<HTMLElement>(null);
    const { scroll } = useLocomotiveScroll();
    const onReturnToTop = () => {
        console.log(scroll, headerRef);
        if (scroll && headerRef.current) scroll.scrollTo(headerRef.current.getBoundingClientRect().y);
    };

    return (
        <div className="body demo-2 loading" data-scroll-section="true">
            <section ref={headerRef} className="content content--fixed" id="header">
            </section>
            <section className="tiles tiles--columns-rotated tiles--darker" id="grid">
                <div className="tiles__wrap">
                    <div className="tiles__line" data-scroll="true" data-scroll-speed="1"
                         data-scroll-target="#grid">
                        <div className="tiles__line-img" style={{ backgroundImage: `url(${img1})` }}></div>
                        <div className="tiles__line-img" style={{ backgroundImage: `url(${img1})` }}></div>
                        <div className="tiles__line-img" style={{ backgroundImage: `url(${img1})` }}></div>
                        <div className="tiles__line-img" style={{ backgroundImage: `url(${img1})` }}></div>
                        <div className="tiles__line-img" style={{ backgroundImage: `url(${img1})` }}></div>
                    </div>
                    <div className="tiles__line" data-scroll="true" data-scroll-speed="-1"
                         data-scroll-target="#grid">
                        {
                            [...Array(30)].map((index) => (
                                <img key={index} alt="" src={imgs[getRandomInteger(0, 10)]} className="example"/>
                            ))
                        }
                    </div>
                    <div className="tiles__line" data-scroll="true" data-scroll-speed="1"
                         data-scroll-target="#grid">
                        {
                            [...Array(30)].map((index) => (
                                <img key={index} alt="" src={imgs[getRandomInteger(0, 9)]} className="example"/>
                            ))
                        }
                    </div>
                    <div className="tiles__line" data-scroll="true" data-scroll-speed="-1"
                         data-scroll-target="#grid">
                        {
                            [...Array(30)].map((index) => (
                                <img key={index} alt="" src={imgs[getRandomInteger(0, 9)]} className="example"/>
                            ))
                        }
                    </div>
                    <div className="tiles__line" data-scroll="true" data-scroll-speed="1"
                         data-scroll-target="#grid">
                        {
                            [...Array(30)].map((index) => (
                                <img key={index} alt="" src={imgs[getRandomInteger(0, 9)]} className="example"/>
                            ))
                        }
                    </div>
                </div>
                <h2 className="tiles__title">R T H</h2>
            </section>
            <section className="content">
                <p className="content__text content__text--centered" data-scroll="true"
                   data-scroll-speed="4">
                    In 2020 I started taking photos of my friends using 35mm film. An honest look into the world around
                    me.
                    <br/><br/>3 Years later,<br/><br/><br/>I'm still here.</p>
            </section>
            <section className="content content--feature">
                <p className="content__breakout content__breakout--big" data-scroll="true"
                   data-scroll-direction="horizontal"
                   data-scroll-speed="1">pursuit of happiness</p>
                <p className="content__breakout content__breakout--medium" data-scroll="true"
                   data-scroll-direction="horizontal"
                   data-scroll-speed="2">the right to experiment with your own consciousness</p>
            </section>
            <section className="tiles tiles--small" id="grid2">
                <div className="tiles__wrap"></div>
                <div className="tiles__line">
                    <div className="tiles__line-img" data-scroll="true" data-scroll-speed="1"
                         data-scroll-target="#grid2" style={{ backgroundImage: `url(${img1})` }}></div>
                    <div className="tiles__line-img" data-scroll="true" data-scroll-speed="-1"
                         data-scroll-target="#grid2" style={{ backgroundImage: `url(${img1})` }}></div>
                    <div className="tiles__line-img" data-scroll="true" data-scroll-speed="1"
                         data-scroll-target="#grid2"
                         style={{ backgroundImage: `url(${img1})` }}></div>
                    <div className="tiles__line-img" data-scroll="true" data-scroll-speed="-1"
                         data-scroll-target="#grid2" style={{ backgroundImage: `url(${img1})` }}></div>
                    <div className="tiles__line-img" data-scroll="true" data-scroll-speed="1"
                         data-scroll-target="#grid2" style={{ backgroundImage: `url(${img1})` }}></div>
                    <div className="tiles__line-img" data-scroll="true" data-scroll-speed="-1"
                         data-scroll-target="#grid2" style={{ backgroundImage: `url(${img1})` }}></div>
                    <div className="tiles__line-img" data-scroll="true" data-scroll-speed="1"
                         data-scroll-target="#grid2" style={{ backgroundImage: `url(${img1})` }}></div>
                    <div className="tiles__line-img" data-scroll="true" data-scroll-speed="-1"
                         data-scroll-target="#grid2" style={{ backgroundImage: `url(${img1})` }}></div>
                </div>
            </section>
            <section className="content">
                <a onClick={onReturnToTop} className="backtop" data-scroll="true" data-scroll-speed="4">Back to the
                    top</a>
                <div className="frame frame--footer">
                    <a className="frame__author" href="https://instagram.com/retrotryhard">@retrotryhard</a>
                    <div className="frame__links">
                        <a href="https://tympanus.net/Development/videoTransitions/">Previous demo</a>
                        <a href="https://tympanus.net/codrops/?p=51396">Article</a>
                        <a href="https://github.com/codrops/TileScroll/">GitHub</a>
                    </div>
                </div>
            </section>
            <p>Hello world 2</p>
        </div>
    );
};

export default Tile;
