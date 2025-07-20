import Link from 'next/link';
import StarRating from '@/components/StarRating';
import Button from './Button';

import { useBookmarkStore } from '@/stores/bookmarkStore';
import { motion } from 'framer-motion';

export default function Card({ user }) {
  const bookmarks = useBookmarkStore((state) => state.bookmarks);
  const addBookmark = useBookmarkStore((state) => state.addBookmark);

  const removeBookmark = useBookmarkStore((state) => state.removeBookmark);

  const bookmarked = bookmarks.some((b) => b.id === user.id);


  const handleBookmark = () => {
    if (bookmarked) {

      removeBookmark(user.id);
    } else {
      addBookmark(user);
    }
  };

  return (

    <motion.div

      className="p-4 bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl shadow-xl shadow-cyan-500/30 text-white hover:scale-[1.02] transition-transform duration-300"
        whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-lg font-semibold text-cyan-300 drop-shadow-md">
        {user.firstName} {user.lastName}
      </h2>
      <p className="text-sm text-white/80">{user.email}</p>
      <p className="text-sm text-white/80">Age: {user.age} </p>
      <p className="text-sm text-white/80">
      Department: {user.department}</p>
      <StarRating rating={user.rating} />
      <div className="flex gap-2 mt-4">
        <Link href={`/employee/${user.id}`}>
          <Button>View</Button>
        </Link>
        <Button onClick={handleBookmark}>
          {bookmarked ? 'Remove Bookmark' : 'Bookmark'}
          
        </Button>
        <Button>Promote</Button>
      </div>
    </motion.div>
  );
}