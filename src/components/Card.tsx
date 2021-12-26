import { memo, useRef, useEffect } from "react";
import {
  TrashIcon,
  ThumbUpIcon,
  ThumbDownIcon,
} from "@heroicons/react/outline";

import {
  ThumbUpIcon as ThumbUpIconSolid,
  ThumbDownIcon as ThumbDownIconSolid,
} from "@heroicons/react/solid";

import LikesBar from "@components/LikesBar";

type Props = {
  id: string;
  title: string;
  category: string;
  isLiked: boolean | null;
  likes: number;
  dislikes: number;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
  onDelete: (id: string) => void;
};

const Card = memo(
  ({
    id,
    title,
    category,
    isLiked,
    likes,
    dislikes,
    onLike,
    onDislike,
    onDelete,
  }: Props) => {
    const LikeIcon = isLiked ? ThumbUpIconSolid : ThumbUpIcon;
    const DislikeIcon = isLiked === false ? ThumbDownIconSolid : ThumbDownIcon;
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      initAnimation();
      return () => {
        removeAnimation();
      };
    }, []);

    const handleDelete = (id: string) => {
      removeAnimation();
      setTimeout(() => onDelete(id), 500);
    };

    const initAnimation = () => {
      ref.current?.classList.remove("-translate-y-8", "opacity-0");
      ref.current?.classList.add("translate-y-2", "opacity-1");
    };

    const removeAnimation = () => {
      ref.current?.classList.remove("translate-y-2", "opacity-1");
      ref.current?.classList.add("-translate-y-8", "opacity-0");
    };

    return (
      <div
        ref={ref}
        className="bg-white m-3 w-64 border rounded-md shadow-lg opacity-0 transform transition-all duration-500"
      >
        <div className="p-3">
          <h3 className="uppercase font-bold">{title}</h3>
          <h4 className="text-gray-500 mb-3 text-sm">{category}</h4>
          <LikesBar likes={likes} dislikes={dislikes} />
        </div>

        <div className="flex border-t mt-2 p-3 bg-gray-50">
          <div className="flex flex-1">
            <button
              className="flex items-center mx-3 btn-animated"
              onClick={() => onLike(id)}
            >
              <LikeIcon className="w-5 mr-1 text-green-600" />
              {likes}
            </button>
            <button
              className="flex items-center mx-3 btn-animated"
              onClick={() => onDislike(id)}
            >
              <DislikeIcon className="w-5 mr-1 text-red-600" />
              {dislikes}
            </button>
          </div>
          <button className="flex-2" onClick={() => handleDelete(id)}>
            <TrashIcon className="w-5 text-red-600 btn-animated" />
          </button>
        </div>
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
