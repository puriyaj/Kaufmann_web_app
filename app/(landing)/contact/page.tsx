import React from 'react';
import { ContactForm } from './contact-form';

export default function page() {
  return (
    <article className="contact-us rt">
      <div className="main">
        <div className="side rt-bg right rt-14">
          <div className="item right rt-center rt-400">
            <i className="fa fa-map-signs rt "> Kreuzberg 9 - 1201 Berlin</i>
          </div>
          <a href="mailto:mohammadmrb.org@gmail.com" className="item right rt-center rt-400 rt-555">
            <i className="fa fa-envelope-o rt"></i> puriyaj@gmail.com
          </a>
          <a href="tel:01734482229" className="item right rt-center rt-400 rt-555">
            <i className="fa fa-phone rt"></i> 01734482229
          </a>
          <div className="item right rt-center rt-400">
            <i className="fa fa-clock-o text-sm">10 A.M until 17 P.M</i>  
          </div>
        </div>
        <ContactForm />
      </div>
    </article>
  );
}
