'use client';

import { useEffect  } from 'react';
import { useBookmarkStore } from '@/stores/bookmarkStore';

export default function BookmarksPage() {

    const { bookmarks, removeBookmark } =  useBookmarkStore();

  useEffect(() => {
   

    console.log('BookmarksPage mounted');
}, []);



  return (
           <div  className="min-h-screen bg-gradient-to-br from-[#141e30] to-[#243b55] p-4 relative text-white overflow-hidden">
   
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute  bottom-0 right-0 w-72 h-72 bg-cyan-400/20 rounded-full blur-2xl animate-pulse" />

    <div className="container mx-auto">
        <h1  className="text-3xl font-bold mb-6 text-cyan-300 drop-shadow-md">
          Bookmarked Employees
        </h1>

   {bookmarks.length === 0 ?  (
           <p className="text-center text-white/80">No bookmarked employees.</p>


        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map((user) => (
                 <div
                key={user.id}
                className="p-4 bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl shadow-xl shadow-cyan-500/30 hover:scale-[1.02] transition-transform duration-300"
              >
                   <h2 className="text-lg font-semibold text-cyan-300 drop-shadow-md">
                  {user.firstName} { user.lastName  }
                </h2>
                <p className="text-sm text-white/80">Email: {user.email}</p>
                <p className="text-sm text-white/80">Age: {user.age}</p>
                <p className="text-sm text-white/80">Department: {user.department}</p>

                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    onClick={() =>   removeBookmark(user.id)}
                    className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition duration-300 hover:shadow-[0_0_10px_#f00]"
                  >

                      Remove
                  </button >
                  <button

                    className="px-3 py-1 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white rounded-xl transition duration-300 hover:shadow-[0_0_10px_#0ff]"
                  >
                    Promote
                  </button>
                  <button
                    className=  "px-3  py-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl transition duration-300 hover:shadow-[0_0_10px_#90f]"
                  >
                       Assign to Project

            </button>
                </div>


        </div>
            ))}
          </div>

        )}
      </div>


    </div>
  );
}