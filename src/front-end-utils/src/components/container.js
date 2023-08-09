import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faBook,
  faTh
} from "@fortawesome/free-solid-svg-icons"

import Item from "./base/item"
import HeaderView from "./header-view"
import DataView from "./data-view"
import Search from "./search"

const Toolbar = styled.div`
  display: block;
  @media (max-width: 641px) {
    display: none;
  }
  position: fixed;
  background: #2d2a27;
  opacity: ${({ show }) => (show === true ? 1 : 0)};
  z-index: 99999;
  top: 100px;
  right: 15px;
  width: ${({ size }) => size};
  transition: width 0.3s;
`
export default class Container extends React.Component {
  static showDocumentation() {
    window.open(
      "https://help.appdirect.com/appmarket/Default.htm#StorefrontBuilder/sfb-getting-started.htm%3FTocPath%3DMarketplace%2520Manager%7CStorefront%2520Builder"
    )
  }

  constructor(props) {
    super(props)
    this.state = {
      show: true,
      size: "35px",
      status: "small",
      hideForms: true,
      hideGrid: true
    }
  }

  showHideMedium = () => {
    const isSmall = this.state.status === "small"
    this.setState({
      size: isSmall ? "157px" : "35px",
      status: isSmall ? "medium" : "small",
      hideForms: !isSmall
    })
  }

  showHideLarge = () => {
    const isLarge = this.state.status === "large"
    this.setState({
      size: !isLarge ? "440px" : "35px",
      status: !isLarge ? "large" : "small",
      hideForms: isLarge
    })
  }

  toggleGrid = () => {
    this.setState({
      hideGrid: !this.state.hideGrid
    })
  }

  render() {
    const { show, status, size, hideForms } = this.state
    const itemProps = {
      status,
      size,
      hideForms
    }

    const gridColumns = []
    const gridRows = []

    for (let i = 0; i < 16; i += 1) {
      gridColumns.push(<div className="utility-grid--column" key={i} />)
    }
    for (let i = 0; i < 120; i += 1) {
      gridRows.push(<div className="utility-grid--row" key={i} />)
    }

    const exampleGrid = (
      <div id="grid" className="utility_overlay">
        <div className="utility_overlay--container layout-default">
          <div className="utility-grid--columns container">{gridColumns}</div>
          <div className="utility-grid--rows">{gridRows}</div>
        </div>
      </div>
    )

    return (
      <div>
        <Toolbar show={show} size={size} data-auto-container="devtools:panel">
          <Item
            onClickHandler={this.showHideMedium}
            {...itemProps}
            icon={
              <img
                width="20px"
                alt=""
                src="https://marketplace.appdirect.com/wicket/resource/com.appdirect.wicket.resources.Resource/spa/themes/appdirectapp/images/logo_white_2x.png"
              />
            }
            title="Dev Tools"
            action="open:devtools"
          />
          <Item
            border
            {...itemProps}
            onClickHandler={this.constructor.showDocumentation}
            iconAlign="2px"
            icon={<FontAwesomeIcon icon={faBook} />}
            title="Documentation"
            action="open:documentation"
          />
          <HeaderView {...itemProps} showHideMedium={this.showHideMedium} />
          <DataView {...itemProps} showHideLarge={this.showHideLarge} />
          <Search {...itemProps} />
          <Item
            {...itemProps}
            onClickHandler={this.toggleGrid}
            iconAlign="2px"
            icon={<FontAwesomeIcon icon={faTh} />}
            title="Show Grid"
            action="open:grid"
          />
          <Item
            border
            {...itemProps}
            onClickHandler={this.showHideMedium}
            iconAlign="2px"
            icon={
              <FontAwesomeIcon
                icon={
                  status === "small" ? faAngleDoubleLeft : faAngleDoubleRight
                }
              />
            }
            title={status === "small" ? "Expand" : "Collapse"}
            action="open:devtools"
          />
        </Toolbar>

        {!this.state.hideGrid && exampleGrid}
      </div>
    )
  }
}
