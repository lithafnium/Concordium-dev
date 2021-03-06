import React from 'react';
import Navbar from '../components/Navbar';
import {
  SplashScreen, Statistics, Advisors, Team, Footer, Information,
  Partners,
} from '../components';

export default function ContactUs() {
  return (
    <div>
    <div className="home">
      <Navbar />
    </div>
      <section className="text-gray-700 body-font relative pt-20">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Contact Us</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base"> We greatly value all your feedback, inquiries and questions</p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <input className="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2" placeholder="Name" type="text" />
              </div>
              <div className="p-2 w-1/2">
                <input className="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2" placeholder="Email" type="email" />
              </div>
              <div className="p-2 w-full">
                <textarea className="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none h-48 focus:border-indigo-500 text-base px-4 py-2 resize-none block" placeholder="Message" defaultValue={""} />
              </div>
              <div className="p-2 w-full">
                <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Submit</button>
              </div>
              <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                <a href="mailto:team@theconcordium.org" className="text-indigo-500">team@theconcordium.org</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="home">
        <Footer />
      </div>
    </div>
  );
}
