const Notify = ({ errorMessage, type }) => {
  if (!errorMessage) {
    return null;
  }
  const colors = {
    info: "text-blue-800 bg-blue-50 dark:text-blue-400",
    error: "text-red-800 bg-red-50  dark:text-red-400",
    success: "text-green-800 bg-green-50  dark:text-green-400",
    warning: "text-yellow-800 bg-yellow-50 dark:text-yellow-300",
  };
  return (
    <div
      className={`p-4 mb-4 text-sm rounded-lg  dark:bg-gray-800 ${colors[type]}`}
      role={type}
    >
      <span className="font-medium">
        <span className="capitalize">{type}</span> alert!
      </span>{" "}
      {errorMessage}
    </div>
  );
};

export default Notify;
