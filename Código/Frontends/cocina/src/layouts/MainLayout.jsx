import PropTypes from 'prop-types';
import Header from "../components/mainUI/Header";

export default function Layout({children}) {

    return (
      <>
        <Header />
        <main>
          {children}
        </main>
      </>
    );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};
