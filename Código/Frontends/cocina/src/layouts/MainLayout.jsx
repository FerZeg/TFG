import PropTypes from 'prop-types';
import Header from "../components/mainUI/Header";
import { useContext } from "react";
import { loginContext } from '../lib/context';

export default function Layout({children}) {
    const {login} = useContext(loginContext);
    return (
      <>
      {login.value &&
      <>
        <Header />
        <main>
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
