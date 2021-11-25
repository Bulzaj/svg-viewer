import React from 'react'
import styles from './navigation-pane.module.css'
import {
  GoArrowUp,
  GoArrowRight,
  GoArrowDown,
  GoArrowLeft
} from 'react-icons/go'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'

const NavigationPane = ({
  onArrowUpClick,
  onArrowRightClick,
  onArrowDownClick,
  onArrowLeftClick,
  onPlusClick,
  onMinusClick
}) => {
  return (
    <div className={styles.navigationPane}>
      <GoArrowUp
        style={{ gridColumn: 2, gridRow: 1 }}
        onClick={onArrowUpClick}
      />
      <GoArrowRight
        style={{ gridColumn: 3, gridRow: 2 }}
        onClick={onArrowRightClick}
      />
      <GoArrowDown
        style={{ gridColumn: 2, gridRow: 3 }}
        onClick={onArrowDownClick}
      />
      <GoArrowLeft
        style={{ gridColumn: 1, gridRow: 2 }}
        onClick={onArrowLeftClick}
      />
      <div className={styles.buttonContainer}>
        <AiFillPlusCircle onClick={onPlusClick} />
        <AiFillMinusCircle onClick={onMinusClick} />
      </div>
    </div>
  )
}

export default React.memo(NavigationPane)
