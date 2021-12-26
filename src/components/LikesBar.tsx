import { useMemo, useRef, useEffect } from "react";

type Props = {
  likes: number;
  dislikes: number;
};

const LikesBar = ({ likes, dislikes }: Props) => {
  const likesRef = useRef<HTMLDivElement>(null);
  const dislikesRef = useRef<HTMLDivElement>(null);

  const totalLikes = useMemo(() => {
    return likes + dislikes;
  }, [likes, dislikes]);

  const likesPourcent = useMemo(() => {
    return (likes * 100) / totalLikes + "%";
  }, [likes, totalLikes]);

  const dislikesPourcent = useMemo(() => {
    return (dislikes * 100) / totalLikes + "%";
  }, [dislikes, totalLikes]);

  useEffect(() => {
    if (likesRef.current?.style) {
      likesRef.current.style.width = likesPourcent;
    }
  }, [likesPourcent]);

  useEffect(() => {
    if (dislikesRef.current?.style) {
      dislikesRef.current.style.width = dislikesPourcent;
    }
  }, [dislikesPourcent]);

  return (
    <div className="flex">
      <div
        ref={likesRef}
        className="h-2 bg-green-600 transition-all rounded-l"
      />
      <div
        ref={dislikesRef}
        className="h-2 bg-red-600 transition-all rounded-r"
      />
    </div>
  );
};

export default LikesBar;
