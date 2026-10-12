import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface LineChartProps {
  data: any[];
  dataKey: string;
  xAxisKey?: string;
  color?: string;
  height?: number;
  className?: string;
  showDots?: boolean;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  dataKey,
  xAxisKey = 'name',
  color = '#3B82F6',
  height = 300,
  className = '',
  showDots = false,
}) => {
  return (
    <ResponsiveContainer width="100%" height={height} className={className}>
      <RechartsLineChart data={data}>
        <defs>
          <filter id={`glow-${dataKey}`}>
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis
          dataKey={xAxisKey}
          stroke="#5B6491"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#5B6491"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(10, 13, 31, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '12px',
            backdropFilter: 'blur(10px)',
          }}
          itemStyle={{ color: '#F5F7FF' }}
          labelStyle={{ color: '#9AA3C7' }}
        />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2}
          dot={showDots ? { fill: color, strokeWidth: 2, r: 4 } : false}
          activeDot={{ r: 6, fill: color }}
          filter={`url(#glow-${dataKey})`}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
