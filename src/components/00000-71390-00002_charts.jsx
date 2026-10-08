// [IDX: 00000-71390-00002] [IDX: 00000] Chart Demonstration Viewport Invariant Capsule
import React from 'react';

export function ChartCapsule({ data }) {
  return (
    <div data-idx="00000-71390-00002" data-lock="00000" data-desc="Chart Viewport Invariant">
      <h3>Telemetry & Analytics Chart</h3>
      <div className="chart-viewport">{data}</div>
    </div>
  );
}
