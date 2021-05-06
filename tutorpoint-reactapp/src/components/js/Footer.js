import React from 'react';
import {animateScroll as scroll} from 'react-scroll'
import {FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaLinkedin} from 'react-icons/fa'
import { FooterContainer, FooterLink, FooterLinksContainer, FooterLinksItems, FooterLinksWrapper, FooterLinkTitle, FooterWrap, SocialMedia, SocialMediaWrap, SocialLogo, WebsiteRights, SocialIcons, SocialIconLink } from './FooterElements';


const Footer = () => {

    const toggleHome = () => {
        window.scrollTo(0,0);
    }

    return (
    <FooterContainer>
        <FooterWrap>
                <SocialMedia>
                    <SocialMediaWrap>
                        <SocialLogo onClick={toggleHome} to='/homepage'>
                            TutorPoint
                        </SocialLogo>
                        <WebsiteRights>TutorPoint © {new Date().getFullYear()}All rights reserved.</WebsiteRights>
                        <SocialIcons>
                            <SocialIconLink href='http://www.facebook.com' target='_blank' aria-label='Facebook'><FaFacebook /> </SocialIconLink>
                            <SocialIconLink href='http://www.instagram.com' target='_blank' aria-label='Instagram'><FaInstagram /> </SocialIconLink>
                            <SocialIconLink href='http://www.youtube.com' target='_blank' aria-label='Youtube'><FaYoutube /> </SocialIconLink>
                            <SocialIconLink href='http://www.twitter.com/' target='_blank' aria-label='Twitter'><FaTwitter /> </SocialIconLink>
                            <SocialIconLink href='http://www.linkedin.com/in/' target='_blank' aria-label='LinkedIn'><FaLinkedin /> </SocialIconLink>
                        </SocialIcons>
                    </SocialMediaWrap>
                </SocialMedia>
        </FooterWrap>
    </FooterContainer>
    )
};

export default Footer;