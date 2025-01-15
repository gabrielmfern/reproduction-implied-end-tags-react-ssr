import { Hono } from "hono"
import { stream } from "hono/streaming"
import { renderToReadableStream } from "react-dom/server"

const app = new Hono();

app.get('/', (res) => {
  return stream(res, async (s) => {
    const readable = await renderToReadableStream(
      <p>
        First
        <div>...</div>
        Text in between paragraphs
      </p>
    );

    /*
      If you were to directly curl into http://localhost:3000 you would get

      <p>
        First
        <div>...</div>
        Text in between paragraphs
      </p>

      Once it gets to the browser, it gets modified to

      <...>
        <p>
          First
        </p>
        <div>...</div>
        Text in between paragraphs
        <p>
        </p>
      </...

      Which
    */
    await s.pipe(readable);
  });
});

export default app;
