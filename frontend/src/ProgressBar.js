import React from "react"

export default () => {

    const fullWidth = 38;
    const current = 50;
    const max = 100;

    const percent = current/max;
    const pixelFill = Math.floor(fullWidth * percent);

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={80*4} viewBox="0 -0.5 80 10" shape-rendering="crispEdges">
            <metadata>Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj</metadata>
            <path stroke="#000000" d="M2 0h76M1 1h1M78 1h1M0 2h1M2 2h76M79 2h1M0 3h1M2 3h1M77 3h1M79 3h1M0 4h1M2 4h1M77 4h1M79 4h1M0 5h1M2 5h1M77 5h1M79 5h1M0 6h1M2 6h1M77 6h1M79 6h1M0 7h1M2 7h76M79 7h1M1 8h1M78 8h1M2 9h76" />
            <path stroke="#e9c530" d="M2 1h76M1 2h1M78 2h1M1 3h1M78 3h1M1 4h1M78 4h1M1 5h1M78 5h1M1 6h1M78 6h1M1 7h1M78 7h1M2 8h76" />
            <path stroke="#383838" d="M3 3h74" />
            <path stroke="#52514d" d="M3 4h74M3 5h74M3 6h74" />

            <rect fill="green" x={3} y={2.5} width={38} height={3} />
        </svg>
    )
}