import { html } from 'hono/html'

/**
 * 
      <link
        href="https://unpkg.com/bonsai.css@1.2.2/dist/bonsai-base.min.css"
        rel="stylesheet"
      />
 */
export const Layout = (props: any) => html`<!DOCTYPE html>
  <html lang="ja" data-theme="light">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>comment-app</title>
      <link
        rel="stylesheet"
        href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css"
      />
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body>
      <main class="container" style="height: 100vh; overflow: hidden;">
        ${props.children}
      </main>
    </body>
  </html>`
