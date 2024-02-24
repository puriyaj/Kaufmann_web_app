import React from 'react';
import { ContactForm } from './contact-form';

export default function page() {
  return (
    <article className="contact-us rt">
      <div className="main">
        <div className="side rt-bg right rt-14">
          <div className="item right rt-center rt-400">
            <i className="fa fa-map-signs rt"></i> بندرترکمن خیابان استقلال- استقلال 28
          </div>
          <a href="mailto:mohammadmrb.org@gmail.com" className="item right rt-center rt-400 rt-555">
            <i className="fa fa-envelope-o rt"></i> mohammadmrb.org@gmail.com
          </a>
          <a href="tel:01734482229" className="item right rt-center rt-400 rt-555">
            <i className="fa fa-phone rt"></i> 01734482229
          </a>
          <div className="item right rt-center rt-400">
            <i className="fa fa-clock-o rt"></i> 10 صبح تا 10 شب
          </div>
        </div>
        <ContactForm />
      </div>
    </article>
  );
}
