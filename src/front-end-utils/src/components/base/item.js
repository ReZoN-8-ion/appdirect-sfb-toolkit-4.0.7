import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const ItemContainer = styled.div`
  cursor: pointer;
  position: relative;
  color: ${({ isSelected }) =>
    isSelected ? "#4fa6e3" : "#fff"};
  &::before {
    position: absolute;
    top: 10px;
    display: none;
    left: 0;
    margin-left: -100px;
    text-indent: 10px;
    width: 90px;
    font-size: 11px;
    background: #222;
    color: #fff;
    height: 20px;
    line-height: 20px;
    content: "${({ title }) => title}";
  }
  &:hover{
    color: ${({ subItem }) => (subItem ? "#4fa6e3" : "#fff")};
    background: ${({ subItem }) => (subItem ? "#f7f7f7" : "#4fa6e3")};
    &::before {
      display: ${({ status }) => (status === "small" ? "block" : "none")};
    }
  }
`
const ItemContent = styled.div`
  overflow: hidden;
  box-sizing: border-box;
  width: ${({ size }) => size};
  height: 39px;
  padding: 9px 7px 7px 7px;
  transition: width 0.3s;
  border-top: ${({ border }) => (border ? "1px solid #36373e" : "none")};
`
const ItemContentLine = styled.div`
  width: 139px;
`

const Title = styled.div`
  width: 139px;
`

const Icon = styled.div`
  float: left;
  font-size: 17px;
  width: 25px;
  ${({ iconAlign }) => iconAlign && `text-indent: ${iconAlign};`};
`

const Text = styled.div`
  float: left;
  margin-top: -2px;
  margin-left: 3px;
  font-family: "Helvetica";
  font-size: 14px;
  line-height: 25px;
`

export default class Item extends React.Component {
  static defaultProps = {
    status: "small",
    subItem: false,
    isSelected: false,
    onClickHandler: () => {},
    title: "",
    size: "35px",
    border: false,
    iconAlign: "",
    icon: () => {},
    action: ""
  }

  static propTypes = {
    status: PropTypes.string,
    subItem: PropTypes.bool,
    isSelected: PropTypes.bool,
    onClickHandler: PropTypes.func,
    title: PropTypes.string,
    size: PropTypes.string,
    border: PropTypes.bool,
    iconAlign: PropTypes.string,
    action: PropTypes.string,
    icon: PropTypes.node
  }

  render() {
    const {
      status,
      subItem,
      isSelected,
      onClickHandler,
      size,
      border,
      icon,
      iconAlign,
      action,
      title
    } = this.props
    return (
      <ItemContainer
        status={status}
        subItem={subItem}
        isSelected={isSelected}
        onClick={onClickHandler}
        title={title}
        data-auto-action={action}
      >
        <ItemContent size={size} border={border}>
          <ItemContentLine>
            <Title>
              <Icon iconAlign={iconAlign}>{icon}</Icon>
              <Text>{title}</Text>
            </Title>
          </ItemContentLine>
        </ItemContent>
      </ItemContainer>
    )
  }
}
