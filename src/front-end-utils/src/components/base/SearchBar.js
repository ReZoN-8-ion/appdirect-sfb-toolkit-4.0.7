import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faAngleDown } from "@fortawesome/free-solid-svg-icons"

const SelectContainer = styled.div`
  border-bottom: 1px solid #5b5754;
  width: 120px;
  float: left;
  height: 40px;
  margin-left: 25px;
  overflow: hidden;
  position: relative;
`
const IconFilterContainer = styled.div`
  position: absolute;
  right: 0px;
  font-size: 24px;
  color: #757575;
  top: 8px;
`

const Select = styled.select`
  padding: 5px 0px;
  width: 130%;
  border: none;
  color: #757575;
  box-shadow: none;
  font-size: 18px;
  background: transparent;
  background-image: none;
  outline: none;
  -webkit-appearance: none;
`
const SearchContainer = styled.div`
  height: 50px;
`

const SearchInputContainer = styled.div`
  float: left;
  width: 413px;
  position: relative;
  color: #757575;
`
const IconSearch = styled.div`
  position: absolute;
  right: 2px;
  font-size: 20px;
  top: 7px;
`

const InputSearch = styled.input`
  width: 413px;
  height: 40px;
  background: #2d2a27;
  outline: none;
  border: none;
  border-bottom: 1px solid #5b5754;
  font-size: 18px;
  float: left;
  color: #fff;
  transition: border-color 0.3s;
  &:focus { 
    border-bottom: 1px solid #fff;
  }
}
`

export default class Search extends React.Component {
  static defaultProps = {
    placeholder: "",
    value: "",
    onSearchChange: () => {},
    searchTypes: [],
    changeSearchFilter: () => {}
  }

  static propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onSearchChange: PropTypes.func,
    searchTypes: PropTypes.array, // eslint-disable-line
    changeSearchFilter: PropTypes.func
  }

  render() {
    const {
      placeholder,
      onSearchChange,
      searchTypes,
      value,
      changeSearchFilter
    } = this.props
    return (
      <SearchContainer>
        <SearchInputContainer>
          <InputSearch
            data-auto-action="search:input-search"
            placeholder={placeholder}
            value={value}
            onChange={onSearchChange}
          />
          <IconSearch>
            <FontAwesomeIcon icon={faSearch} />
          </IconSearch>
        </SearchInputContainer>
        <SelectContainer>
          <Select
            onChange={changeSearchFilter}
            data-auto-action="search:input-change-filter"
          >
            <option value={searchTypes[0].name}>{searchTypes[0].name}</option>
            <option value={searchTypes[1].name}>{searchTypes[1].name}</option>
            <option value={searchTypes[2].name}>{searchTypes[2].name}</option>
          </Select>
          <IconFilterContainer>
            <FontAwesomeIcon icon={faAngleDown} />
          </IconFilterContainer>
        </SelectContainer>
      </SearchContainer>
    )
  }
}
