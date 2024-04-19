import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="footer-container bg-base-200 text-base-content">
      <footer className="footer p-10">
        <aside>
          <img
            src="/blu-map-logo.jpeg"
            className="mr-2"
            style={{ width: "100px", height: "90px" }}
            alt="Blu-Map Logo"
          />
          <p>
            Blu-Map
            <br />
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Popular Locations</h6>
          <Link href="/West Lafayette" className="link link-hover">
            West Lafayette
          </Link>
          <Link href="/Paris" className="link link-hover">
            Paris
          </Link>
          <Link href="/Tokyo" className="link link-hover">
            Tokyo
          </Link>
          <Link href="/London" className="link link-hover">
            London
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Contact Support</h6>
          <Link href="/Contact Us" className="link link-hover">
            Contact Us
          </Link>
          <Link href="/tutorial" className="link link-hover">
            FAQs
          </Link>
        </nav>
      </footer>
    </footer>
  );
}

export default Footer;
