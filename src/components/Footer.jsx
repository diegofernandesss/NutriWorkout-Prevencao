import { BsFacebook, BsInstagram } from 'react-icons/bs'
import {
    FooterBackground, FooterContainer, FlexContainer, LogoContainer,
    StyledH2, LogoText, LogoHighlight, Section, TeamListItem, TeamMember,
    ContactSection, ContactList, ContactItem, ContactButton, CustomSpan,
    AdditionalContent, CustomHr, Logo, TeamList, ContentGrid
  } from './FooterCss';


export const Footer = ()=>{

    const team = [
        {name: "Diego Fernandes"},
        {name: "Jardiel Carlos"},
    ]

    const advisor = [
        {name: "João Ricardo"}
    ]

    const contacts = [
        { icon: <BsFacebook size={18} />, link:"" },
        { icon: <BsInstagram size={18} />, link:"" }
    ]

    return(
        <>
            <FooterBackground>
                <FooterContainer>
                    <FlexContainer>
                        <Logo>
                            <LogoContainer>
                                <LogoText>Nutri<LogoHighlight> Workout</LogoHighlight></LogoText> {/** Nome do Projeto */}
                            </LogoContainer>
                        </Logo>
                        <ContentGrid>
                            <Section>
                                <StyledH2>Equipe</StyledH2> {/** Equipe De Desenvolvimento */}
                                <TeamList>
                                {team.map((names, index) => (
                                    <TeamListItem key={index}>
                                        <TeamMember>{names.name}</TeamMember>
                                    </TeamListItem>
                                ))}
                                </TeamList>
                            </Section>

                            <Section>
                                <StyledH2>Orientador</StyledH2> {/** Orientador Do Desenvolvimento */}
                                <TeamList>
                                {advisor.map((names, index) => (
                                    <TeamListItem key={index}>
                                        <TeamMember>{names.name}</TeamMember>
                                    </TeamListItem>
                                ))}
                                </TeamList>
                            </Section>

                            <ContactSection>
                                <StyledH2>Contatos</StyledH2> {/** Contatos do Projeto*/}
                                <ContactList>
                                {contacts.map((contact, index) => (
                                    <ContactItem key={index}>
                                        <ContactButton onClick={() => window.open(contact.link, "_blank")}>
                                            {contact.icon}
                                        </ContactButton>
                                    </ContactItem>
                                ))}
                                </ContactList>
                            </ContactSection>
                        </ContentGrid>
                    </FlexContainer>
                    <CustomHr />

                    <div className="sm:flex sm:items-center sm:justify-between">
                    <CustomSpan>© 2023</CustomSpan>
                    <AdditionalContent>
                    </AdditionalContent>
                    </div>
                </FooterContainer>
                </FooterBackground>

        </>
    );
}