import styles from './react-ui-kit.module.scss';

/* eslint-disable-next-line */
export interface ReactUiKitProps {}

export function ReactUiKit(props: ReactUiKitProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ReactUiKit!</h1>
    </div>
  );
}

export default ReactUiKit;
