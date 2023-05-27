import styles from "./ErrorText.module.scss"
const ErrorText = () => {
  return (
    <div className={styles.root}>
      <h2 className={styles.text} >Something went wrong 😖</h2>
    </div>
  )
}

export default ErrorText
