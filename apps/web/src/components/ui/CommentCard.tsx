import { IComment } from "dtos";
import { FC } from "react";

interface IProps {
  commentData: IComment;
  forwardRef?: (node: HTMLDivElement) => void;
}

const CommentCard: FC<IProps> = ({ commentData, forwardRef }) => {
  return (
    <div ref={forwardRef} className="mb-2 border-black border-2 rounded-lg">
      <p>
        <strong className="block">{commentData.author.username}</strong>
        {commentData.content}
      </p>
    </div>
  );
};
export default CommentCard;
