import express from "express"
import { renderToPipeableStream } from "react-dom/server"

const app = express();

app.get('/', (req, res) => {
  const pipeable = renderToPipeableStream(
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
      <p></p>
    </...>
  */
  pipeable.pipe(res);
});

app.listen(3000, () => {
  console.info('listening on http://localhost:3000');
});

