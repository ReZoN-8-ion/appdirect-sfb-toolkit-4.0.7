import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import ReactJson from "react-json-view"
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism"

import { SEARCH_TYPES } from "../../constants/searchType"

const ResultItemContainer = styled.div`
  padding: 5px 0;
  ${({ isDisabled }) => !isDisabled && `cursor: pointer;`};
`
const ResultItemContent = styled.div`
  background: #2c303b;
  margin: 0 -20px;
  padding: 10px 20px;
`
const ResultItemTitle = styled.div`
  font-size: 16px;
  ${({ indented }) => indented && `padding-left: 10px;`};
  color: #fff;
`
const ResultItemTitleBig = styled.span`
  &:hover {
    ${({ isDisabled }) => !isDisabled && `text-decoration: underline;`};
  }
`

const ResultItemTitleSmall = styled.span`
  font-size: 10px;
  color: #aaa;
`
const ResultTitle = styled.div`
  font-size: 11px;
  text-transform: uppercase;
  color: #8e9ca8;
`

export default class ResultItem extends React.Component {
  static defaultProps = {
    title: "",
    type: "",
    excerp: "",
    indented: false,
    hasMoreData: false,
    isDisabled: false,
    data: {}
  }

  static propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    excerp: PropTypes.string,
    indented: PropTypes.bool,
    hasMoreData: PropTypes.bool,
    isDisabled: PropTypes.bool,
    data: PropTypes.object // eslint-disable-line
  }

  constructor(props) {
    super(props)
    this.state = {
      showContent: false,
      errorFetchingData: false,
      data: props.type === "Apps" ? props.data : {}
    }
  }

  onClickItem = () => {
    if (!this.props.isDisabled) {
      this.setState({
        showContent: !this.state.showContent
      })
      if (!this.state.showContent && this.props.hasMoreData) {
        const searchType = SEARCH_TYPES.find(el => el.name.toLowerCase() === this.props.type.toLowerCase());
        this.loadCustomData(this.props.data.id || this.props.data.queryAlias, this.props.data.id ? searchType.query : searchType.predefined)
      }
    }
  }

  getIntegrationString = () => {
    const { type, data } = this.props
    if (type === "Apps") {
      return `<data name="[to fill]" type="app" value="${data.id}" />`
    }
    if (type.toLowerCase() === "attributes" && !data.id) {
      return `<data name="[fill in]" type="list" filters="${data.queryAlias}" />`
    }
    return `<data name="[fill in]" type="list" ${type.toLowerCase()}="${data.id}" />`
  }

  loadCustomData(id, query = "") {
    fetch(`/api/marketplace/v1/listing?start=0&count=1000&${query}=${id}`)
      .then(resp => resp.json())
      .catch(() => {
        this.setState({
          errorFetchingData: true
        })
      })
      .then(data => {
        this.setState({
          data,
          errorFetchingData: false
        })
      })
  }

  render() {
    const { title, excerp, indented, isDisabled } = this.props
    const { showContent, data, errorFetchingData } = this.state
    return (
      <ResultItemContainer isDisabled={isDisabled}>
        <ResultItemTitle
          indented={indented}
          isDisabled={isDisabled}
          onClick={this.onClickItem}
          data-auto-action="search:open-item"
        >
          <ResultItemTitleBig isDisabled={isDisabled}>
            {title}
          </ResultItemTitleBig>
          &nbsp;&nbsp;
          <ResultItemTitleSmall>{excerp}</ResultItemTitleSmall>
        </ResultItemTitle>
        {showContent && (
          <ResultItemContent>
            <ResultTitle>Integration</ResultTitle>
            <SyntaxHighlighter
              data-auto-element="search:integration-content"
              language="javascript"
              style={atomDark}
            >
              {this.getIntegrationString()}
            </SyntaxHighlighter>
            <ResultTitle>Raw Data</ResultTitle>
            <ReactJson collapsed={0} src={data} theme="ocean" />
          </ResultItemContent>
        )}
        {errorFetchingData && (
          <ResultItemTitleSmall>Error Fetching Data</ResultItemTitleSmall>
        )}
      </ResultItemContainer>
    )
  }
}
