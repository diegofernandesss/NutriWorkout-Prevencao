import tw from 'tailwind-styled-components';

export const FooterBackground = tw.footer`
    bg-gray-900
`;

export const FooterContainer = tw.div`
    mx-auto 
    w-full 
    max-w-screen-xl 
    p-4 
    py-6 
    lg:py-8
    sm:container 
    xl:max-w-screen-xl 
`;

export const FlexContainer = tw.div`
    md:flex 
    md:justify-between
`;

export const Logo = tw.div`
    mb-6
    md:mb-0
`;

export const LogoContainer = tw.div`
    flex 
    items-center 
    bg-gray-900
`;

export const LogoText = tw.h1`
    h-8 
    mr-3 
    text-white 
    font-semibold 
    whitespace-nowra 
    text-2xl
`;

export const LogoHighlight = tw.span`
    text-primary 
    self-center 
    text-2xl 
    font-semibold 
    whitespace-nowrap 
    dark:text-primary 
    bg-violet-700
    text-white-500
`;

export const StyledH2 = tw.h2`
    mb-6 
    text-sm 
    font-semibold 
    uppercase 
    text-white
`;

export const ContentGrid = tw.div`
    grid 
    grid-cols-2 
    gap-8 
    sm:gap-6 
    sm:grid-cols-3
`;

export const Section = tw.div``;

export const TeamList = tw.ul`
    text-gray-600 
    dark:text-gray-400 
    font-medium
`;
export const TeamListItem = tw.li`
    mb-2 
    md:mr-4
`;
export const TeamMember = tw.div`
    text-gray-400 
    cursor-pointer 
    text-sm 
    hover:text-white 
    hover:underline
`;

export const ContactSection = tw.div``;

export const ContactList = tw.ul`
    text-gray-600 
    dark:text-gray-400 
    font-medium 
    flex
`;
export const ContactItem = tw.li`
    mb-4
`;
export const ContactButton = tw.button`
    text-gray-400 
    hover:text-white 
    hover:underline 
    focus:outline-none 
    mx-1
`;

export const CustomSpan = tw.span`
    text-sm 
    sm:text-center 
    text-gray-400
`;

export const AdditionalContent = tw.div`
    flex 
    mt-4 
    space-x-6 
    sm:justify-center 
    sm:mt-0
`;

export const CustomHr = tw.hr`
    my-6 
    border-gray-200 
    sm:mx-auto lg:my-8
`;