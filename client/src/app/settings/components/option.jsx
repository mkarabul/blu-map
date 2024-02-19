export default function Option({ header, context }) {
  return (
    <div className="border p-4 rounded-lg shadow">
      <h2 className="text-xl font-medium mb-4">{header}</h2>
      <h1 className="text-l font-medium mb-4">{context}</h1>
    </div>
  );
}
