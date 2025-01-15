import { Hono } from "hono"
import { stream } from "hono/streaming"
import { renderToReadableStream } from "react-dom/server"

const app = new Hono();

app.get('/', (res) => {
  return stream(res, async (s) => {
    const readable = await renderToReadableStream(
      <table>
        <tbody>
          <tr>
            {/* This is the td that should have an implicit end tag */}
            <td>
              <td>
                This is the inner content
              </td>
            </td>
          </tr>
        </tbody>
      </table>
    );

    /*
      The HTML output is
      <table>
        <tbody>
          <tr>
            <td>
              <td>This is the inner content</td>
            </td>
          </tr>
        </tbody>
      </table>

      Once it gets to the browser, it gets modified to
      <table>
        <tbody>
          <tr>
            <td>
            </td>
            <td>This is the inner content</td>
          </tr>
        </tbody>
      </table>
    */
    await s.pipe(readable);
  });
});

export default app;
