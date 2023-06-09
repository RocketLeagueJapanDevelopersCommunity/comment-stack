import { html } from 'hono/html'

export const Layout = (props: any) => html`<!DOCTYPE html>
  <html lang="ja" data-theme="light">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>comment-app</title>
      <script src="https://cdn.tailwindcss.com/3.3.2"></script>
      <style>
        * {
          color: #2b2c30;
        }
      </style>
    </head>
    <body>
      <main class="h-screen overflow-hidden p-0">${props.children}</main>
    </body>
  </html>`
