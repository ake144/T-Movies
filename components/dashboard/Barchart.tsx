'use client';

import React, { PureComponent } from 'react';
import { PieChart,Cell, Pie, Tooltip, Sector, ResponsiveContainer } from 'recharts';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

const data = [
  { name: 'Category A', value: 400, color: '#8884d8' },
  { name: 'Category B', value: 300, color: '#82ca9d' },
  { name: 'Category C', value: 300, color: '#ffc658' },
  { name: 'Category D', value: 200, color: '#d0ed57' },
];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy - 20} textAnchor="middle" fill="#333">
        Department
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Count: ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

class CustomPieChart extends PureComponent {
  render() {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ResponsiveContainer width="50%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#333" style={{ fontSize: '20px' }}>
              Department
            </text>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <Box sx={{ ml: 1 }}>
          <List>
            {data.map((entry, index) => (
              <ListItem key={`item-${index}`} sx={{ display: 'flex', alignItems: 'center' }}>
                <ListItemIcon>
                  <Box sx={{ width: 20, height: 20, backgroundColor: entry.color, borderRadius:'100%' }} />
                </ListItemIcon>
                <ListItemText primary={entry.name}  sx={{marginRight:2}}/>
                <ListItemText primary={entry.value} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    );
  }
}

export default CustomPieChart;
