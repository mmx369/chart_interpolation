import { XyDataSeries } from 'scichart/Charting/Model/XyDataSeries'
import { NumericAxis } from 'scichart/Charting/Visuals/Axis/NumericAxis'
import { EllipsePointMarker } from 'scichart/Charting/Visuals/PointMarkers/EllipsePointMarker'
import { XyScatterRenderableSeries } from 'scichart/Charting/Visuals/RenderableSeries/XyScatterRenderableSeries'
import { SciChartSurface } from 'scichart/Charting/Visuals/SciChartSurface'
import { NumberRange } from 'scichart/Core/NumberRange'

import { cubicInterpol } from './cubicInterp/cubic_interp'

const xValues = [1, 2, 4, 7]
const yValues = [2, 3, 1, 4]

async function initSciChart() {
  SciChartSurface.setRuntimeLicenseKey(
    'mBVij4UYVpkpKJnh8E6RHPEumfj7VfyJDqbclxNOxS1beUNcwZx+vJjJd1DsKtRY+vh0EddYpisPauuoenotWeLMs11CcLSYZ7VUikgKLQEXIJ2EcZLYx6eJf9kR+OHMZKPQlWO5/a4PUWKCDZ9Z/teYyVLxfURhErVSG0hAH6BP/sXK4nzf5UACloy09YHCA3KEVyv4kUK8ROnvwAfaEGuvh1xV5cDRGbJaqqhv7tx03zVVdNn7aJhLEUEb4uPYFnLNZwOSOIz14H2Q0QfO5oIza+7JK8tXC9MDUmKQz7iLMQxJHxvF4oHtsaM1hrmLnnqWUS10+rLrh4ECVU0ThhdS7KEkjOEFWo3rQiaosIsIDr92ZXBllxrUO1NVzNC7rbZwR59F5/wZ918Lby7WHCdyGIaLep4yxuv+8MtEjFyuiTmW7m+HAW5j6Jy11OWTlZd0jbPZi9ThBFfRTtE2KIB96VI40uhFwiKsWUiRKb+C4IxxqYpdHmoplJQ4/b76tfv6WwK5NMTDbj9/aWvZJ0ZQqOK/S1vSJHOD3ZpIKM7yt03RZhSy0A=='
  )
  const { wasmContext, sciChartSurface } = await SciChartSurface.create(
    'scichart-root-1'
  )

  sciChartSurface.xAxes.add(new NumericAxis(wasmContext))

  sciChartSurface.yAxes.add(
    new NumericAxis(wasmContext, { growBy: new NumberRange(0.1, 0.1) })
  )
  const scatterSeries = new XyScatterRenderableSeries(wasmContext, {
    pointMarker: new EllipsePointMarker(wasmContext, {
      width: 3,
      height: 3,
      strokeThickness: 0.5,
      fill: 'red',
      stroke: 'LightSteelBlue',
    }),
  })
  sciChartSurface.renderableSeries.add(scatterSeries)

  const dataSeries = new XyDataSeries(wasmContext)

  for (let i = 1; i <= xValues[xValues.length - 1]; i = i + 0.03) {
    dataSeries.append(i, cubicInterpol(xValues, yValues)(i))
  }

  scatterSeries.dataSeries = dataSeries
}

initSciChart()
