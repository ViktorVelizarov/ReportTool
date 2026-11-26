/**
 * An ECharts chart in a container element, which keeps the chart as large as the container: widgets change size when
 * the user resizes them on the grid. Dispose it when the widget goes away.
 */
export class EChart {
  constructor(container) {
    this.container = container;
    this.chart = window.echarts.init(container);
    this.observer = new ResizeObserver(() => this.chart.resize());
    this.observer.observe(container);
  }

  /** Shows the option; what was in the chart before is replaced. */
  setOption(option) {
    this.chart.setOption(option, true);
  }

  dispose() {
    this.observer.disconnect();
    this.chart.dispose();
  }
}
