import { SVGProps } from 'react';

const LinkedInIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
    <circle cx="24" cy="24" r="24" fill="#0A66C2" />
    <circle cx="17.5" cy="15" r="3.5" fill="#F1F2F2" />
    <path d="M17.5 21V34" stroke="#F1F2F2" strokeWidth="7" strokeLinecap="round" />
    <path
      d="M25 34V23Q25 15 32 15Q39 15 39 23V34"
      stroke="#F1F2F2"
      strokeWidth="7"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export default LinkedInIcon;
