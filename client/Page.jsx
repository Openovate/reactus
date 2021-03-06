import React from 'react';

export default function Page(props) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>{props.title}</title>
      </head>
      <body>
        <div id="root">{'{APP}'}</div>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <script id="react-data" type="text/json">{'{DATA}'}</script>
        <script src="/index.bundle.js"></script>
      </body>
    </html>
  );
}
