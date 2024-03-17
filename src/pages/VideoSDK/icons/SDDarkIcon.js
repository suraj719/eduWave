import * as React from "react";

const SDDarkIcon = (props) => (
  <svg
    width={92}
    height={56}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x={0.75}
      y={0.75}
      width={90.5}
      height={54.5}
      rx={5.25}
      stroke={props.strokeColor}
      strokeWidth={1.5}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 6a2 2 0 0 0-2 2v40a2 2 0 0 0 2 2h76a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H8Zm35.21 23.477c.063.161.095.343.095.546 0 .256-.065.485-.196.688-.125.203-.32.362-.586.477-.26.114-.593.171-1 .171-.333 0-.64-.034-.921-.101a1.98 1.98 0 0 1-.72-.328 1.501 1.501 0 0 1-.46-.594c-.11-.245-.164-.544-.164-.898h-2.352c0 .64.133 1.195.399 1.664.265.468.62.854 1.062 1.156.448.302.946.528 1.492.68a6.432 6.432 0 0 0 1.664.218c.625 0 1.19-.07 1.696-.21a3.93 3.93 0 0 0 1.304-.618c.365-.27.644-.601.836-.992.193-.39.29-.833.29-1.328 0-.469-.081-.888-.243-1.258-.161-.37-.4-.7-.718-.992a5.057 5.057 0 0 0-1.188-.79 10.388 10.388 0 0 0-1.633-.632c-.37-.115-.695-.232-.976-.352a3.896 3.896 0 0 1-.711-.382 1.585 1.585 0 0 1-.438-.438.998.998 0 0 1-.14-.523c0-.256.067-.485.203-.688.135-.208.338-.372.61-.492.27-.125.608-.188 1.015-.188.422 0 .77.073 1.047.22.28.145.49.346.625.6.14.25.21.542.21.876h2.329c0-.677-.175-1.279-.524-1.805-.344-.526-.828-.94-1.453-1.242-.625-.302-1.357-.453-2.195-.453-.615 0-1.18.075-1.696.226-.51.151-.953.367-1.328.649-.375.276-.666.61-.875 1a2.667 2.667 0 0 0-.312 1.289c0 .49.099.92.297 1.289.203.37.479.695.828.976.354.276.76.519 1.219.727.463.208.953.396 1.468.563.464.145.841.286 1.133.421.292.136.518.274.68.414.161.136.27.287.328.454ZM49.587 33h1.148c.771 0 1.474-.128 2.11-.383a4.75 4.75 0 0 0 1.648-1.101c.464-.48.82-1.052 1.07-1.72.256-.666.383-1.403.383-2.21v-.54c0-.812-.127-1.549-.383-2.21a4.926 4.926 0 0 0-1.07-1.719 4.704 4.704 0 0 0-1.648-1.101 5.412 5.412 0 0 0-2.086-.391H47.242V33H49.586Zm0-1.828h1.148c.615 0 1.133-.138 1.555-.414.422-.281.74-.69.953-1.227.219-.536.328-1.185.328-1.945v-.555c0-.583-.062-1.096-.187-1.539-.12-.443-.3-.815-.54-1.117a2.255 2.255 0 0 0-.882-.68 2.918 2.918 0 0 0-1.203-.234h-1.172v7.71Z"
      fill={props.fillColor}
    />
  </svg>
);

export default SDDarkIcon;
