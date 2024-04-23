import PropTypes from 'prop-types';
import Header from "../components/mainUI/Header";
import { useLoginContext } from "../lib/context";
import './MainLayout.css';

export default function Layout({children}) {
  const { login } = useLoginContext()
    return (
      <>
      {login.value &&
      <>
        <Header />
        <main className='main-section'>
          {children}
        </main>
        </>
      }
      </>

    );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};
