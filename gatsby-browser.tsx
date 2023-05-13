import * as React from "react";
import { useRef } from "react";
import { GatsbyBrowser } from "gatsby";
import { LocomotiveScrollProvider } from "./src/hooks/LocomotiveScrollContext";
import "./src/components/scroll.css";

const App = ({ children }: { children: React.ReactNode }) => {
    const componentRef = useRef(null); // create a ref for the root level element (for scoping)

    return (
        <LocomotiveScrollProvider
            containerRef={componentRef}
            options={{
                smooth: true
            }}
            watch={[]}
        >
            <body data-scroll-container="true">
            {children}
            </body>
        </LocomotiveScrollProvider>
    );
};

// Wraps the whole app
// eslint-disable-next-line import/prefer-default-export -- Plugins must export known APIs from their gatsby-browser
export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({ element }) => (
    <App>
        {element}
    </App>
);
