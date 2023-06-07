import { html } from 'hono/html'

export const Layout = (props: any) => html`<!DOCTYPE html>
  <html lang="ja" data-theme="light">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>comment-app</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body>
      <main
        class="container"
        style="height: 100vh; overflow: hidden; padding: 0;"
      >
        ${props.children}
      </main>
    </body>
  </html>`
