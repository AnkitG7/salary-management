export function getChartTheme(token) {
  return {
    grid: token.colorBorderSecondary,

    axis: token.colorTextSecondary,

    tooltipBg: token.colorBgElevated,
  };
}
