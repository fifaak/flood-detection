import React from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Line, Circle, Text as SvgText, Polyline, Rect, Defs, LinearGradient, Stop } from 'react-native-svg';

export const CustomLineChart = ({ 
  data, 
  riverbankLevel, 
  width, 
  height = 280,
  numSteps 
}) => {
  const padding = { top: 30, right: 20, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  const maxValue = Math.max(...data, riverbankLevel) + 0.5;
  const minValue = Math.min(...data, riverbankLevel) - 0.5;
  const valueRange = maxValue - minValue;
  
  const getX = (index) => padding.left + (index / (data.length - 1)) * chartWidth;
  const getY = (value) => padding.top + chartHeight - ((value - minValue) / valueRange) * chartHeight;
  
  // Create points for water level line
  const waterPoints = data.map((value, index) => `${getX(index)},${getY(value)}`).join(' ');
  
  // Create points for riverbank line
  const riverbankY = getY(riverbankLevel);
  
  // Grid lines
  const gridLines = [];
  const numGridLines = 5;
  for (let i = 0; i <= numGridLines; i++) {
    const value = minValue + (valueRange / numGridLines) * i;
    const y = getY(value);
    gridLines.push({ y, value });
  }
  
  return (
    <Svg width={width} height={height}>
      <Defs>
        <LinearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#0EA5E9" stopOpacity="0.3" />
          <Stop offset="1" stopColor="#0EA5E9" stopOpacity="0.05" />
        </LinearGradient>
      </Defs>
      
      {/* Background */}
      <Rect x="0" y="0" width={width} height={height} fill="#F8FAFC" />
      
      {/* Grid lines */}
      {gridLines.map((line, i) => (
        <React.Fragment key={i}>
          <Line
            x1={padding.left}
            y1={line.y}
            x2={width - padding.right}
            y2={line.y}
            stroke="#E2E8F0"
            strokeWidth="1"
          />
          <SvgText
            x={padding.left - 10}
            y={line.y + 4}
            fontSize="10"
            fill="#64748B"
            textAnchor="end"
          >
            {line.value.toFixed(1)}
          </SvgText>
        </React.Fragment>
      ))}
      
      {/* Riverbank level line */}
      <Line
        x1={padding.left}
        y1={riverbankY}
        x2={width - padding.right}
        y2={riverbankY}
        stroke="#EF4444"
        strokeWidth="2"
        strokeDasharray="5,5"
      />
      
      {/* Water level line */}
      <Polyline
        points={waterPoints}
        fill="none"
        stroke="#0EA5E9"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Data points */}
      {data.map((value, index) => {
        if (index % 2 === 0) {
          return (
            <Circle
              key={index}
              cx={getX(index)}
              cy={getY(value)}
              r="4"
              fill="#0EA5E9"
              stroke="#fff"
              strokeWidth="2"
            />
          );
        }
        return null;
      })}
      
      {/* X-axis labels */}
      {data.map((_, index) => {
        if (index % 2 === 0) {
          return (
            <SvgText
              key={index}
              x={getX(index)}
              y={height - padding.bottom + 20}
              fontSize="10"
              fill="#64748B"
              textAnchor="middle"
            >
              {index}
            </SvgText>
          );
        }
        return null;
      })}
      
      {/* Y-axis label */}
      <SvgText
        x={15}
        y={padding.top - 10}
        fontSize="11"
        fill="#475569"
        fontWeight="600"
      >
        ระดับน้ำ (ม.)
      </SvgText>
      
      {/* X-axis label */}
      <SvgText
        x={width / 2}
        y={height - 5}
        fontSize="11"
        fill="#475569"
        textAnchor="middle"
        fontWeight="600"
      >
        จุดวัด
      </SvgText>
    </Svg>
  );
};
