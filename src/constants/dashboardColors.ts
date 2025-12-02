export const dashboardColors = [
  '#36A2EB',
  '#FFCE56',
  '#4BC0C0',
  '#9966FF',
  '#FF9F40',
  '#8AC926',
  '#1982C4',
  '#6A4C93',
  '#FF595E',
  '#FFCA3A',
  '#00F5D4',
  '#9B5DE5',
  '#F15BB5',
  '#00BBF9',
  '#FB5607',
  '#FF006E',
  '#8338EC',
  '#3A86FF',
  '#A0C4FF',
  '#BDB2FF',
  '#FFC6FF',
  '#006400',
  '#D62828',
  '#577590',
  '#43AA8B',
  '#90BE6D',
  '#F9C74F',
  '#4A5859',
  '#FF6384',
];

export const generateColor = (index: number | string) => {
  const colors = dashboardColors;

  if (typeof index === 'number') {
    return colors[index];
  }

  const hash = index.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash];
};
