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
          <h6 className="footer-title">Socials & Links</h6>
          <a
            href="https://github.com/mkarabul/blu-map"
            className="link link-hover"
          >
            GitHub
          </a>
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
        <nav>
          <h6 className="footer-title">Feedback</h6>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScy6-foxsYnpPIg0_ibmvxCLZzvAG74Ysuov229H_xgjiF-Gg/viewform?usp=sf_link"
            className="link link-hover"
            target="_blank"
            rel="noopener noreferrer"
          >
            Recommendations
          </a>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfJVhfK8FKvMEm27yuxXlRQahrCmeDpQYqHxW3bx5F3ft_YYw/viewform?usp=sf_link"
            className="link link-hover"
            target="_blank"
            rel="noopener noreferrer"
          >
            Posts
          </a>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfrG0imeuf0rKzIDaC11tiKErnlwO02zc8PhPDbxtltUBrxow/viewform?usp=sf_link"
            className="link link-hover"
            target="_blank"
            rel="noopener noreferrer"
          >
            Trips
          </a>
        </nav>
        <nav>
          <div>© Copyright 2024</div>
          <div>All Right Reserved.</div>
          <div>Powered by the Blu-Map Team.</div>
        </nav>
      </footer>
    </footer>
  );
}

export default Footer;
