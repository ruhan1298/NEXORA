import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface DonutChartProps {
  data: { name: string; value: number; color?: string }[];
  height?: number;
  className?: string;
  innerRadius?: number;
  outerRadius?: number;
}

const DEFAULT_COLORS = ['#3B82F6', '#8B5CF6', '#EC4899', '#00D4FF', '#22F5A0', '#FFB020'];

const DonutChart: React.FC<DonutChartProps> = ({
  data,
  height = 300,
  className = '',
  innerRadius = 60,
  outerRadius = 80,
}) => {
  const chartData = data.map((item, index) => ({
    ...item,
    color: item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
  }));

  return (
    <ResponsiveContainer width="100%" height={height} className={className}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={2}
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
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
          formatter={(value: number) => [`${value}%`, 'Allocation']}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle"
          wrapperStyle={{ fontSize: '12px', color: '#9AA3C7' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DonutChart;
