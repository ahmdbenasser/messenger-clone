const EmptyState = () => {
  return (
    <div
      className="
      px-4
      py-10
      h-full
      sm:px-6
      lg:px-8
      bg-gray-100
    "
    >
      <div
        className="
          flex 
          h-full
          flex-col 
          text-center
          items-center 
          justify-center
        "
      >
        <h3
          className="
          text-2xl
          font-bold
          text-gray-900
        "
        >
          Select a chat or start a new conversation
        </h3>
      </div>
    </div>
  );
};

export default EmptyState;
