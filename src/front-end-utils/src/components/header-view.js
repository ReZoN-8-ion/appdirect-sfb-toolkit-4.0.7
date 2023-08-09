import React from "react"
import Cookies from "js-cookie"
import PropTypes from "prop-types"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NO_ROLE, MARKETPLACE_MANAGER, USER } from '../constants/roleType'
import { HOME_PAGE_URL, MOCK_ADMIN_PAGE_URL } from '../constants/pageUrl'

import { 
  faFingerprint, 
  faInfoCircle, 
  faUserCog, 
  faHSquare, 
  faLock,
  faUnlock,
  faShoppingCart 
} from '@fortawesome/free-solid-svg-icons'

import Item from "./base/item"

const Section = styled.div`
  transition: height 0.3s;
  background: #52534e;
  height: ${({ isOpen }) => (isOpen ? "234px" : "0px")};
  overflow: hidden;
`

const Input = styled.input`
  height: 24px;
  width: 89px;
  color: #fff;
  padding: 6px;
  background: #000;
  font-size: 12px;
  border: 1px solid #979797;
`

const Link = styled.a`
  color: #eee;
  display: inline-block;
  padding: 0 5px;
  vertical-align: middle;
  font-size: 14px;
`

const Button = styled.button`
  border: 1px solid #979797;
  box-shadow: none;
  font-weight: normal;
  text-shadow: none;
  outline: none;
  color: #eee;
  background: transparent;
  display: inline-block;
  padding: 4px 6px;
  font-size: 12px;
  border-radius: 2px;
  line-height: 10px;
  vertical-align: middle;
  margin-left: 4px;
  height: 24px;
`

const Form = styled.div`
  background: #52534e;
  width: 160px;
  padding: 5px;
`

const LOGGED_IN_HEADER_TEMPLATE = "headerIn";
const COOKIE_EXPIRATION_IN_DAYS = 1/3;

const updateMockUserCookies = (role) => {
  switch(role) {
    case USER:
      Cookies.set("mockUserLoggedInHeader", true, { expires: COOKIE_EXPIRATION_IN_DAYS })
      Cookies.set('mockRole', role, { expires: COOKIE_EXPIRATION_IN_DAYS });
      break;
    case MARKETPLACE_MANAGER:
      Cookies.set("mockUserLoggedInHeader", true, { expires: COOKIE_EXPIRATION_IN_DAYS })
      Cookies.set('mockRole', role, { expires: COOKIE_EXPIRATION_IN_DAYS });
      window.location.href = MOCK_ADMIN_PAGE_URL;
      break;
    default:
      Cookies.remove("mockUserLoggedInHeader")
      Cookies.remove("mockRole");
  }
}
export default class HeaderView extends React.Component {
  static propTypes = {
    status: PropTypes.string,
    showHideMedium: PropTypes.func,
    hideForms: PropTypes.bool
  }

  static defaultProps = {
    status: "small",
    showHideMedium: () => {},
    hideForms: false
  }

  constructor(props) {
    super(props)
    this.state = {
      sectionIsOpen: false,
      token: "",
      selectedHeader: window.localStorage.getItem("useTemplate"),
      savedToken: window.localStorage.getItem("access_token")
    }
  }

  setHeaderTemplate = (tpl, role) => () => {
    window.localStorage.removeItem("access_token")
    const currentUrl = window.location.href;
    if(currentUrl && currentUrl.includes("admin") && role !== MARKETPLACE_MANAGER) {
      window.location.href = HOME_PAGE_URL;
      tpl = "headerOut";
      role = NO_ROLE;
    }

    updateMockUserCookies(role);

    window.localStorage.setItem("useTemplate", tpl)
    if(role !== MARKETPLACE_MANAGER && role !== NO_ROLE) {
      window.location.reload()
    }
  }

  setLoggedInTemplate = () => {
    Cookies.remove("mockUserLoggedInHeader")
    Cookies.remove("mockRole")
    window.localStorage.setItem("access_token", this.state.token)
    window.localStorage.removeItem("useTemplate")
    window.location.href = MOCK_ADMIN_PAGE_URL;
  }

  handleChange = event => {
    this.setState({ token: event.target.value })
  }

  openSection = () => {
    this.setState({
      sectionIsOpen: !this.state.sectionIsOpen
    })
  }

  render() {
    const { sectionIsOpen, selectedHeader, savedToken, value } = this.state
    return (
      <div>
        <Item
          iconAlign="2px"
          onClickHandler={this.openSection}
          {...this.props}
          icon={<FontAwesomeIcon icon={faHSquare} />}
          title="Header Views"
          action="open:header-view"
        />
        <Section isOpen={sectionIsOpen}>
         <Item
            onClickHandler={this.setHeaderTemplate("headerSso")}
            iconAlign="3px"
            {...this.props}
            subItem
            isSelected={!!(selectedHeader === "headerSso")}
            icon={<FontAwesomeIcon icon={faFingerprint} />}
            title="SSO Flow"
            action="header:view-sso"
          />
          <Item
            onClickHandler={this.setHeaderTemplate("headerCheckout")}
            {...this.props}
            subItem
            isSelected={!!(selectedHeader === "headerCheckout")}
            icon={<FontAwesomeIcon icon={faShoppingCart} />}
            title="Cart Flow"
            action="header:view-checkout"
          />
          <Item
            onClickHandler={this.setHeaderTemplate("headerOut")}
            iconAlign="3px"
            subItem
            isSelected={
              !!(
                (selectedHeader === "headerOut" || !selectedHeader) &&
                !savedToken
              )
            }
            {...this.props}
            icon={<FontAwesomeIcon icon={faUnlock} />}
            title="Logged Out Store"
            action="header:view-loggedout"
          />
          <Item
            onClickHandler={this.setHeaderTemplate(LOGGED_IN_HEADER_TEMPLATE, USER)}
            {...this.props}
            iconAlign="3px"
            subItem
            isSelected={!!(selectedHeader === LOGGED_IN_HEADER_TEMPLATE)}
            icon={<FontAwesomeIcon icon={faLock} />}
            title="Logged In Store"
            action="header:view-loggedin"
          />
          <Item
            onClickHandler={this.setHeaderTemplate("headerAdmin", MARKETPLACE_MANAGER)}
            {...this.props}
            iconAlign="3px"
            subItem
            isSelected={selectedHeader === "headerAdmin" || savedToken }
            icon={<FontAwesomeIcon icon={faUserCog} />}
            title="Admin"
            action="open:mock-admin"
          />
          { !this.props.hideForms &&
            <Form>
              <Input
                type="text"
                value={value}
                onChange={this.handleChange}
                placeholder="Access Token"
                data-auto-action="header:input-token"
              />
              <Button
                onClick={this.setLoggedInTemplate}
                data-auto-action="header:view-loggedin"
              >
                GO
              </Button>
              <Link
                target="_blank"
                href="https://help.appdirect.com/platform/Default.htm#StorefrontBuilder/sfb-create-the-header-and-footer.htm"
              >
                <FontAwesomeIcon icon={faInfoCircle} />
              </Link>
            </Form>
          }
        </Section>
      </div>
    )
  }
}
