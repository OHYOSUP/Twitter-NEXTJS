import Link from "next/link";
import PropTypes from "prop-types";

const PostCardContent = ({postData}) => {
  return (
    <div>
      {postData?.split(/(#[^\s#]+)/g).map((v, i) => {
        if (v.match(/(#[^\s#]+)/g)) {
          return (
            <Link key={i} href={`/hashtag/${v.slice(1)}`}>
              <a>{v}</a>
            </Link>
          );
        }
        return v;
      })}
    </div>
  );
};

export default PostCardContent;

PostCardContent.propTypes = { postData: PropTypes.string.isRequired };
