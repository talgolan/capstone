import React from "react";
import { GoMarkGithub } from "react-icons/go";
import { AiOutlineLinkedin } from "react-icons/ai";

const Footer = () => {
  return (
    <footer>
      <div>
        <a
          href="https://github.com/2006-ghp-capstone-team-c/capstone"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GoMarkGithub color="##e36397" size={32} /> GitHub
        </a>
        <p>September 2020</p>
      </div>
      <div id="bottomRight">
        <div>
          <a href="https://www.linkedin.com/in/meganleaf/" target="_blank">
            <AiOutlineLinkedin size={25} /> Megan Leaf
          </a>
          <a href="https://www.linkedin.com/in/biligma-oyola/" target="_blank">
            <AiOutlineLinkedin size={25} />
            Biligma Oyola
          </a>
        </div>

        <div>
          <a
            href="https://www.linkedin.com/in/emma-seely-katz-b4386a1a3/"
            target="_blank"
          >
            <AiOutlineLinkedin size={25} /> Emma Seely-Katz
          </a>
          <a href="https://www.linkedin.com/in/loowang/" target="_blank">
            <AiOutlineLinkedin size={25} /> Lu Wang
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
