import React from 'react';
import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AreaChartProps {
  data: any[];
  dataKey: string;
  xAxisKey?: string;
  color?: string;
  height?: number;
  className?: string;
}

const AreaChart: React.FC<AreaChartProps> = ({
  data,
  dataKey,
  xAxisKey = 'name',
  color = '#3B82F6',
  height = 300,
  className = '',
}) => {
  return (
    <ResponsiveContainer width="100%" height={height} className={className}>
      <RechartsAreaChart data={data}>
        <defs>
          <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
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
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2}
          fillOpacity={1}
          fill={`url(#gradient-${dataKey})`}
        />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChart;
