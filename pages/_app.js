import "react-toastify/dist/ReactToastify.min.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/animate.css'
import '../styles/flaticon.css'
import "../styles/font-awesome.min.css";
import "../styles/themify-icons.css";
import { ToastContainer } from 'react-toastify';
import '../node_modules/react-modal-video/scss/modal-video.scss';
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Head from "next/head";
import { useRouter } from "next/router";
import "../styles/sass/style.scss";
import "../styles/rtl.css";

// component 

import { Fragment, useEffect } from "react";
import FooterArea from "../components/FooterArea";
import { LanguageProvider } from "../lib/LanguageContext";


function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isAdminPage = router.pathname.startsWith('/admin');
  const isArabic = router.pathname.startsWith('/ar');

  useEffect(() => {
    // Set direction on html element based on route
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
    document.documentElement.lang = isArabic ? 'ar' : 'en';
    
    if (isArabic) {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  }, [isArabic]);

  return (
    <LanguageProvider>
      <Fragment>
        <Head>
          <title>{isArabic ? 'أربكس للمحاماة - الاستشارات القانونية' : 'Arbex Law - Legal Consultancy'}</title>
        </Head>
        
        <Component {...pageProps} />
        <ToastContainer position={isArabic ? 'top-left' : 'top-right'} />
        {!isAdminPage && <FooterArea />}
      </Fragment>
    </LanguageProvider>
  )
}

export default MyApp
