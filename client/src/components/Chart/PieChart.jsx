import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

const PeiChart = ({ chartData }) => {
	return <Pie data={chartData} />
}

export default PeiChart
