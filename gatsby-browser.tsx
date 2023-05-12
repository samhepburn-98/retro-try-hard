import * as React from "react";
import { GatsbyBrowser } from "gatsby";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";

const App = ({ children }: { children: React.ReactNode }) => {
    return (
        <ReactLenis root options={{
            ...{
                lerp: 0.2,
                smoothWheel: true,
                normalizeWheel: true
            }
        }}>
            <body>
            {children}
            </body>
        </ReactLenis>

    );
};

// Wraps the whole app
// eslint-disable-next-line import/prefer-default-export -- Plugins must export known APIs from their gatsby-browser
export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({ element }) => (
    <App>
        {element}
    </App>
);
