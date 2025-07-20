export default function Badge({ rating }) {
    const color = rating >= 4 ? 'bg-green-500' : rating >= 3 ? 'bg-yellow-500' : 'bg-red-500';
    return <span className={`px-2 py-1 text-white rounded ${color}`}>{rating} Stars</span>;
  }