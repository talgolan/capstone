import React from "react";
import { connect } from "react-redux";
import { getChartThunk } from "../../redux/score";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { getTodayScoreThunk } from "../../redux/dcTodayScore";
import ReactTooltip from 'react-tooltip';
export class Heatmap extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }
  async componentDidMount() {
    await this.props.getChart();
    await this.props.getTodayScore();
    const len = this.props.todayScore.length;
    const count = this.props.chart.map((eachScore) => eachScore.rate);
    const date = this.props.chart.map((eachDate) => eachDate.date);
    if (len > 0) {
      const countWithoutToday = count.slice(0, -len);
      const dateWithoutToday = date.slice(0, -len);
      const todayCount = count.slice(-len);
      const average = Math.floor(todayCount.reduce((accum, each) => {
        return accum+each
      }, 0)/len);
      const todayDate = date.slice(-len)[0];
      countWithoutToday.push(average);
      dateWithoutToday.push(todayDate);
      this.setState((prevState) => {
        const data = dateWithoutToday.map((d, i) => ({
          date: d,
          count: countWithoutToday[i],
        }));
        return {
          data,
        };
      });
    } else {
      this.setState((prevState) => {
        const data = date.map((d, i) => ({
          date: d,
          count: count[i],
        }));
        return {
          data,
        };
      });
    }
  }
  render() {
    const data = this.state.data;
    const chart = this.props.chart;
    const today = new Date();
    return (
      <div>
        <div>
          <div>How I've felt over time</div>
          {
            (chart && chart.length > 0) ?
            <CalendarHeatmap
              startDate={shiftDate(today, -100)}
              endDate={today}
              values={data}
              classForValue={(value) => {
                if (!value) {
                  return "color-empty";
                }
                return `color-scale-${value.count}`;
              }}
              showWeekdayLabels={true}
              tooltipDataAttrs={(value) => {
                  return {
                    'data-tip': `${value.date} has average score: ${
                      value.count
                    }`,
                  };
              }}
            /> : null
          }
            <ReactTooltip />
        </div>
      </div>
    );
  }
}

function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

const mapState = (state) => {
  return {
    chart: state.chart,
    todayScore: state.todayScore,
  };
};

const mapDispatch = (dispatch) => ({
  getChart: () => dispatch(getChartThunk()),
  getTodayScore: () => dispatch(getTodayScoreThunk()),
});

export default connect(mapState, mapDispatch)(Heatmap);
