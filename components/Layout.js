import styles from '../styles/Layout.module.css';
import BlogHeader from './BlogHeader';

const Layout = ({ children }) => (
  <div className={styles.layout}>
    <BlogHeader title="Marouane Faris" />
    {children}
  </div>
);

export default Layout;
