export default function Button({ children, onClick }) {
     return (
      <button
        onClick={onClick}

        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        {children}
      </button>
    );
  }