import * as React from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { HeadFC, PageProps } from "gatsby";
import imagesLoaded from "imagesloaded";
import img1 from "../images/1.01.jpg";
import img2 from "../images/2.01.jpg";
import img3 from "../images/3.01.jpg";
import img4 from "../images/4.01.jpg";
import img5 from "../images/5.01.jpg";
import gsap from "gsap";

import "../components/demo1.css";
import { useLocomotiveScroll } from "../hooks/useLocomotiveScroll";

const getRandomInteger = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

const preloadImages = (selector = "img") => {
    return new Promise((resolve) => {
        imagesLoaded(document.querySelectorAll(selector), { background: true }, resolve);
    });
};

const split = (str: string) => {
    return (
        str
            .split("")
            .map((item, index) => <span className="char" key={index}>{item}</span>)
    );
};

const entries = [img1, img2, img3, img4, img5, img1, img2, img3, img4, img5];

// Check if window is defined (so if in the browser or in node.js).
const isBrowser = typeof window !== "undefined";

const IndexPage: React.FC<PageProps> = () => {
    if (!isBrowser) return <></>;

    const entriesRef = useRef<(HTMLElement | null)[]>([]);
    useEffect(() => {
        entriesRef.current = entriesRef.current.slice(0, entries.length);
    }, [entries]);

    const titleRef = useRef<HTMLDivElement>(document.createElement("div"));

    const [isAnimating, setIsAnimating] = useState(true);

    const { scroll } = useLocomotiveScroll();
    useEffect(() => {
        scroll?.update()
    }, [scroll]);


    useLayoutEffect(() => {
            Promise.all([preloadImages(".gallery__item-imginner")]).then(() => {
                // Remove loader (loading class)
                document.querySelector(".body")?.classList.remove("loading");

                const gsapContext = gsap.context(() => {
                    // create the timeline
                    // let's start by animating the main intro text
                    const timeline = gsap.timeline().to(titleRef.current, {
                        duration: 1,
                        ease: "expo",
                        startAt: { y: "10%" },
                        y: "0%",
                        opacity: 1
                    }, 0);

                    // now let's center the images (stack)
                    for (const [pos, item] of entriesRef.current.entries()) {
                        if (!item) continue;
                        const rect = item.getBoundingClientRect();
                        timeline.set(item.querySelector(".gallery__item-img"), {
                            x: window.innerWidth / 2 - rect.left - rect.width / 2,
                            y: window.innerHeight / 2 - rect.top - rect.height / 2,
                            scale: 0.6,
                            rotation: getRandomInteger(-10, 10),
                            opacity: 1,
                            delay: 0.2 * pos
                        }, 0);

                        // for the first image, we set a high scale for the inner image element
                        // later we will animate this scale value together with the scale value of the outer image
                        if (pos === 0) {
                            timeline.set(item.querySelector(".gallery__item-imginner"), {
                                scale: 1.8
                            }, 0);
                        }
                    }

                    // access the first and other images in the stack
                    const [firstImage, ...otherImages] = entriesRef.current.map(el => el?.querySelector(".gallery__item-img"));
                    if (otherImages && firstImage) {
                        timeline
                            .addLabel("startAnimation", "+=0")
                            // allow scroll and update the locomotive scroll
                            .add(() => {
                                console.log(document.querySelector(".body")?.classList.toString());
                                document.querySelector(".body")?.classList.remove("noscroll");
                                console.log(document.querySelector(".body")?.classList.toString());
                                console.log(scroll);
                                scroll?.update();
                            }, "startAnimation")
                            // animate the main title characters out and fade them out too
                            .to(titleRef.current.children, {
                                duration: 1,
                                ease: "expo",
                                x: (pos) => {
                                    return -40 * (Math.floor(titleRef.current.children.length / 2) - pos);
                                },
                                opacity: 0,
                                stagger: { from: "center" }
                            }, "startAnimation")

                            // the other images in the stack will animate its translation values randomly
                            .to(otherImages, {
                                duration: 1,
                                ease: "power3",
                                x: () => "+=" + getRandomInteger(-200, 200) + "%",
                                y: () => "+=" + getRandomInteger(-200, 200) + "%",
                                opacity: 0,
                                rotation: () => getRandomInteger(-20, 20)
                            }, "startAnimation")
                            // and then we make them appear in their final position in the grid
                            .to(otherImages, {
                                duration: 0.5,
                                ease: "expo",
                                startAt: {
                                    x: 0,
                                    y: 0,
                                    rotation: 0,
                                    scale: 0.8
                                },
                                scale: 1,
                                opacity: 1
                            })

                            // the first image will now animate to it's final position
                            .to(firstImage, {
                                duration: 1.2,
                                ease: "expo",
                                x: 0,
                                y: 0,
                                scale: 1,
                                rotation: 0,
                                opacity: 1
                            }, "startAnimation")
                            // both the image and inner image animate the scale value to achieve the "reveal effect"
                            .to(entriesRef.current[0]!.querySelector(".gallery__item-imginner"), {
                                duration: 1.2,
                                ease: "expo",
                                scale: 1
                            }, "startAnimation");
                    }

                    // finally, animate the gallery item's content elements (title, number and texts)
                    for (const [pos, item] of entriesRef.current.entries()) {
                        if (!item) continue;
                        const title = item.querySelector(".gallery__item-title");
                        if (!title) continue;
                        const chars = title.querySelectorAll(".char");
                        if (!chars) continue;

                        timeline
                            .add(() => {
                                if (pos === entriesRef.current.length - 1) setIsAnimating(false);
                            }, "startAnimation+=0.5")
                            .to(chars, {
                                duration: 2,
                                ease: "expo",
                                startAt: {
                                    opacity: 0,
                                    x: pos => -40 * (Math.floor(chars.length / 2) - pos)
                                },
                                x: 0,
                                opacity: 1,
                                stagger: { from: "center" }
                            }, "startAnimation")
                            .to([
                                item!.querySelector(".gallery__item-number"),
                                item!.querySelector(".gallery__item-text")
                            ], {
                                duration: 2,
                                ease: "power1",
                                startAt: { opacity: 0 },
                                opacity: 1,
                                stagger: 0.04
                            }, "startAnimation+=0.3");
                    }
                });
                return () => gsapContext.revert(); // cleanup
            });
        }, []
    );

    return (
        <div className="body loading" data-scroll-section="true">
            <div className="main">
                <h2 className="title" ref={titleRef} style={{ opacity: 0 }}>
                    {split("R T H")}
                </h2>
                <div className="gallery">
                    {
                        entries.map((item, i) => (
                            <figure
                                key={i}
                                ref={el => entriesRef.current[i] = el}
                                className="gallery__item"
                            >
                                <div
                                    className="gallery__item-img"
                                    onMouseEnter={() => {
                                        if (isAnimating) return false;
                                        // if (this.inStack) return false;
                                        const ref = entriesRef.current[i];
                                        if (!ref) return false;
                                        const img = ref.querySelector(".gallery__item-img");
                                        if (!img) return false;
                                        const imgInner = ref.querySelector(".gallery__item-imginner");
                                        if (!imgInner) return false;
                                        const title = ref.querySelector(".gallery__item-title");
                                        if (!title) return false;
                                        const captionChars = title.querySelectorAll(".char");
                                        if (!captionChars) return false;
                                        gsap
                                            .timeline({ defaults: { duration: 1, ease: "expo" } })
                                            .to(img, { scale: 0.95 })
                                            .to(imgInner, { scale: 1.2 }, 0)
                                            .to(captionChars, {
                                                x: pos => -10 * (Math.floor(captionChars.length / 2) - pos),
                                                stagger: { from: "center" }
                                            }, 0);
                                    }}
                                    onMouseLeave={() => {
                                        if (isAnimating) return false;
                                        const ref = entriesRef.current[i];
                                        if (!ref) return false;
                                        const img = ref.querySelector(".gallery__item-img");
                                        if (!img) return false;
                                        const imgInner = ref.querySelector(".gallery__item-imginner");
                                        if (!imgInner) return false;
                                        const title = ref.querySelector(".gallery__item-title");
                                        if (!title) return false;
                                        const captionChars = title.querySelectorAll(".char");
                                        if (!captionChars) return false;
                                        gsap
                                            .timeline({ defaults: { duration: 1, ease: "expo" } })
                                            .to([img, imgInner], { scale: 1 })
                                            .to(captionChars, { x: 0 }, 0);
                                    }}
                                    style={{ opacity: 0 }}
                                >
                                    <div className="gallery__item-imginner"
                                         style={{ backgroundImage: `url(${entries[i]})` }}></div>
                                </div>
                                <figcaption className="gallery__item-caption">
                                    <h2 className="gallery__item-title" data-scroll="true" data-scroll-speed="2">
                                        {split(i === 0 ? "Chesterfield" : "Sommerset")}
                                    </h2>
                                    <span className="gallery__item-number">01</span>
                                    <p className="gallery__item-text">Amalia Lynn</p>
                                    <p className="gallery__item-text">1988</p>
                                </figcaption>
                            </figure>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
