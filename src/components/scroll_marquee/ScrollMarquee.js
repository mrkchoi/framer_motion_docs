import "./scrollMarquee.css";
import { InfiniteMarqueeRow } from "../infinite_marquee/InfiniteMarquee";

export default function ScrollMarquee() {
  return (
    <div className="flex h-screen flex-col justify-center">
      <InfiniteMarqueeRow
        direction="left"
        speed="27s"
        fontWeight="bold"
        fontSize="10rem"
        lineHeight="9rem"
        uppercase={false}
        content={[
          { text: "Infinite", outline: true },
          { text: "Scroll", outline: false },
          { text: "Example", outline: true },
          { text: "End", outline: false },
        ]}
      />
      <InfiniteMarqueeRow
        direction="right"
        speed="50s"
        fontWeight="bold"
        fontSize="10rem"
        lineHeight="9rem"
        uppercase={false}
        content={[
          { text: "Testing", outline: true },
          { text: "Second", outline: false },
          { text: "Row", outline: true },
          { text: "Start", outline: false },
        ]}
      />
      <InfiniteMarqueeRow
        direction="left"
        speed="15s"
        fontWeight="bold"
        fontSize="10rem"
        lineHeight="9rem"
        uppercase={false}
        content={[
          { text: "Frontend", outline: true },
          { text: "Engineer", outline: false },
          { text: "Javascript", outline: true },
          { text: "Expert", outline: false },
        ]}
      />
      <InfiniteMarqueeRow
        direction="left"
        speed="50s"
        fontWeight="bold"
        fontSize="10rem"
        lineHeight="9rem"
        uppercase={false}
        content={[
          { text: "Christine", outline: true },
          { text: "Choi", outline: false },
          { text: "Visual", outline: true },
          { text: "Designer", outline: false },
        ]}
      />
      <InfiniteMarqueeRow
        direction="left"
        speed="15s"
        fontWeight="bold"
        fontSize="10rem"
        lineHeight="9rem"
        uppercase={false}
        content={[
          { text: "Frontend", outline: true },
          { text: "Engineer", outline: false },
          { text: "Javascript", outline: true },
          { text: "Expert", outline: false },
        ]}
      />
    </div>
  );
}
