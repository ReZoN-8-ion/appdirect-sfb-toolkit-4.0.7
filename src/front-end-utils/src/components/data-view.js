import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ReactJson from "react-json-view"
import { faDatabase } from "@fortawesome/free-solid-svg-icons"

import Item from "./base/item"

const Section = styled.div`
  transition: height 0.3s;
  background: #2c303b;
  height: ${({ isOpen, status }) =>
    isOpen && status === "large" ? "380px" : "0px"};
  overflow: ${({ isOpen, status }) =>
    isOpen && status === "large" ? "auto" : "hidden"};

  .string-value {
    &:hover {
      cursor: pointer !important;
      background: #666 !important;
    }
  }
`

export default class DataView extends React.Component {
  static defaultProps = {
    showHideLarge: () => {},
    status: "small"
  }

  static propTypes = {
    showHideLarge: PropTypes.func,
    status: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.state = {
      sectionIsOpen: false
    }
  }

  openSection = () => {
    this.setState({
      sectionIsOpen: true
    })
    this.props.showHideLarge()
  }

  copySelection = selection => {
    const selectionParents = selection.namespace
    selectionParents.push(selection.name)
    const dataClip = selectionParents.join(".")
    const dataContainer = document.createElement("textarea")
    dataContainer.style.position = "absolute"
    dataContainer.style.top = `${window.scrollY}px`
    dataContainer.style.opacity = "0"
    dataContainer.className = "js-copy-tree"
    dataContainer.value = dataClip
    document.body.appendChild(dataContainer)
    dataContainer.focus()
    dataContainer.select()

    try {
      document.execCommand("copy")
    } catch (err) {
      console.log("Unable to copy selection")
    }
    window.getSelection().removeAllRanges()
    dataContainer.parentNode.removeChild(dataContainer)
  }

  render() {
    const { sectionIsOpen } = this.state
    const { status } = this.props
    return (
      <div>
        <Item
          iconAlign="3px"
          onClickHandler={this.openSection}
          {...this.props}
          icon={<FontAwesomeIcon icon={faDatabase} />}
          title="Data Viewer"
          action="open:data-viewer"
        />
        <Section isOpen={sectionIsOpen} status={status}>
          {sectionIsOpen && (
            <ReactJson
              collapsed={1}
              src={window.dataStore}
              theme="ocean"
              enableClipboard={false}
              onSelect={this.copySelection}
            />
          )}
        </Section>
      </div>
    )
  }
}
