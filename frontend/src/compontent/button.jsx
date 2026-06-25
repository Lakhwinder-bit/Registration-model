export default function Button({
  text,
  onClick,
  loading,
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full text-sm cursor-pointer bg-violet-600 text-white py-2 rounded-md font-semibold"
    >
        {loading ? (
    <span className="flex items-center justify-center gap-2">
      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      Loading...
    </span>
  ) : (
  text
  )}
    </button>
  );
}
