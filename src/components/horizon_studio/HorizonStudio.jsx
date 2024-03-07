import React from "react";
import SmoothScroll from "../lenis/SmoothScroll";

import "./horizonStudio.css";

const items = [
  { id: "1", title: "Home" },
  { id: "2", title: "Studio" },
  { id: "3", title: "Service" },
  { id: "4", title: "Project" },
  { id: "5", title: "Contact" },
];

export default function HorizonStudio() {
  return (
    <SmoothScroll>
      <div className="horizonStudio__main">
        <div className="horizonStudio__navOuter">
          <div className="horizonStudio__navHalf horizonStudio__navHalf--left">
            {items.map((item) => (
              <button key={item.id} className="horizonStudio__navItem">
                <div className="horizonStudio__navItem--left">
                  <span className="horizonStudio__navItem--pre">{item.id}</span>
                  <span className="horizonStudio__navItem--title">
                    {item.title}
                  </span>
                </div>
                <div className="horizonStudio__navItem--right">
                  <div className="horizonStudio__navItemBtn">
                    <div className="horizonStudio__navItemBtn--inner">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="horizonStudio__navItem--wipe"></div>
              </button>
            ))}
          </div>
          <div className="horizonStudio__navHalf horizonStudio__navHalf--right">
            <div className="horizonStudio__navContact--outer">
              <div className="horizonStudio__navHeader">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 665 72"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.96875 8.5625H10.25V34.3438H41.9375V8.5625H51.2188V71H41.9375V43.1562H10.25V71H0.96875V8.5625ZM57.245 40.5312C57.245 33.9062 58.4325 28.1562 60.8075 23.2812C63.1825 18.3438 66.495 14.5 70.745 11.75C75.0575 9 80.0887 7.625 85.8387 7.625C91.5262 7.625 96.495 9 100.745 11.75C105.057 14.5 108.401 18.3438 110.776 23.2812C113.151 28.1562 114.339 33.9062 114.339 40.5312C114.339 46.7812 113.151 52.25 110.776 56.9375C108.401 61.625 105.057 65.2812 100.745 67.9062C96.495 70.4688 91.5262 71.75 85.8387 71.75C80.0887 71.75 75.0575 70.4688 70.745 67.9062C66.495 65.2812 63.1825 61.625 60.8075 56.9375C58.4325 52.25 57.245 46.7812 57.245 40.5312ZM104.776 40.5312C104.776 32.9062 103.12 26.9688 99.8075 22.7188C96.495 18.4062 91.8387 16.25 85.8387 16.25C79.7762 16.25 75.0575 18.4062 71.6825 22.7188C68.37 26.9688 66.7137 32.9062 66.7137 40.5312C66.7137 47.6562 68.37 53.2188 71.6825 57.2188C75.0575 61.1562 79.7762 63.125 85.8387 63.125C91.8387 63.125 96.495 61.1562 99.8075 57.2188C103.12 53.2188 104.776 47.6562 104.776 40.5312ZM143.146 46.4375H129.646V71H120.365V8.5625H147.365C151.365 8.5625 154.834 9.3125 157.771 10.8125C160.771 12.3125 163.084 14.4375 164.709 17.1875C166.334 19.875 167.146 23.0625 167.146 26.75C167.146 30.6875 166.084 34.0312 163.959 36.7812C161.834 39.5312 158.927 41.4688 155.24 42.5938C158.552 43.2812 160.99 44.6875 162.552 46.8125C164.177 48.9375 165.24 52.0938 165.74 56.2812L167.427 71H158.24L156.646 57.3125C156.209 53.5 154.927 50.75 152.802 49.0625C150.74 47.3125 147.521 46.4375 143.146 46.4375ZM146.052 16.7188H129.646V38.2812H146.052C149.74 38.2812 152.615 37.375 154.677 35.5625C156.74 33.6875 157.771 31.0625 157.771 27.6875C157.771 24.25 156.74 21.5625 154.677 19.625C152.615 17.6875 149.74 16.7188 146.052 16.7188ZM173.173 8.5625H182.548V71H173.173V8.5625ZM188.761 8.5625H234.699V18.3125L198.98 62.8438H234.699V71H188.761V61.25L224.386 16.7188H188.761V8.5625ZM238.944 40.5312C238.944 33.9062 240.131 28.1562 242.506 23.2812C244.881 18.3438 248.194 14.5 252.444 11.75C256.756 9 261.788 7.625 267.538 7.625C273.225 7.625 278.194 9 282.444 11.75C286.756 14.5 290.1 18.3438 292.475 23.2812C294.85 28.1562 296.038 33.9062 296.038 40.5312C296.038 46.7812 294.85 52.25 292.475 56.9375C290.1 61.625 286.756 65.2812 282.444 67.9062C278.194 70.4688 273.225 71.75 267.538 71.75C261.788 71.75 256.756 70.4688 252.444 67.9062C248.194 65.2812 244.881 61.625 242.506 56.9375C240.131 52.25 238.944 46.7812 238.944 40.5312ZM286.475 40.5312C286.475 32.9062 284.819 26.9688 281.506 22.7188C278.194 18.4062 273.538 16.25 267.538 16.25C261.475 16.25 256.756 18.4062 253.381 22.7188C250.069 26.9688 248.413 32.9062 248.413 40.5312C248.413 47.6562 250.069 53.2188 253.381 57.2188C256.756 61.1562 261.475 63.125 267.538 63.125C273.538 63.125 278.194 61.1562 281.506 57.2188C284.819 53.2188 286.475 47.6562 286.475 40.5312ZM343.689 8.5625H352.876V71H343.033L311.345 21.5938V71H302.064V8.5625H313.876L343.689 55.8125V8.5625ZM404.84 42.5938L397.621 41.6562C391.559 40.9062 386.902 39.1875 383.652 36.5C380.465 33.8125 378.871 30.1875 378.871 25.625C378.871 20.125 380.809 15.7812 384.684 12.5938C388.621 9.34375 393.965 7.71875 400.715 7.71875C407.215 7.71875 412.465 9.4375 416.465 12.875C420.465 16.25 422.746 20.9062 423.309 26.8438H418.34C417.59 22.0312 415.777 18.4687 412.902 16.1562C410.09 13.8438 405.996 12.6875 400.621 12.6875C395.496 12.6875 391.371 13.8438 388.246 16.1562C385.184 18.4687 383.652 21.5625 383.652 25.4375C383.652 28.625 384.84 31.0938 387.215 32.8438C389.652 34.5938 393.246 35.7812 397.996 36.4062L405.215 37.4375C418.09 39 424.527 44.6875 424.527 54.5C424.527 59.75 422.527 63.9375 418.527 67.0625C414.59 70.1875 409.371 71.75 402.871 71.75C395.684 71.75 389.965 70 385.715 66.5C381.465 63 379.027 58.4062 378.402 52.7188H383.559C384.371 57.5312 386.34 61.0938 389.465 63.4062C392.652 65.7188 397.152 66.875 402.965 66.875C407.965 66.875 411.996 65.7812 415.059 63.5938C418.121 61.3438 419.652 58.3125 419.652 54.5C419.652 47.6875 414.715 43.7188 404.84 42.5938ZM468.616 8.5625V13.25H449.397V71H444.616V13.25H425.397V8.5625H468.616ZM473.799 8.5625H478.58V47.2812C478.58 53.5312 480.174 58.375 483.361 61.8125C486.611 65.25 491.111 66.9688 496.861 66.9688C502.611 66.9688 507.049 65.25 510.174 61.8125C513.361 58.375 514.955 53.5312 514.955 47.2812V8.5625H519.83V47.2812C519.83 52.1562 518.861 56.4375 516.924 60.125C514.986 63.8125 512.299 66.6875 508.861 68.75C505.424 70.75 501.424 71.75 496.861 71.75C492.299 71.75 488.267 70.75 484.767 68.75C481.33 66.6875 478.642 63.8125 476.705 60.125C474.767 56.4375 473.799 52.1562 473.799 47.2812V8.5625ZM549.2 8.5625C554.513 8.5625 559.169 9.90625 563.169 12.5938C567.169 15.2812 570.263 19.0625 572.45 23.9375C574.7 28.75 575.825 34.4062 575.825 40.9062C575.825 46.9062 574.794 52.1875 572.731 56.75C570.669 61.25 567.763 64.75 564.013 67.25C560.325 69.75 556.013 71 551.075 71H526.888V8.5625H549.2ZM531.763 13.25V66.4062H550.138C556.638 66.4062 561.669 64.1875 565.231 59.75C568.856 55.25 570.669 48.9688 570.669 40.9062C570.669 32.1562 568.7 25.375 564.763 20.5625C560.888 15.6875 555.388 13.25 548.263 13.25H531.763ZM582.414 8.5625H587.289V71H582.414V8.5625ZM593.878 40.5312C593.878 33.9062 595.034 28.1562 597.346 23.2812C599.659 18.3438 602.878 14.5 607.003 11.75C611.19 9 616.034 7.625 621.534 7.625C627.034 7.625 631.846 9 635.971 11.75C640.096 14.5 643.315 18.3438 645.628 23.2812C647.94 28.1562 649.096 33.9062 649.096 40.5312C649.096 46.7812 647.94 52.25 645.628 56.9375C643.315 61.625 640.096 65.2812 635.971 67.9062C631.846 70.4688 627.034 71.75 621.534 71.75C616.034 71.75 611.19 70.4688 607.003 67.9062C602.878 65.2812 599.659 61.625 597.346 56.9375C595.034 52.25 593.878 46.7812 593.878 40.5312ZM644.034 40.5312C644.034 31.6562 642.065 24.75 638.128 19.8125C634.19 14.875 628.659 12.4062 621.534 12.4062C614.346 12.4062 608.784 14.875 604.846 19.8125C600.909 24.75 598.94 31.6562 598.94 40.5312C598.94 48.8438 600.909 55.3438 604.846 60.0312C608.784 64.6562 614.346 66.9688 621.534 66.9688C628.659 66.9688 634.19 64.6562 638.128 60.0312C642.065 55.3438 644.034 48.8438 644.034 40.5312ZM659.267 0.247995C660.547 0.247995 661.667 0.695995 662.627 1.592C663.651 2.424 664.163 3.768 664.163 5.62399C664.163 7.48 663.651 8.856 662.627 9.752C661.667 10.584 660.547 11 659.267 11C657.859 11 656.675 10.584 655.715 9.752C654.755 8.856 654.275 7.48 654.275 5.62399C654.275 3.768 654.755 2.424 655.715 1.592C656.675 0.695995 657.859 0.247995 659.267 0.247995Z"
                    fill="white"
                  ></path>
                </svg>
                <div className="horizonStudio__navHeader--address">
                  <span>323 Main Street,</span>
                  <span>Los Angeles, CA 90001</span>
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>

              <div className="horizonStudio__navContact--wrapper">
                <div className="horizonStudio__navContactRow">
                  <div className="horizonStudio__navContactItem">
                    <div className="horizonStudio__navContactItem--marker">
                      A
                    </div>
                    <div className="horizonStudio__navContactItem--content">
                      <span className="horizonStudio__navContactItem--title">
                        Business
                      </span>
                      <a
                        href="/"
                        className="horizonStudio__navContactItem--link"
                      >
                        info@horizonstudio.com
                      </a>
                    </div>
                  </div>
                  <div className="horizonStudio__navContactItem">
                    <div className="horizonStudio__navContactItem--marker">
                      B
                    </div>
                    <div className="horizonStudio__navContactItem--content">
                      <span className="horizonStudio__navContactItem--title">
                        Career
                      </span>
                      <a
                        href="/"
                        className="horizonStudio__navContactItem--link"
                      >
                        Job@horizonstudio.com
                      </a>
                    </div>
                  </div>
                </div>
                <div className="horizonStudio__navContactRow">
                  <div className="horizonStudio__navContactItem">
                    <div className="horizonStudio__navContactItem--marker">
                      C
                    </div>
                    <div className="horizonStudio__navContactItem--content">
                      <span className="horizonStudio__navContactItem--title">
                        Social
                      </span>
                      <a
                        href="/"
                        className="horizonStudio__navContactItem--link"
                      >
                        Instagram
                      </a>
                      <a
                        href="/"
                        className="horizonStudio__navContactItem--link"
                      >
                        Facebook
                      </a>
                      <a
                        href="/"
                        className="horizonStudio__navContactItem--link"
                      >
                        LinkedIn
                      </a>
                    </div>
                  </div>
                  <div className="horizonStudio__navContactItem">
                    <div className="horizonStudio__navContactItem--marker">
                      D
                    </div>
                    <div className="horizonStudio__navContactItem--content">
                      <span className="horizonStudio__navContactItem--title">
                        Legal
                      </span>
                      <a
                        href="/"
                        className="horizonStudio__navContactItem--link"
                      >
                        Privacy
                      </a>
                      <a
                        href="/"
                        className="horizonStudio__navContactItem--link"
                      >
                        Terms
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="horizonStudio__navFooter">
              <div className="horizonStudio__navFooter--content">
                <span className="horizonStudio__navFooter--year">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.146 4.992c-1.212 0-1.927.92-1.927 2.502v1.06c0 1.571.703 2.462 1.927 2.462.979 0 1.641-.586 1.729-1.418h1.295v.093c-.1 1.448-1.354 2.467-3.03 2.467-2.091 0-3.269-1.336-3.269-3.603V7.482c0-2.261 1.201-3.638 3.27-3.638 1.681 0 2.935 1.054 3.029 2.572v.088H9.875c-.088-.879-.768-1.512-1.729-1.512" />
                  </svg>
                  <span>2024</span>
                </span>
                <span className="horizonStudio__navFooter--subtext">
                  All Rights Reserved
                </span>
              </div>
            </div>
          </div>
          <button className="horizonStudio__navBtn--close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="white"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </button>
        </div>
      </div>
    </SmoothScroll>
  );
}
