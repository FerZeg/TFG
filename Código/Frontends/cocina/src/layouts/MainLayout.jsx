import PropTypes from 'prop-types';
import Header from "../components/mainUI/Header";
import { useContext } from "react";
import { loginContext } from '../lib/context';
import './MainLayout.css';

export default function Layout({children}) {
    const {login} = useContext(loginContext);
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
