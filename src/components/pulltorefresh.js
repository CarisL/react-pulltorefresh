import React, { Component } from "react";
import uniqueId from "lodash/uniqueId";
import PropTypes from "prop-types";
import PullToRefreshJS from "pulltorefreshjs";
import { findDOMNode } from "react-dom";

class Pulltorefresh extends Component {
  static defaultProps = {
    disabled: false,
    distanceFromTop: 50,
    instructionsReleaseToRefresh: "Release to refresh",
    instructionsPullToRefresh: "Pull down to refresh",
    onRefresh: () => {},
    distThreshold: 60,
    distMax: 80,
    instructionsRefreshing: "Refreshing",
    refreshTimeout: 500,
    distReload: 50,
    distIgnore: 0,
    iconArrow: "&#8675"
  };

  static propTypes = {
    distanceToRefresh: PropTypes.number,
    disabled: PropTypes.bool,
    style: PropTypes.object,
    onRefresh: PropTypes.func,
    distanceFromTop: PropTypes.number,
    instructionsReleaseToRefresh: PropTypes.string,
    distThreshold: PropTypes.number,
    distMax: PropTypes.number,
    getStyles: PropTypes.func,
    instructionsRefreshing: PropTypes.string,
    instructionsPullToRefresh: PropTypes.string,
    refreshTimeout: PropTypes.number,
    distReload: PropTypes.number,
    distIgnore: PropTypes.number,
    iconArrow: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.elementId = uniqueId("ptr");
    this.ptrInstance = {};
  }

  componentDidMount() {
    const { disabled } = this.props;
    if (!disabled) {
      this.setupPullToRefresh();
    }
  }

  componentDidUpdate(prevProps) {
    const { disabled } = this.props;
    const isDisableToEnable = prevProps.disabled && !disabled;
    const isEnableToDisable = !prevProps.disabled && disabled;
    if (isDisableToEnable) {
      this.setupPullToRefresh();
    }
    if (isEnableToDisable) {
      this.ptrInstance.destroy();
    }
  }

  setupPullToRefresh() {
    const {
      instructionsReleaseToRefresh,
      distThreshold,
      distMax,
      getStyles,
      instructionsRefreshing,
      instructionsPullToRefresh,
      refreshTimeout,
      distReload,
      distIgnore,
      iconArrow
    } = this.props;

    this.ptrInstance = PullToRefreshJS.init({
      mainElement: `#${this.elementId}`,
      instructionsPullToRefresh,
      instructionsReleaseToRefresh,
      distThreshold,
      distMax,
      getStyles,
      instructionsRefreshing,
      refreshTimeout,
      distReload,
      distIgnore,
      iconArrow,
      shouldPullToRefresh: e => {
        let containerElement;
        try {
          containerElement = findDOMNode(this);
        } catch (e) {
          console.log(e);
        }
        if (containerElement) {
          const {
            top: distanceFromTop
          } = containerElement.getBoundingClientRect();
          if (this.props.distanceFromTop) {
            return distanceFromTop <= this.props.distanceFromTop;
          }
        }
        return !window.scrollY;
      },
      triggerElement: `#${this.elementId}`,
      onRefresh: () => {
        const { onRefresh } = this.props;
        if (onRefresh) {
          onRefresh();
        }
      }
    });
  }

  componentWillUnmount() {
    const { disabled } = this.props;
    if (this.ptrInstance && !disabled) {
      this.ptrInstance.destroy();
    }
  }

  render() {
    const { children, style } = this.props;
    return (
      <div id={this.elementId} style={style}>
        {children}
      </div>
    );
  }
}

export default Pulltorefresh;
