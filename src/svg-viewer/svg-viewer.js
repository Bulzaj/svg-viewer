import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef
} from 'react'
import NavigationPane from '../navigation-pane/navigation-pane'
import { pan, zoom } from '../utils'
import styles from './svg-viewer.module.css'

const PAN_DELTA = 50
const ZOOM_FACTOR = 1.25

const transformMatrixReducer = (state, action) => {
  switch (action.type) {
    case 'PAN':
      return {
        ...state,
        transformMatrix: pan(action.dx, action.dy, state.transformMatrix)
      }
    case 'ZOOM_TO_CENTER':
      return {
        ...state,
        transformMatrix: zoom(
          action.scaleDelta,
          state.viewboxWidth / 2,
          state.viewboxHeight / 2,
          state.transformMatrix
        )
      }
    case 'SET_VIEWBOX_DIMMENSIONS':
      return {
        ...state,
        viewboxWidth: action.width,
        viewboxHeight: action.height
      }
    default:
      throw new Error('Reducer action type does not exists')
  }
}

const SvgViewer = (props) => {
  const [state, dispatch] = useReducer(transformMatrixReducer, {
    transformMatrix: props.initialTransformMatrix,
    viewboxWidth: 0,
    viewboxHeight: 0
  })

  const svgElRef = useRef()

  const setViewboxDimmensions = () => {
    if (!svgElRef.current) return
    const width = svgElRef.current.clientWidth
    const height = svgElRef.current.clientHeight

    dispatch({
      type: 'SET_VIEWBOX_DIMMENSIONS',
      width: width,
      height: height
    })
  }

  useEffect(() => {
    setViewboxDimmensions()
  }, [])

  useEffect(() => {
    window.addEventListener('resize', () => {
      setViewboxDimmensions()
    })
  }, [])

  const arrowUpClickHandler = useCallback(() => {
    dispatch({
      type: 'PAN',
      dx: 0,
      dy: props.navigationPane.panDelta
    })
  }, [])

  const arrowRightClickHandler = useCallback(() => {
    dispatch({
      type: 'PAN',
      dx: -props.navigationPane.panDelta,
      dy: 0
    })
  }, [])

  const arrowDownClickHandler = useCallback(() => {
    dispatch({
      type: 'PAN',
      dx: 0,
      dy: -props.navigationPane.panDelta
    })
  }, [])

  const arrowLeftClickHandler = useCallback(() => {
    dispatch({
      type: 'PAN',
      dx: props.navigationPane.panDelta,
      dy: 0
    })
  }, [])

  const plusClickHandler = useCallback(() => {
    dispatch({
      type: 'ZOOM_TO_CENTER',
      scaleDelta: props.navigationPane.zoomFactor
    })
  }, [])

  const minusClickHandler = useCallback(() => {
    dispatch({
      type: 'ZOOM_TO_CENTER',
      scaleDelta: 1 / props.navigationPane.zoomFactor
    })
  }, [])

  let displayData = (
    <text x='50%' y='50%'>
      No SVG data provided
    </text>
  )
  if (props.svgData) displayData = useMemo(() => <props.svgData />, [])

  let navigationPane = null
  if (props.navigationPane.show)
    navigationPane = (
      <NavigationPane
        onArrowUpClick={arrowUpClickHandler}
        onArrowRightClick={arrowRightClickHandler}
        onArrowDownClick={arrowDownClickHandler}
        onArrowLeftClick={arrowLeftClickHandler}
        onPlusClick={plusClickHandler}
        onMinusClick={minusClickHandler}
      />
    )

  const style = {
    width: props.width,
    height: props.height
  }

  return (
    <div className={styles.SvgViewer} style={style}>
      {navigationPane}
      <svg
        id='viewbox'
        ref={svgElRef}
        width={props.width}
        height={props.height}
        viewBox={`0 0 ${state.viewboxWidth} ${state.viewboxHeight}`}
      >
        <g id='root-group' transform={`matrix(${state.transformMatrix})`}>
          {displayData}
        </g>
      </svg>
    </div>
  )
}

SvgViewer.defaultProps = {
  width: '100%',
  height: '100%',
  svgData: null,
  initialTransformMatrix: [1, 0, 0, 1, 0, 0],
  navigationPane: {
    show: true,
    panDelta: PAN_DELTA,
    zoomFactor: ZOOM_FACTOR
  }
}

export default SvgViewer
