const rows = [
  { name: 'Dr. A. Raman', dept: 'CS', score: 4.6, width: 92 },
  { name: 'Prof. S. Iyer', dept: 'CS', score: 4.3, width: 86 },
  { name: 'Dr. K. Menon', dept: 'IT', score: 4.1, width: 82 },
  { name: 'Prof. R. Nair', dept: 'CS', score: 3.8, width: 76 },
];

export function ReportVisual({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`report ${compact ? 'report--compact' : ''}`} aria-hidden="true">
      <div className="report__bar">
        <span>VSB / faculty feedback</span>
        <span>Term 06 · 2026</span>
      </div>
      <div className="report__body">
        <div className="report__head">
          <div>
            <p>Department report</p>
            <h3>Computer Science</h3>
          </div>
          <div className="report__rate">
            <b>87%</b>
            <span>submitted</span>
          </div>
        </div>
        <div className="report__rows">
          {rows.map((r) => (
            <div className="report__row" key={r.name}>
              <span className="report__name">
                {r.name}
                <i>{r.dept}</i>
              </span>
              <span className="report__track">
                <span style={{ width: `${r.width}%` }} />
              </span>
              <b>{r.score.toFixed(1)}</b>
            </div>
          ))}
        </div>
        <div className="report__foot">
          <span>10 parameters</span>
          <span>412 of 474 students</span>
          <span>Export report</span>
        </div>
      </div>
    </div>
  );
}
