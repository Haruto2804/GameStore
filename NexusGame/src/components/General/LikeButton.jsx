import { Heart } from 'lucide-react';

const LikeButton = ({ color, size, liked }) => {


  return (
    <button
    >
      <Heart
        size={size}
        // Nếu liked là true, tô màu đỏ, nếu false thì để rỗng (transparent)
        fill={liked ? color : "none"}
        className={liked ? "scale-101" : ""}
        // Viền của trái tim
        color={liked ?  color  : "white"}
        style={{ transition: 'all 0.2s ease-in-out' }}
      />
    </button>
  );
};

export default LikeButton;