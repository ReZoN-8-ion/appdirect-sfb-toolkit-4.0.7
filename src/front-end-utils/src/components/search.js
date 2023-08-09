import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons"

import debounce from "../utils/debounce"
import Item from "./base/item"
import ResultItem from "./base/ResultItem"
import SearchBar from "./base/SearchBar"
import { SEARCH_TYPES, CATEGORIES, APPS } from "../constants/searchType"

const Modal = styled.div`
  position: fixed;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  top: 100px;
  opacity: ${({ show }) => (show ? "1" : "0")};
  padding: 25px 20px 30px 20px;
  border-radius: 3px;
  left: 30%;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  width: 600px;
  margin-left: -50px;
  background: #2d2a27;
  transform: ${({ show }) => (show ? " scale(1)" : "scale(1.15)")};
  transition: transform 0.3s, opacity 0.3s;
`

const CloseModalButon = styled.div`
  position: absolute;
  right: 8px;
  font-size: 12px;
  top: 2px;
  cursor: pointer;
  &:hover {
    color: #fff;
  }
`

const Results = styled.div`
  display: block;
  max-height: 500px;
  margin: 0 -20px;
  padding: 0 20px;
  overflow-y: auto;
`

const ResultTitle = styled.div`
  font-size: 11px;
  padding: 20px 0 0 0;
  text-transform: uppercase;
  color: #8e9ca8;
`
const SEARCH_APP_URL = "/api/marketplace/v1/listing?start=0&count=1000"
const NAVIGATOR_URL = "/api/marketplace/v1/navigator"

export default class SearchTool extends React.Component {
  static defaultProps = {
    searchDebounce: 500
  }

  static propTypes = {
    searchDebounce: PropTypes.number
  }

  constructor(props) {
    super(props)
    this.state = {
      openModal: false,
      showModal: false,
      searchValue: "",
      loading: false,
      hasResult: true,
      navigatorData: {},
      results: [],
      searchType: APPS,
      placeholder: SEARCH_TYPES.find(type => type.name === APPS).placeholder
    }
  }

  onSearchChange = e => {
    this.setState(
      {
        searchValue: e.target.value
      },
      () => {
        this.search()
      }
    )
    if (e.target.value) {
      this.setState({
        loading: true
      })
    }
  }

  getSubType() {
    return this.state.searchType === CATEGORIES ? "subCategories" : "attributes"
  }

  getResultItem(item, indented = false, type) {
    let el
    const { searchType } = this.state
    if (searchType === "Apps") {
      el = (
        <ResultItem
          key={item.id}
          title={item.name}
          excerp={item.blurb}
          type={searchType}
          data={item}
        />
      )
    } else if (/^(Categories|Attributes)$/.test(searchType)) {
      el = (
        <div key={item.id}>
          <ResultItem
            indented={indented}
            title={item.name}
            hasMoreData
            isDisabled={item.numTaggedProducts === undefined}
            excerp={
              item.numTaggedProducts ? `${item.numTaggedProducts} apps` : ""
            }
            type={type || searchType}
            data={item}
          />
          {item.subItems &&
            !!item.subItems.length &&
            item.subItems.map(subItem =>
              this.getResultItem(subItem, true, this.getSubType())
            )}
        </div>
      )
    }
    return el
  }

  setNavigatorResult() {
    let results = []
    const { searchValue, navigatorData, searchType } = this.state
    const items =
      searchType === "Categories"
        ? navigatorData.categories
        : navigatorData.attributeGroups

    results = items.map(cat => {
      const predefSub = cat.preDefinedAttributes || []
      const subItems = cat[this.getSubType()] || []
      return Object.assign({}, cat, {
        subItems: subItems.concat(predefSub)
      })
    })
    if (searchValue) {
      const searchValueNormalized = searchValue.toLowerCase()
      results = results.map(cat =>
        Object.assign({}, cat, {
          subItems: cat.subItems.filter(subCat =>
            subCat.name.toLowerCase().includes(searchValueNormalized)
          )
        })
      )
      results = results.filter(
        item =>
          (item.subItems && item.subItems.length) ||
          item.name.toLowerCase().includes(searchValueNormalized)
      )
    }
    this.setState({
      results,
      loading: false
    })
  }

  setInitialState() {
    this.setState({
      searchValue: "",
      loading: false,
      hasResult: true,
      results: []
    })
  }

  openCloseModal = () => {
    const currentState = this.state.openModal
    this.setState({
      openModal: !currentState
    })
    window.setTimeout(() => {
      this.setState({
        showModal: !currentState
      })
    }, 100)
  }

  search = debounce(() => {
    const { searchType, searchValue } = this.state
    if (searchType === "Apps" && searchValue) {
      this.searchApps()
    } else if (searchType === "Apps" && !searchValue) {
      this.setInitialState()
    } else if (/^(Categories|Attributes)$/.test(searchType)) {
      this.searchNavigator()
    }
  }, this.props.searchDebounce)

  searchApps() {
    fetch(`${SEARCH_APP_URL}&q=${this.state.searchValue}`)
      .then(resp => resp.json()) // Transform the data into json
      .then(results => {
        this.setState({
          results,
          hasResult: !!results.length,
          loading: false
        })
      })
  }

  searchNavigator() {
    const { navigatorData } = this.state
    if (!navigatorData.categories) {
      fetch(`${NAVIGATOR_URL}`)
        .then(resp => resp.json()) // Transform the data into json
        .then(results => {
          this.setState(
            {
              navigatorData: results,
              loading: false
            },
            () => {
              this.setNavigatorResult()
            }
          )
        })
    } else {
      this.setNavigatorResult()
    }
  }

  changeSearchFilter = e => {
    const searchType = e.target.value
    const { placeholder } = SEARCH_TYPES.find(el => el.name === searchType)
    this.setInitialState()
    this.setState(
      {
        searchType,
        placeholder
      },
      () => {
        if (/^(Categories|Attributes)$/.test(searchType)) {
          this.search()
        }
      }
    )
  }

  render() {
    const {
      openModal,
      showModal,
      placeholder,
      results,
      hasResult,
      searchValue,
      loading
    } = this.state
    return (
      <div>
        <Item
          iconAlign="3px"
          onClickHandler={this.openCloseModal}
          {...this.props}
          icon={<FontAwesomeIcon icon={faSearch} />}
          title="Search Data"
          action="open:search"
        />
        <Modal isOpen={openModal} show={showModal}>
          <CloseModalButon onClick={this.openCloseModal}>
            <FontAwesomeIcon icon={faTimes} />
          </CloseModalButon>
          <SearchBar
            placeholder={placeholder}
            value={searchValue}
            onSearchChange={this.onSearchChange}
            changeSearchFilter={this.changeSearchFilter}
            searchTypes={SEARCH_TYPES}
          />
          <Results>
            {!!results.length && !loading && <ResultTitle>Results</ResultTitle>}
            {!loading && results.map(item => this.getResultItem(item))}
            {!hasResult &&
              !loading && <ResultTitle>No Results Found</ResultTitle>}
            {loading && <ResultTitle>Retrieving...</ResultTitle>}
          </Results>
        </Modal>
      </div>
    )
  }
}
