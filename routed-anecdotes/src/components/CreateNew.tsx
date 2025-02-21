import { FormEvent, useState } from "react";
import { useField } from "../hooks";

const CreateNew = (props) => {
  const content = useField("");
  const author = useField("");
  const info = useField("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
  };

  const { resetval: contentReset, ...contentRest } = content;
  const { resetval: authorReset, ...authorRest } = author;
  const { resetval: infoReset, ...infoRest } = info;
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" {...contentRest} />
        </div>
        <div>
          author
          <input name="author" {...authorRest} />
        </div>
        <div>
          url for more info
          <input name="info" {...infoRest} />
        </div>
        <button type="submit">create</button>
        <button
          type="button"
          onClick={() => {
            contentReset();
            authorReset();
            infoReset();
          }}
        >
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
