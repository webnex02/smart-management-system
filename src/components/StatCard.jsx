export default function StatCard({ title, value }) {
  return (
    <div className=" stat-animate card-hover card">
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}
