import style from '../styles/components/PostBody.module.css';

const PostBody = ({ content }: { content: string }) => {
  return (
    <div>
      <div
        className={style.postBody}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default PostBody;
